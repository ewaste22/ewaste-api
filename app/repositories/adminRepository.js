const { Administrator } = require("../models")

module.exports = {
    find(id) {
        return Administrator.findByPk(id)
    },
    findByEmail(email_admin) {
        return Administrator.findOne({
            where: {
                email_admin
            }
        })
    },
    create(user) {
        return Administrator.create(user)
    },
    update(id, user) {
        return Administrator.update(user, {
            where: {
                id
            }
        })
    }
}