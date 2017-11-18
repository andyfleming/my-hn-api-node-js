const createMysqlConnection = require('./src/create-mysql-connection')
const createRedisConnection = require('./src/create-redis-connection')
const createServer = require('./src/create-server')

Promise.all([
    createMysqlConnection(),
    createRedisConnection()
]).then(([mysqlConn, redisConn]) => {
    const server = createServer(mysqlConn, redisConn)

    server.listen(7852, () => {
        console.log('Listening on port 7852')
    })    

})
