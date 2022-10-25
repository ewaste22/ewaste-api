const { Dropbox } = require("../../../models")

module.exports = {
    async findAllDropbox(req, res) {
        try {
            const dropbox = await Dropbox.findAll()
            res.status(200).json({
                status: "success",
                message: "Dropbox found successfully",
                result: dropbox.length,
                data: {
                    dropbox
                }
            })
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity"
            })
        }
    }
    ,
    async createDropbox(req, res) {
        try {
            const dropbox = await Dropbox.create(req.body)
            res.status(201).json({
                status: "success",
                message: "Dropbox created successfully",
                data: {
                    dropbox
                }
            })
        } catch (err) {
            err.name === "SequelizeValidationError" ?
                res.status(400).json({
                    status: "failed",
                    name: "Bad Request",
                    message: err.message || "Bad Request"
                }) :
                res.status(500).json({
                    status: "failed",
                    name: "Internal Server Error",
                    message: err.message || "Internal Server Error"
                })
        }
    },
    async updateDropbox(req, res) {
        try {
            const id = req.params.id
            const dropbox = await Dropbox.findByPk(id)
            if (!dropbox) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Dropbox not found"
                })
            } else {
                const updateDropbox = await dropbox.update(req.body)
                res.status(200).json({
                    status: "success",
                    message: "Dropbox update successfully",
                    data: {
                        updateDropbox
                    }
                })
            }
        } catch (err) {
            err.name === "SequelizeValidationError" ?
                res.status(400).json({
                    status: "failed",
                    name: "Bad Request",
                    message: err.message || "Bad Request"
                }) :
                res.status(500).json({
                    status: "failed",
                    name: "Internal Server Error",
                    message: err.message || "Internal Server Error"
                })
        }
    },
    async deleteDropbox(req, res) {
        try {
            const dropbox = await Dropbox.findByPk(req.params.id)
            if (!dropbox) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                await dropbox.destroy()
                res.status(200).json({
                    status: "success",
                    message: "Cart deleted successfully",
                    data: {
                        dropbox
                    }
                })
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity"
            })
        }
    }
}