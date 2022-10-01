const courierRepository = require('../repositories/courierRepository')
const {hashPassword,
    checkPassword,
    createToken
} = require('../utils/authUtil')

module.exports = {
    async register(data) {
        try {
            const email_courier = data.email_courier.toLowerCase()                   
            const password_courier = await hashPassword(data.password_courier)
            const fullname_courier = data.fullname_courier
            const transportationType_courier = data.transportationType_courier
            const maxLoad_courier = data.maxLoad_courier
            const nopol_courier = data.nopol_courier
            const nomor_courier = data.nomor_courier

            const user = await courierRepository.findByEmail(email_courier.toLowerCase())
            if  (user === email_courier) {
                throw {
                    name : "badRequest",
                    message : "Email already exist"
                }
            } else if (user !== email_courier) {
                return courierRepository.create({ 
                    fullname_courier,
                    email_courier,
                    password_courier,
                    transportationType_courier,
                    maxLoad_courier,
                    nopol_courier,
                    nomor_courier
                })
            }

        } catch (err) {
            throw err
        }
    },

    async login(data) {
        try {
            const email = data.email_courier.toLowerCase()
            const password = data.password
            const user = await courierRepository.findByEmail(email)
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
                email: user.email_courier
            })

            return {
                id: user.id,
                email: user.email_courier,
                token
            }
        } catch (err) {
            throw err
        }
    },

    async update(id, data) {
        try {
            const fullname_courier = data.fullname_courier
            const email_courier = data.email_courier

            const user = await courierRepository.find(id)
            if (!user) {
                throw {
                    name : "badRequest",
                    message : "User not found"
                }
            }

            return courierRepository.update(id, {
                fullname_courier,
                email_courier
            })
        } catch (err) {
            throw err
        }
    },

    async changePassword (id, data) {
        try {
            const oldPassword = data.oldPassword
            const newPassword = data.newPassword

            const user = await courierRepository.find(id)
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

            return courierRepository.update(id, {
                password: hashedPassword
            })
        } catch (err) {
            throw err
        }
    }
}