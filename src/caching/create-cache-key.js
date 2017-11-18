const crypto = require('crypto')
const salt = 'ajg0349gjioreslgfd'

module.exports = function createCacheKey(prefix, valueToHash) {
    const hash = crypto.createHash('md5').update(salt + valueToHash).digest("hex")

    return prefix + hash
}
