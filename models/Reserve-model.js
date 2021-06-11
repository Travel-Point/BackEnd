const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    numberOfGuest: { type: Number },   
    guestName: { type: String },
    isSmoking: { type: Boolean },
    dateReserve: { type: Date },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Bill", PlaceSchema);