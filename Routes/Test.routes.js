
const TestRouter = require("express").Router();

TestRouter.get("/", (req, res) => res.send({ msg: "Welcome to Test Route" }));



module.exports = TestRouter;