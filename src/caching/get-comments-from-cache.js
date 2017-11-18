const createCacheKey = require('./create-cache-key')

module.exports = async function getCommentsFromCache(redisConn, storyHnId) {
    const cacheKey = createCacheKey('comments:', storyHnId)
    const result = await redisConn.get(cacheKey)

    return result ? JSON.parse(result) : null
}
