const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AddressModel = require("../Models/Addresses.model");

require("dotenv").config();

exports.getAllUsers = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const users = await UserModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip).populate(["address"]).select({ password: 0 })
        const totalusers = await UserModel.find().count()
        res.send({ msg: `All Users Page ${page}`, Count: users.length, users, totalusers });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something went Wrong" });
    }
};
exports.getUserById = async (req, res) => {
    let id = req.params.id
    try {
        const user = await UserModel.findById(id).populate(["address",]).select({ password: 0 })
        res.send({ msg: `user By ID`, user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something went Wrong" });
    }
};
exports.searchUser = async (req, res) => {
    const query = req.body
    try {
        let users = await UserModel.find(query).sort({ createdAt: -1 }).populate(["address"]).select({ password: 0 })
        res.status(200).send({ msg: "Searched users", count: users.length, users: users })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.UserLogin = async (req, res) => {
    const { email, password } = req.body;
    const test = { email, password }
    for (const key in test) {
        if (!test[key]) return res.status(401).send({ msg: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        let user = await UserModel.findOne({ email })
        if (!user) return res.status(404).send({ msg: "Email Not Found, Please check entered email" });
        bcrypt.compare(password, user?.password).then(async (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Wrong Credentials" });
            } else {
                const token = jwt.sign({ _id: user?._id }, process.env.JSON_SECRET);
                let instance = await UserModel.findOne({ email }).populate(["address"]).select({ password: 0 })
                if (instance?.isVerified == "rejected") {
                    return res.status(400).send({ msg: "Account Disabled", status: "error", desc: "Your account has been disabled Temporarily, Please wait we will contact you soon!", });
                }
                if (instance?.isVerified == "onhold") {
                    return res.status(400).send({ msg: "Account on Hold", status: "info", desc: "Your account has been under survey, Please wait we will contact you soon!", });
                }
                return res.status(200).send({ msg: "Login Successful!", desc: "You have succesfully logged in as user", token, user: instance });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something went Wrong" });
    }
};
exports.CreateUser = async (req, res) => {
    let payload = req.body
    let { email, password, first_name, last_name, phone_number } = req.body
    const test = { email, password, first_name, last_name, phone_number: +phone_number }

    for (const key in test) {
        if (!test[key]) return res.status(401).send({ msg: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {


        let registered = await UserModel.find({ email })
        if (registered.length > 0) return res.status(401).send({ msg: `Email already regiserted , Please Login with Password, ` })

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(500).send({ msg: "Something Went Wrong", Err: "Bcrypt Error" })
            const address = new AddressModel(payload?.address)
            await address.save()
            let Allusers = await UserModel.find().select({ user_code: 1 })
            let wcode = null

            let lastNum = 1;
            Allusers.forEach((el) => {
                let x = el?.user_code?.split("/")[2];
                if (+lastNum <= x) lastNum = +x + 1;
            });
            const year = new Date().getFullYear();
            wcode = `STRY-U/${String(year).slice(2)}-${String(year + 1).slice(
                2
            )}/${lastNum}`;

            payload.user_code = wcode
            payload.address = address._id
            payload.password = hash

            const instance = new UserModel(payload)


            await instance.save()

            res.status(200).send({ msg: "New user Created Successfully", instance });
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err?.message || "Something went Wrong" })
    }
}
exports.UpdateUserByID = async (req, res) => {
    let id = req.params.id
    let payload = req.body

    try {
        if (payload.isVerified == "verified" && !payload.editingProfile) {

            bcrypt.hash(payload.password, 10, async (err, hash) => {
                if (err) return res.status(500).send({ msg: "Something Went Wrong", Err: "Bcrypt Error" })
                payload.password = hash
                const user = await UserModel.findByIdAndUpdate(id, payload)


                return res.status(200).send({ msg: "Updated The user with ID :" + id });
            })


        } else if (payload.isVerified == "onhold" || payload.isVerified == "rejected") {

            const user = await UserModel.findByIdAndUpdate(id, { isVerified: payload?.isVerified || "onhold" })


            res.status(200).send({ msg: "Updated The user with ID :" + id })
        } else {
            let addressid = payload?.address?._id
            await AddressModel.findByIdAndUpdate(addressid, payload.address)
            payload.address = addressid
            const user = await UserModel.findByIdAndUpdate(id, payload)


            user = await UserModel.findById(id).populate(["address"]).select({ password: 0 })
            res.status(200).send({ msg: "Updated The user with ID :" + id, Updateduser: user })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.UpdateuserProfileByID = async (req, res) => {
    let id = req.params.id
    let payload = req.body

    try {
        let addressid = payload?.address?._id
        await AddressModel.findByIdAndUpdate(addressid, payload.address)
        payload.address = addressid
        let user = await UserModel.findByIdAndUpdate(id, payload)
        user = await UserModel.findById(id).populate(["address"]).select({ password: 0 })
        res.status(200).send({ msg: "Updated The user with ID :" + id, Updateduser: user })

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.DeleteUserById = async (req, res) => {
    let id = req.params.id
    try {
        await UserModel.findByIdAndDelete(id)
        res.status(200).send({ msg: "Deleted The user with ID :" + id })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.changePassword = async (req, res) => {

    let { providedPass, newPass, email } = req.body

    try {
        let user = await UserModel.findOne({ email })
        let id = user._id
        if (!user) return res.status(404).send({ msg: "Email Not Found, Please check entered email" });

        bcrypt.compare(providedPass, user?.password).then(async (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Wrong Credentials, Please Provide Corrder Password" });
            } else {
                const Hash = await bcrypt.hash(newPass, 5);
                await UserModel.findByIdAndUpdate(id, { password: Hash })
                let user = await UserModel.findOne({ email }).populate(["address"]).select({ password: 0 })


                return res.status(200).send({ msg: "Updated The user with ID :" + id, Updateduser: user });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.forgotPassword = async (req, res) => {

    let { email } = req.body
    try {
        let user = await UserModel.findOne({ email })
        if (!user) return res.status(404).send({ msg: "Email Not Found, Please check entered email" });
        let id = user._id

        const Hash = await bcrypt.hash("abc1234", 5);
        await UserModel.findByIdAndUpdate(id, { password: Hash })




        let instance = await UserModel.findOne({ email }).populate(["address"]).select({ password: 0 })
        return res.status(200).send({ msg: "Updated The user with ID :" + id, Updateduser: instance });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}