import mongoose from "mongoose";

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

export default mongoose.model("User", userSchema);
