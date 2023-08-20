const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    user_code: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    terms_conditions: { type: Boolean, default: false },
    isVerified: { type: String, enum: ["verified", "onhold", "rejected"], default: "onhold" },
    email_verification: { type: Boolean, required: true },
    DOB: { type: String },
    medium: { type: String },
    working_status: { type: String, enum: ["active", "inactive", "disabled"], default: "active" },

    profile_photo: { type: String },
    linkedin: { type: String },
    other_social: { type: String },
    start_date: { type: String },
    streaks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    gender: { type: String, enum: ["male", "female", "others"], default: "male" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },

}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;