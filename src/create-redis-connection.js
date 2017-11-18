const Redis = require('ioredis')

module.exports = function createRedisConnection() {
    return Promise.resolve(new Redis({
        port: 7855,
        host: '127.0.0.1',
        password: 'ahr098gi3refjd',
        db: 0
    }))
}
