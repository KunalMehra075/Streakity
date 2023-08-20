const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AddressModel = require("../Models/Addresses.model");
const AtomModel = require("../Models/Atom.model");

require("dotenv").config();

exports.ElectronLogin = async (req, res) => {
    const { email, password } = req.body;
    const test = { email, password }
    for (const key in test) {
        if (!test[key]) return res.status(401).send({ msg: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        let electron = await AtomModel.findOne({ email })
        if (!electron) return res.status(404).send({ msg: "Email Not Found, Please check entered email" });
        if (electron.working_status == "disabled") return res.status(400).send({ msg: "Account on Hold", status: "info", desc: "Your account has been under survey, Please wait we will contact you soon!", });

        bcrypt.compare(password, electron?.password).then(async (result) => {
            if (!result) {
                return res.status(404).send({ msg: "Wrong Credentials" });
            } else {
                const token = jwt.sign({ _id: electron?._id, role: electron?.role }, process.env.JSON_SECRET);
                let instance = await AtomModel.findOne({ email }).select({ password: 0 })
                res.send({ msg: "Login Successful", token, electron: instance });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something went Wrong" });
    }
};
exports.getAllEntities = async (req, res) => {
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    page = page > 0 ? page : 1
    let skip = (page - 1) * limit || 0
    try {
        const electrons = await AtomModel.find().sort({ createdAt: -1 }).limit(limit).skip(skip).populate(["address"]).select({ password: 0 })
        const totalelectrons = await AtomModel.find().count()
        res.send({ msg: `All electrons Page ${page}`, Count: electrons.length, electrons, totalelectrons });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something went Wrong" });
    }
};
exports.CreateElectron = async (req, res) => {
    let payload = req.body
    let { email, password, first_name, last_name, phone_number, role } = req.body
    const test = { email, password, first_name, last_name, phone_number: +phone_number, role }

    for (const key in test) {
        if (!test[key]) return res.status(401).send({ msg: `Please Provide ${key}, Mandatory field missing: ${key}` })
    }
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) return res.status(500).send({ msg: "Something Went Wrong", Err: "Bcrypt Error" })
            const address = new AddressModel(payload?.address)
            await address.save()
            let Allelectrons = await AtomModel.find().select({ user_code: 1 })
            let wcode = null

            let lastNum = 1;
            Allelectrons.forEach((el) => {
                let x = el?.user_code?.split("/")[2];
                if (+lastNum <= x) lastNum = +x + 1;
            });
            const year = new Date().getFullYear();
            wcode = `STRY-${role[0]}/${String(year).slice(2)}-${String(year + 1).slice(
                2
            )}/${lastNum}`;

            payload.atom_code = wcode
            payload.address = address._id
            payload.password = hash
            const instance = new AtomModel(payload)
            await instance.save()
            res.status(200).send({ msg: "New electron Created Successfully", instance });
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err?.message || "Something went Wrong" })
    }
}
exports.UpdateElectronByID = async (req, res) => {
    let id = req.params.id
    let payload = req.body

    try {
        await AtomModel.findByIdAndUpdate(id, payload)
        return res.status(200).send({ msg: "Updated The electron with ID :" + id });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.DeleteElectronById = async (req, res) => {
    let id = req.params.id
    try {
        await AtomModel.findByIdAndDelete(id)
        res.status(200).send({ msg: "Deleted The electron with ID :" + id })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.searchElectron = async (req, res) => {
    const query = req.body
    try {
        let electrons = await AtomModel.find(query).sort({ createdAt: -1 }).populate(["address"]).select({ password: 0 })
        res.status(200).send({ msg: "Searched electrons", count: electrons.length, electrons: electrons })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}
exports.changeElectronPassword = async (req, res) => {

    let { newPass, electronID } = req.body

    try {
        let electron = await AtomModel.findById(electronID)
        if (!electron) return res.status(404).send({ msg: "Email Not Found, Please check entered email" });
        const Hash = await bcrypt.hash(newPass, 5);
        await AtomModel.findByIdAndUpdate(electronID, { password: Hash })


        let instance = await AtomModel.findById(electronID).populate(["address"]).select({ password: 0 })
        return res.status(200).send({ msg: "Changed the password of electron with electron ID :" + electronID, UpdatedElectron: instance });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error?.message || "Server Error 500" })
    }
}