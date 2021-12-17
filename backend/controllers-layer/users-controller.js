const express = require("express");
const logic = require("../business-logic-layer/users-logic");
const authLogic = require("../business-logic-layer/auth-logic");
const Credentials = require("../models/Credentials");
const fileUpload = require("express-fileupload");
const NewUser = require("../models/NewUser");

const router = express.Router();
router.use(fileUpload());

router.post("/login", async (request, response) => {
    try {
        const credentials = new Credentials(request.body);
 
        const errors = credentials.validate();
        if (errors) return response.status(400).send(errors);
 
        const loggedInUser = await authLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send({ message: "Incorrect username or password." });
 
        response.json(loggedInUser);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }
});

router.post("/register", async (request, response) => {
    try {
        const user = await logic.getUserByUsernameAsync(request.body.username, request.body.userId);
        if (user.length === 0) {
            const addUser = new NewUser(request.body);
            const errors = addUser.validate();
            if (errors) {
                response.status(400).send(errors);
            }
            else {
                try {
                    await logic.registerAsync(addUser);
                    response.send({message: `User "${addUser.username}" was succesfuly added`})
                } catch (error) {
                    console.log(error)
                    response.status(500).send({message: "Server error, please try again later"});
                }
            }
        }
        else {
            response.status(404).send({message: `User ${request.body.username} already exists`});
        }
    } catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }

});

router.get("/user-by-id/:userId", async (request, response) => {
    try {
        const userId = await logic.getUserByIdNumberAsync(request.params.userId);
        if (userId.length != 0)
            response.send(userId[0]);
        else
            response.status(404).send({ message: `UserId does not exist` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

router.get("/user-by-username/:username", async (request, response) => {
    try {
        const username = await logic.getUserByUsernameAsync(request.params.username);
        if (username.length != 0)
            response.send(username[0]);
        else
            response.status(404).send({ message: `Username does not exist` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});


module.exports = router;