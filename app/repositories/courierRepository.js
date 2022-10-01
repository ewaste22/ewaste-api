const { Courier } = require("../models")

module.exports = {
    find(id) {
        return Courier.findByPk(id)
    },
    findByEmail(email_courier) {
        return Courier.findOne({
            where: {
                email_courier
            }
        })
    },
    create(user) {
        return Courier.create(user)
    },
    update(id, user) {
        return Courier.update(user, {
            where: {
                id
            }
        })
    }
}