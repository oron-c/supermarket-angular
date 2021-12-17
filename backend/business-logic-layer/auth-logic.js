const jwt = require("jsonwebtoken");
const dal = require("../data-access-layer/dal");

async function loginAsync(credentials) {
    const user = await dal.executeQueryAsync(
        `
            select * from users where username=? and password=?
        `,
        [credentials.username, credentials.password]
    );
    if (!user || user.length<1) return null;
    delete user[0].password;

    user[0].token = jwt.sign({user:user[0]} , "welcome to oron's supermarket project", { expiresIn: "60 minutes" });
    return user[0];
}

module.exports = {
    loginAsync
};