const bluebird = require('bluebird')

module.exports = async function getComments(dbConn, parentHnId) {
    const [rows, fields] = await dbConn.execute(`SELECT * FROM comments WHERE parent_hn_id = ?`, [parentHnId])

    // Return the comments and inject replies
    return await bluebird.map(rows, async comment => {
        const replies = await getComments(dbConn, comment.hn_id)

        return {replies, ...comment}
    })
}
