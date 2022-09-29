const { User } = require("../../../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        const { fullname, email, address, password } = req.body

        try {
            const validation = await User.findOne({
                where: {
                    email
                }
            })
            if(validation) {
                return res.status(400).json({
                    message: 'email already exist'
                })
            }

            const hash = await bcrypt.hashSync(password, 11)
            const newUser = await User.create({
                fullname,
                email,
                address,
                password: hash
            })
    
            res.status(201).json({
                message: 'register success',
                result: newUser.fullname
            })
            
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    },
    
    async login (req, res) {
        const { email, password } = req.body
    
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
    
            if (!user) {
                return res.status(400).json({
                    message: 'invalid'
                })
            }
    
            const compare = await bcrypt.compareSync(password, user.password)
    
            if (!compare) {
                return res.status(400).json({
                    message: 'invalid'
                })
            }
    
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.SECRET_KEY)
    
            res.status(200).json({
                message: 'login success',
                token
            })
    
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}