const { Administrator, User, Courier } = require('../models')
const { decodedToken } = require('../utils/authUtil')

module.exports = {
    async authAdmin(req, res, next) {
        try {
            const { token } = req.headers

            if (!token) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }

            const decoded = decodedToken(token)

            const user = await Administrator.findOne({
                where: {
                    id: decoded.id
                }
            })

            if (!user) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            return next()
        } catch (err) {
            if (err.name === "unauthorized") {
                return res.status(403).json({
                    name: err.name,
                    message: err.message
                })
            } else if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
                return res.status(401).json({
                    name: err.name,
                    message: "Token expired"
                })

            } else {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }
        }
    },

    async authUser(req, res, next) {
        try {
            const { token } = req.headers

            if (!token) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }

            const decoded = decodedToken(token)

            const user = await User.findOne({
                where: {
                    id: decoded.id
                }
            })

            if (!user) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            return next()
        } catch (err) {
            if (err.name === "unauthorized") {
                return res.status(403).json({
                    name: err.name,
                    message: err.message
                })
            } else if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
                return res.status(401).json({
                    name: err.name,
                    message: "Token expired"
                })

            } else {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }
        }
    },

    async authCourier(req, res, next) {
        try {
            const { token } = req.headers

            if (!token) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }

            const decoded = decodedToken(token)

            const user = await Courier.findOne({
                where: {
                    id: decoded.id
                }
            })

            if (!user) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            return next()
        } catch (err) {
            if (err.name === "unauthorized") {
                return res.status(403).json({
                    name: err.name,
                    message: err.message
                })
            } else if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
                return res.status(401).json({
                    name: err.name,
                    message: "Token expired"
                })

            } else {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }
        }
    }
}