import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "university",
    },
  },
  { timestamps: true },
);
const DepartmentModel = mongoose.model("department", DepartmentSchema);
export default DepartmentModel;
