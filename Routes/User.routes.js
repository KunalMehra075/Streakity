const { getAllUsers, getUserById, CreateUser, UserLogin, searchUser, UpdateUserByID, DeleteUserById, UpdateuserProfileByID, forgotPassword, changePassword } = require("../Controllers/User.controller");


const UserRouter = require("express").Router();

UserRouter.get("/", (req, res) => res.send({ msg: "Welcome to User Route" }));

UserRouter.get("/get-all-users", getAllUsers);
UserRouter.get("/get-user-by-id/:id", getUserById);
UserRouter.post("/create-user", CreateUser);
UserRouter.post("/login", UserLogin);
UserRouter.post("/search-user", searchUser);
UserRouter.patch("/update-user/:id", UpdateUserByID);
UserRouter.delete("/delete-user/:id", DeleteUserById);
UserRouter.patch("/update-user-profile/:id", UpdateuserProfileByID);
UserRouter.patch("/change-password", changePassword);
UserRouter.patch("/forgot-password", forgotPassword);



module.exports = UserRouter;