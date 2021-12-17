const jwt = require("jsonwebtoken");

function verifyLoggedIn(request, response, next) {
    if (!request.headers.authorization) 
        return response.status(401).send({ message: "You are not logged-in." });

    const token = request.headers.authorization.split(" ")[1];
    if (!token) return response.status(401).send({ message: "You are not logged-in." });

    jwt.verify(token, "welcome to oron's supermarket project", (err,decodedToken) => {
        if (err) {
            if (err.message === "jwt expired") 
                return response.status(403).send({ message: "Your login session has expired." });
            return response.status(401).send({ message: "You are not logged-in." });
        }
        else {
            request.user = decodedToken.user;
            next();
        }
    });
}

module.exports = verifyLoggedIn;