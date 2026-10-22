import UserModel from "../models/User.js";

export const Register = async (req, res) => {
  try {
    let userInDb = await UserModel.findOne({ email: req.body.email });
    if (userInDb) return res.status(404).send({ message: "User in use !!" });
    let userData = await UserModel.create({
      ...req.body,
      profilePic: req?.file?.filename,
    });
    if (userData) res.status(200).send({ message: "User Created !!" });
    else res.status(404).send({ message: "Unable to create user" });
  } catch (error) {
    console.log("Fail to submit data !!");
  }
};
export const Login = async (req, res) => {
  try {
    let userInDb = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (userInDb)
      res.status(200).send({ id: userInDb._id, role: userInDb.role });
    else res.status(404).send({ message: "Wrong user / pwd" });
  } catch (error) {
    console.log("Fail to submit data !!");
  }
};
