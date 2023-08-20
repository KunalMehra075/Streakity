const { getAllUsers, addUser, AuthLogin, DeleteUserById, UpdateUserByID, searchUser, changePassword } = require("../Controllers/User.controller");

const UserRouter = require("express").Router();

UserRouter.get("/", (req, res) => res.send({ msg: "Welcome to User Route" }));

UserRouter.get("/get-all-users", getAllUsers);
UserRouter.post("/create-user", addUser);
UserRouter.post("/admin-login", AuthLogin);
UserRouter.post("/search-user", searchUser);
UserRouter.delete("/delete-user/:id", DeleteUserById);
UserRouter.patch("/update-user/:id", UpdateUserByID);
UserRouter.patch("/change-password", changePassword);


module.exports = UserRouter;