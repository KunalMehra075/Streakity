const { getAllEntities, ElectronLogin, CreateElectron, searchElectron, DeleteElectronById, UpdateElectronByID, changeElectronPassword } = require("../Controllers/Atom.controller");

const AtomRouter = require("express").Router();

AtomRouter.get("/", (req, res) => res.send({ msg: "Welcome to Electron Route" }));

AtomRouter.get("/get-all-entities", getAllEntities);
AtomRouter.post("/create", CreateElectron);
AtomRouter.post("/atom-login", ElectronLogin);
AtomRouter.post("/search", searchElectron);
AtomRouter.delete("/delete/:id", DeleteElectronById);
AtomRouter.patch("/update/:id", UpdateElectronByID);
AtomRouter.patch("/change-password", changeElectronPassword);


module.exports = AtomRouter;