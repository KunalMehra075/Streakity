const Connection = require("./Config/db");
const UserRouter = require("./Routes/User.routes");
const TestRouter = require("./Routes/Test.routes");

const express = require("express");
const cors = require("cors");
const path = require("path");
const AtomRouter = require("./Routes/Atom.routes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "Frontend", "dist")));
app.use(express.json());


app.use("/api/atom", AtomRouter)
app.use("/api/user", UserRouter)
app.use("/api/test", TestRouter)

app.get("/api", (req, res) => {
  try {
    res.status(200).send({ msg: "Welcome to User App" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message || "Something Went Wrong" })
  }
});
//? HTML Request
app.get("/*", (req, res) => {
  console.log(`Inside /* - URL : ${req.url}`)
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/Frontend/dist/index.html");
});


const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
  try {
    await Connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
  }
  console.log(`Server is Rocking on port ${PORT}`);
});
