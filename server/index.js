import mongoose from "mongoose";
import multer from "multer";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  CreateUniversity,
  DeleteUniversity,
  GetUniversities,
  UpdateUniversity,
} from "./controllers/University.js";
import {
  CreateDepartment,
  DeleteDepartment,
  GetDepartmentsByUniversity,
  UpdateDepartment,
} from "./controllers/Department.js";
import {
  CreateProduct,
  DeleteProduct,
  GetProductsByDepartment,
  ProductDetails,
  UpdateProduct,
  UpdateProductQty,
} from "./controllers/Product.js";
import { Login, Register } from "./controllers/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//University Module
const storageUniv = multer.diskStorage({
  destination: "uploadsUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadUniv = multer({
  storage: storageUniv,
});

// http://localhost:8081/university

app.post("/university", uploadUniv.single("image"), CreateUniversity);
app.put("/university", uploadUniv.single("image"), UpdateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", GetUniversities);

// Department Module
const storageDep = multer.diskStorage({
  destination: "uploadsDep/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadDep = multer({
  storage: storageDep,
});
// http://localhost:8081/department
app.post("/department", uploadDep.single("image"), CreateDepartment);
app.put("/department", uploadDep.single("image"), UpdateDepartment);
app.delete("/department", DeleteDepartment);
app.get("/department", GetDepartmentsByUniversity);

// Product module
const storagePrd = multer.diskStorage({
  destination: "uploadsPrd/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadPrd = multer({
  storage: storagePrd,
});

app.post("/product", uploadPrd.array("images"), CreateProduct);
app.put("/product", uploadPrd.array("images"), UpdateProduct);
app.delete("/product", DeleteProduct);
app.get("/product", GetProductsByDepartment);
app.get("/productDetail", ProductDetails);
app.put("/updateProductQty", UpdateProductQty);

// User module
app.post("/register", Register);
app.post("/login", Login);

// Image Access
app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsPrd/"));

mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server Running At Port : " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Database Connection Error");
  });
