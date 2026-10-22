import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { renderMatches, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import uploadimage from "../../../images/success.jpg";
import $ from "jquery";
import "datatables.net"; // JS library

import "datatables.net-dt/css/dataTables.dataTables.css";

function University() {
  const [form, setForm] = useState({ name: "", image: null });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [universities, setUniversities] = useState(null);
  const [universityId, setUniversityId] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function getUniversities() {
    axios
      .get("http://localhost:8081/university")
      .then((d) => {
        setUniversities(d.data.univData);
      })
      .catch((error) => {
        alert("Unable to access api");
      });
  }

  useEffect(() => {
    getUniversities();
  }, []);
  useEffect(() => {
    if (universities && universities.length > 0) {
      setTimeout(() => {
        $("#universityTable").DataTable();
      }, 100);
    }
  }, [universities]);

  function saveUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      axios
        .post("http://localhost:8081/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          // alert(d.data.message);
          try {
            toast.success("University Created");
          } catch (error) {
            toast.error("University Not Created");
          }
          getUniversities();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function resetForm() {
    setForm({ name: "", image: null });
  }
  function updateUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("id", universityId);
      axios
        .put("http://localhost:8081/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          // alert(d.data.message);
          try {
            Swal.fire({
              icon: "success",
              imageUrl: uploadimage,
              imageHeight: 100,
              imageWidth: 100,
              text: "Data Update",
              title: "success",
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "error",
              text: "Data Not Update",
            });
          }
          try {
          } catch (error) {}
          getUniversities();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function deleteUniversity(id) {
    let ans = window.confirm("Want to delete data ?");
    if (!ans) return;
    try {
      axios
        .delete("http://localhost:8081/university", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          getUniversities();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function onUniversitySubmit() {
    let errors = false;
    let error = { name: "", image: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Name Empty !!!" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please select image !!!" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      universityId ? updateUniversity() : saveUniversity();
    }
  }
  function renderUniversities() {
    return universities?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:8081/" + item.image}
              width={100}
              height={100}
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => {
                navigate(
                  ROUTES.departmentAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name,
                );
              }}
            >
              <i class="fa-solid fa-plus"></i> Add Department
            </button>
          </td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => {
                setUniversityId(item._id);
                setForm({ ...form, name: item.name });
              }}
            >
              <i class="fa-solid fa-pen-to-square"></i>Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteUniversity(item._id);
              }}
            >
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <Header />
      <div className="row border p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {universityId ? "Edit University" : "New University"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">University Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={changeHandler}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">University Image</label>
              <div className="col-8">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onUniversitySubmit();
              }}
            >
              {/* {universityId ? "Update" : "Save"} */}
              <i
                className={
                  universityId
                    ? "fa-solid fa-pen-to-square"
                    : "fa-solid fa-floppy-disk"
                }
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table
          id="universityTable"
          className="table table-bordered table-striped table-hover w-100"
        >
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </>
  );
}

export default University;
