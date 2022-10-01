const userRepository = require('../repositories/userRepository')
const {hashPassword,
    checkPassword,
    createToken
} = require('../utils/authUtil')

module.exports = {
    async register(data) {
        try {
            const fullname = data.fullname
            const email = data.email.toLowerCase()
            const address = data.address
            const phone_number = data.phone_number
            const password = await hashPassword(data.password)

            const user = await userRepository.findByEmail(email.toLowerCase())
            if  (user === email) {
                throw {
                    name : "badRequest",
                    message : "Email already exist"
                }
            } else if (user !== email) {
                return userRepository.create({ 
                    fullname,
                    email,
                    address,
                    phone_number,
                    password
                })
            }

        } catch (err) {
            throw err
        }
    },

    async login(data) {
        try {
            const email = data.email.toLowerCase()
            const password = data.password
            const user = await userRepository.findByEmail(email)
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

            return {
                id: user.id,
                email: user.email,
                token
            }
        } catch (err) {
            throw err
        }
    },

    async update(id, data) {
        try {
            const fullname = data.fullname
            const email = data.email
            const address = data.address
            const phone_number = data.phone_number

            const user = await userRepository.find(id)
            if (!user) {
                throw {
                    name : "badRequest",
                    message : "User not found"
                }
            }

            return userRepository.update(id, {
                fullname,
                email,
                address,
                phone_number
            })
        } catch (err) {
            throw err
        }
    },

    async changePassword (id, data) {
        try {
            const oldPassword = data.oldPassword
            const newPassword = data.newPassword

            const user = await userRepository.find(id)
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

            return userRepository.update(id, {
                password: hashedPassword
            })
        } catch (err) {
            throw err
        }
    }
}