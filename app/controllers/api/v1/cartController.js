const { Cart } = require("../../../models")

module.exports = {
    async findAllCart(req, res) {
        try {
            const cart = await Cart.findAll()
            res.status(200).json({
                status: "success",
                message: "Cart found successfully",
                result: cart.length,
                data: {
                    cart
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
    async findCartById(req, res) {
        try {
            const cart = await Cart.findByPk(req.params.id)
            if (!cart) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Cart found successfully",
                    data: {
                        cart
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
    async createCart(req, res) {
        try {
            const cart = await Cart.create(req.body)
            res.status(201).json({
                status: "success",
                message: "Cart created successfully",
                data: {
                    cart
                }
            })
        } catch (err) {
            err.name === "SequelizeValidationError" ?
                res.status(400).json({
                    status: "failed",
                    name: "Bad Request",
                    message: err.errors[0].message
                }) :
                res.status(422).json({
                    status: "failed",
                    name: "Unprocessable Entity",
                    message: err.message || "Unprocessable Entity"
                })
        }
    },
    async updateCart(req, res) {
        try {
            const cart = await Cart.findByPk(req.params.id)
            if (!cart) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                await cart.update(req.body)
                res.status(200).json({
                    status: "success",
                    message: "Cart updated successfully",
                    data: {
                        cart
                    }
                })
            }
        } catch (err) {
            err.name === "SequelizeValidationError" ?
                res.status(400).json({
                    status: "failed",
                    name: "Bad Request",
                    message: err.errors[0].message
                }) :
                res.status(422).json({
                    status: "failed",
                    name: "Unprocessable Entity",
                    message: err.message || "Unprocessable Entity"
                })
        }
    },
    async deleteCart(req, res) {
        try {
            const cart = await Cart.findByPk(req.params.id)
            if (!cart) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                await cart.destroy()
                res.status(200).json({
                    status: "success",
                    message: "Cart deleted successfully",
                    data: {
                        cart
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
    async findCartByUserId(req, res) {
        try {
            const cart = await Cart.findAll({
                where: {
                    user_id: req.params.id
                }
            })
            if (!cart) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Cart found successfully",
                    data: {
                        cart
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
    async findCartStatusByUserId(req, res) {
        try {
            const cart = await Cart.findAll({
                where: {
                    user_id: req.params.id,
                    status_cart: req.params.status
                }
            })
            if (!cart) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Cart found successfully",
                    data: {
                        cart
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
    async findCartPendingByUserId(req, res) {
        try {
            const cart = await Cart.findAll({
                where: {
                    user_id: req.params.id,
                    status_cart: "pending"
                }
            })
            if (!cart) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Cart not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Cart found successfully",
                    data: {
                        cart
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
}