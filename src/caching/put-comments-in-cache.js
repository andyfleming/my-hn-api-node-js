const createCacheKey = require('./create-cache-key')
const ttl = 60 * 5 // 5 minutes

module.exports = function putCommentsInCache(redisConn, storyHnId, commentsFromDb) {
    const cacheKey = createCacheKey('comments:', storyHnId)
    redisConn.set(cacheKey, JSON.stringify(commentsFromDb), 'EX', ttl)
}
