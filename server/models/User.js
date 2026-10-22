import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestams: true },
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
