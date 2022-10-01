const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    hashPassword: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 11, (err, hashPassword) => {
                if (!!err) {
                    reject(err)
                    return
                }

                resolve(hashPassword)
            })
        })
    },

    checkPassword: (hashedPassword, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (!!err) {
                    reject(err)
                    return
                }

                resolve(result)
            })
        })
    },

    createToken(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" })
    }
}