const { Pickup, Courier } = require("../../../models")

module.exports = {
    async findAllPickup(req, res) {
        try {
            const pickup = await Pickup.findAll({
                include: [{
                    model: Courier,
                    attributes: ["id", "fullname_courier"]
                }]
            })
            res.status(200).json({
                status: "success",
                message: "Pickup found successfully",
                result: pickup.length,
                data: {
                    pickup
                }
            })
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity"
            })
        }
    },
    async findPickupById(req, res) {
        try {
            const pickup = await Pickup.findByPk(req.params.id, {
                include: [{
                    model: Courier,
                    attributes: ["id", "fullname_courier"]
                }]
            })
            if (!pickup) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Pickup not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Pickup found successfully",
                    data: {
                        pickup
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
    },
    async createPickup(req, res) {
        try {
            const pickup = await Pickup.create(req.body)
            res.status(201).json({
                status: "success",
                message: "Pickup created successfully",
                data: {
                    pickup
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
    async updatePickup(req, res) {
        try {
            const pickup = await Pickup.findByPk(req.params.id)
            if (!pickup) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Pickup not found"
                })
            } else {
                const updatedPickup = await pickup.update(req.body)
                res.status(200).json({
                    status: "success",
                    message: "Pickup updated successfully",
                    data: {
                        updatedPickup
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
    async deletePickup(req, res) {
        try {
            const pickup = await Pickup.findByPk(req.params.id)
            if (!pickup) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Pickup not found"
                })
            } else {
                await pickup.destroy()
                res.status(200).json({
                    status: "success",
                    message: "Pickup deleted successfully"
                })
            }
        } catch (err) {
            res.status(500).json({
                status: "failed",
                name: "Internal Server Error",
                message: err.message || "Internal Server Error"
            })
        }
    },
    async findPickupByCourierId(req, res) {
        try {
            const pickup = await Pickup.findAll({
                where: {
                    courier_id: req.params.id
                }
            })
            if (!pickup) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Pickup not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Pickup found successfully",
                    result: pickup.length,
                    data: {
                        pickup
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