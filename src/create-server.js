const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const getComments = require('./get-comments')
const getCommentsFromCache = require('./caching/get-comments-from-cache')
const putCommentsInCache = require('./caching/put-comments-in-cache')

module.exports = (mysqlConn, redisConn) => {
    const server = express()

    server.use(morgan('combined'))
    server.use(cors())

    server.get('/health', (req, res) => {
        res.send('healthy')
    })

    server.get('/top-stories', async (req, res) => {
        const [rows, fields] = await mysqlConn.query(`SELECT * FROM (SELECT * FROM stories ORDER BY time DESC LIMIT 100) AS 100_most_recent_stories ORDER BY score DESC LIMIT 30`)

        res.json(rows)
    })

    server.get('/stories/:id', async (req, res) => {
        const [rows, fields] = await mysqlConn.execute(`SELECT * FROM stories WHERE id = ? LIMIT 1`, [req.params.id])
        
        if (rows.length === 0) {
            res.sendStatus(404)
        } else {
            res.json(rows[0])
        }
    })

    server.get('/stories/:id/comments', async (req, res) => {

        // Look up story to get hn_id
        const [rows, fields] = await mysqlConn.execute(`SELECT * FROM stories WHERE id = ? LIMIT 1`, [req.params.id])
        
        if (rows.length === 0) {
            res.sendStatus(404)
            return
        }

        const storyHnId = rows[0].hn_id
        const commentsFromCache = await getCommentsFromCache(redisConn, storyHnId)

        if (commentsFromCache) {
            res.json(commentsFromCache)
            return
        }
        
        const commentsFromDb = await getComments(mysqlConn, storyHnId)

        res.json(commentsFromDb)

        putCommentsInCache(redisConn, storyHnId, commentsFromDb)
    })

    return server
}
