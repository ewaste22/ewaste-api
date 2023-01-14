const { Transaction } = require("../../../models");
module.exports = {
    async findAllTransaction(req, res) {
        try {
            const transaction = await Transaction.findAll();
            res.status(200).json({
                status: "success",
                message: "Transaction found successfully",
                result: transaction.length,
                data: {
                    transaction,
                },
            });
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity",
            });
        }
    },
    async findTransactionById(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (!transaction) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Transaction not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Transaction found successfully",
                    data: {
                        transaction,
                    },
                });
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity",
            });
        }
    },
    async createTransaction(req, res) {
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json({
                status: "success",
                message: "Transaction created successfully",
                data: {
                    transaction,
                },
            });
        } catch (err) {
            err.name === "SequelizeValidationError"
                ? res.status(400).json({
                    status: "failed",
                    name: "Bad Request",
                    message: err.errors[0].message,
                })
                : res.status(500).json({
                    status: "failed",
                    name: "Internal Server Error",
                    message: err.message || "Internal Server Error",
                });
        }
    },
    async updateTransaction(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (!transaction) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Transaction not found",
                });
            } else {
                await transaction.update(req.body);
                res.status(200).json({
                    status: "success",
                    message: "Transaction updated successfully",
                    data: {
                        transaction,
                    },
                });
            }
        } catch (err) {
            err.name === "SequelizeValidationError" ?
                res.status(400).json({
                    status: "failed",
                    name: "Bad Request",
                    message: err.errors[0].message,
                }) :
                res.status(422).json({
                    status: "failed",
                    name: "Unprocessable Entity",
                    message: err.message || "Unprocessable Entity",
                });
        }
    },
    async deleteTransaction(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (!transaction) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Transaction not found",
                });
            } else {
                await transaction.destroy();
                res.status(200).json({
                    status: "success",
                    message: "Transaction deleted successfully",
                    data: {
                        transaction,
                    },
                });
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity",
            });
        }
    },
    async findTransactionByCartId(req, res) {
        try {
            const transaction = await Transaction.findAll({
                where: {
                    cartId: req.params.id,
                },
            });
            if (!transaction) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Transaction not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Transaction found successfully",
                    data: {
                        transaction,
                    },
                });
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity",
            });
        }
    },
    async findTransactionById(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (!transaction) {
                res.status(404).json({
                    status: "failed",
                    name: "Not Found",
                    message: "Transaction not found",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Transaction found successfully",
                    data: {
                        transaction,
                    },
                });
            }
        } catch (err) {
            res.status(422).json({
                status: "failed",
                name: "Unprocessable Entity",
                message: err.message || "Unprocessable Entity",
            });
        }
    }
}