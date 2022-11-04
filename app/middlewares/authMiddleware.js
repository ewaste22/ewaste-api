const { Administrator, User, Courier } = require('../models')
const { decodedToken } = require('../utils/authUtil')
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
    async authAdmin(req, res, next) {
        try {
            const bearerToken = req.headers.authorization
            if (!bearerToken) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            
            const token = bearerToken.split("Bearer ")[1]

            const decoded = decodedToken(token)
            console.log(decoded);

            const user = await Administrator.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: decoded.id
                        },
                        {
                            email_admin: decoded.email_admin
                        },
                    ]
                }
            })


            if (!user) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            req.admin = user;
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
            const bearerToken = req.headers.authorization
            if (!bearerToken) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            
            const token = bearerToken.split("Bearer ")[1]

            const decoded = decodedToken(token)

            const user = await User.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: decoded.id
                        },
                        {
                            email: decoded.email
                        },
                    ]
                }
            })

            if (!user) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            req.user = user;
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
            const bearerToken = req.headers.authorization
            if (!bearerToken) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            
            const token = bearerToken.split("Bearer ")[1]

            const decoded = decodedToken(token)

            const user = await Courier.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: decoded.id
                        },
                        {
                            email_courier: decoded.email_courier
                        },
                    ]
                }
            })
            
            if (!user) {
                throw {
                    name: "unauthorized",
                    message: "You must login first"
                }
            }
            req.courier = user
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