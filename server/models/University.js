import mongoose from "mongoose";

const UniversitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const UniversityModel = mongoose.model("university", UniversitySchema);
export default UniversityModel;
