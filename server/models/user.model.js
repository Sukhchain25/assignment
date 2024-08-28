const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    licensePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LicensePlan",
    },
    apiCallsUsed: {
      type: Number,
      default: 0,
    },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
