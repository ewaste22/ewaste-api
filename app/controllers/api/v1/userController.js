const { User } = require("../../../models");
const { hashPassword,
    checkPassword,
    createToken
} = require("../../../utils/authUtil");

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
    
    async register (req, res) {
        try {
            const { fullname, email, address, phone_number, password} = req.body
            const hash = await hashPassword(password)

            if(!email || !password || !fullname || !address || !phone_number) {
                throw {
                    name : "badRequest",
                    message : "All field must be filled"
                }
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if  (user) {
                throw {
                    name : "badRequest",
                    message : "Email already exist"
                }
            } else if (!user) {
                const newUser = await User.create({
                    fullname,
                    email,
                    address,
                    phone_number,
                    password: hash
                })
    
                res.status(201).json({
                    name: "success",
                    message: "Register success",
                    data: newUser
                })
            }

        } catch (err) {
            if (err.name === "badRequest" || err.name === "SequelizeValidationError") {
                return res.status(400).json({
                    name: err.name,
                    message: err.message
                })
            } else {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }
        }
    },

    async login (req, res) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                throw {
                    name : "badRequest",
                    message : "All field must be filled"
                }
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (email === null) {
                throw {
                    name : "badRequest",
                    message : "Email is required"
                }
            }

            if (password === null) {
                throw {
                    name : "badRequest",
                    message : "Password is required"
                }
            }

            if (!user) {
                throw {
                    name : "wrongEmailPassword",
                    message : "Wrong email or password"
                }
            }
            const isPasswordValid = await checkPassword(user.password, password)

            if (!isPasswordValid) {
                throw {
                    name : "wrongEmailPassword",
                    message : "Wrong email or password"
                }
            }

            const token = createToken({
                id: user.id,
                email: user.email
            })

            return res.status(200).json({
                message: 'success',
                id : user.id,
                token
            })

        } catch (err) {
            if (err.name === "wrongEmailPassword") {
                return res.status(401).json({
                    name: err.name,
                    message: err.message
                })
            } else if (err.name === "badRequest") {
                return res.status(400).json({
                    name: err.name,
                    message: err.message
                })
            } else {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }
        }
    },

    async update (req, res) {
        try {
            const { fullname, email, address, phone_number } = req.body
            const id = req.params.id

            const user = await User.findByPk(id)
            if (user.email === email) {
                throw {
                    name : "badRequest",
                    message : "Email already exist"
                }
            }
            if (!user) {
                throw {
                    name : "badRequest",
                    message : "User not found"
                }
            }

            const updatedUser = await User.update(
                {
                    fullname,
                    email,
                    address,
                    phone_number
                }, {
                    where: {id}
                }
            )

            res.status(201).json({
                message: "success",
                data: {
                    fullname,
                    email,
                    address,
                    phone_number
                }
            })
        } catch (err) {
            if (err.name === "wrongEmailPassword") {
                return res.status(401).json({
                    name: err.name,
                    message: err.message
                })
            } else if (err.name === "badRequest") {
                return res.status(400).json({
                    name: err.name,
                    message: err.message
                })
            } else {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }
        }
    },

    async changePassword (req, res) {
        try {
            const { oldPassword, newPassword } = req.body
            const id = req.params.id

            const user = await User.findByPk(id)
            if (!user) {
                throw {
                    name : "badRequest",
                    message : "User not found"
                }
            }

            const isPasswordValid = await checkPassword(user.password, oldPassword)

            if (!isPasswordValid) {
                throw {
                    name : "wrongPassword",
                    message : "Wrong password"
                }
            }

            const hashedPassword = await hashPassword(newPassword)

            await User.update(
                {password: hashedPassword},
                {where: {id}}
            )
            res.status(200).json({
                message: 'success'
            })
        } catch (err) {
            if (err.name === "wrongPassword") {
                return res.status(401).json({
                    name: err.name,
                    message: err.message
                })
            } else if (err.name === "badRequest") {
                return res.status(400).json({
                    name: err.name,
                    message: err.message
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