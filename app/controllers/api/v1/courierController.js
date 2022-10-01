const courierController = require("../../../services/courierService")

module.exports = {
    async index(req, res) {
        try {
            res.status(200).json({
                message: 'please auth!!'
            });
    
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    
    },
    
    async register(req, res) {
        try {
            const data = req.body
            const user = await courierController.register(data)
            res.status(201).json({
                message: 'success',
                data: user
            })
        } catch (err) {
            if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
                return res.status(400).json({
                    message: err.message,
                    name: err.name
                })
            } else {
                res.status(500).json({
                    message: err.message,
                    name: err.name
                })
            }
        }
    },
    
    async login (req, res) {
        try {
            const data = req.body
            const user = await courierController.login(data)
            res.status(200).json({
                message: 'success',
                data: {
                    id: user.id,
                    email: user.email,
                    token: user.token
                }
            })
    
        } catch (err) {
            if (err.name === "wrongEmailPassword") {
                return res.status(401).json({
                    message: err.message,
                    name: err.name
                })
            } else if (err.name === "badRequest") {
                return res.status(400).json({
                    message: err.message,
                    name: err.name
                })
            } else if (err.name === "Error") {
                return res.status(401).json({
                    message: err.message,
                    name: err.name
                })

            } else {
                res.status(500).json({
                    message: err.message,
                    name: err.name
                })

            }
        }
    },

    async update (req, res) {
        try {
            const data = req.body
            const id = req.params.id
            const user = await courierController.update(id, data)
            res.status(200).json({
                message: 'success',
                data: data
            })
        } catch (err) {
            if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
                return res.status(400).json({
                    message: err.message,
                    name: err.name
                })
            } else if (err.name === "notFound") {
                return res.status(404).json({
                    message: err.message,
                    name: err.name
                })
            } else {
                res.status(500).json({
                    message: err.message,
                    name: err.name
                })
            }
        }
    },

    async changePassword (req, res) {
        try {
            const data = req.body
            const id = req.params.id
            const user = await courierController.changePassword(id, data)
            res.status(200).json({
                message: 'success',
                data: data
            })
        } catch (err) {
            if (err.name === "badRequest") {
                return res.status(400).json({
                    message: err.message,
                    name: err.name
                })
            } else if (err.name === "notFound") {
                return res.status(404).json({
                    message: err.message,
                    name: err.name
                })
            } else {
                res.status(500).json({
                    message: err.message,
                    name: err.name
                })
            }
        }
    }
}