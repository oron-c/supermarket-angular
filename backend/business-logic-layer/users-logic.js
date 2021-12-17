const dal = require("../data-access-layer/dal");

function getUserByUsernameAsync(username) {
    return dal.executeQueryAsync(`select username from users where username = ?`, [username])
}

function getUserByIdNumberAsync(userId) {
    return dal.executeQueryAsync(`select userId from users where userId = ?`, [userId])
}

function registerAsync(newUser) {
    return dal.executeQueryAsync(`insert into users values(
        ?,
        ?,
        ?,
        "user",
        ?,
        ?,
        ?,
        ?
    )`,
    [newUser.userId, newUser.username, newUser.password, newUser.fName, newUser.lName, newUser.city, newUser.street]
    )
}

module.exports = {
    getUserByUsernameAsync,
    getUserByIdNumberAsync,
    registerAsync,
}