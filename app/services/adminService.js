const adminRepository = require('../repositories/adminRepository')
const {hashPassword,
    checkPassword,
    createToken
} = require('../utils/authUtil')

module.exports = {
    async register(data) {
        try {
            const email_admin = data.email_admin.toLowerCase()                   
            const password = await hashPassword(data.password)
            const fullname_admin = data.fullname_admin

            const user = await adminRepository.findByEmail(email_admin.toLowerCase())
            if  (user === email_admin) {
                throw {
                    name : "badRequest",
                    message : "Email already exist"
                }
            } else if (user !== email_admin) {
                return adminRepository.create({ 
                    fullname_admin,
                    email_admin,
                    password
                })
            }

        } catch (err) {
            throw err
        }
    },

    async login(data) {
        try {
            const email = data.email_admin.toLowerCase()
            const password = data.password
            const user = await adminRepository.findByEmail(email)
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
                email: user.email_admin
            })

            return {
                id: user.id,
                email: user.email_admin,
                token
            }
        } catch (err) {
            throw err
        }
    },

    async update(id, data) {
        try {
            const fullname_admin = data.fullname_admin
            const email_admin = data.email_admin

            const user = await adminRepository.find(id)
            if (!user) {
                throw {
                    name : "badRequest",
                    message : "User not found"
                }
            }

            return adminRepository.update(id, {
                fullname_admin,
                email_admin
            })
        } catch (err) {
            throw err
        }
    },

    async changePassword (id, data) {
        try {
            const oldPassword = data.oldPassword
            const newPassword = data.newPassword

            const user = await adminRepository.find(id)
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

            return adminRepository.update(id, {
                password: hashedPassword
            })
        } catch (err) {
            throw err
        }
    }
}