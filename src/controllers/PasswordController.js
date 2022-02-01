const sha512 = require('js-sha512')

module.exports = {
    get_password(req) {
        return sha512(req.body.password)
    }
}
