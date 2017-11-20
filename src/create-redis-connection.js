const Redis = require('ioredis')

module.exports = function createRedisConnection() {
    return Promise.resolve(new Redis({
        port: process.env.REDIS_PORT || 7855,
        host: process.env.REDIS_HOST || '127.0.0.1',
        password: process.env.REDIS_PASS || 'ahr098gi3refjd',
        db: 0
    }))
}
