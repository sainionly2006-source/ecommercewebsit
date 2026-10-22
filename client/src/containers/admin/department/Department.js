import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { renderMatches, useLocation, useNavigate } from "react-router-dom";
import University from "../university/University";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const query = useQuery();
  const [from, setForm] = useState({
    name: "",
    image: null,
    universityId: query.get("id"),
  });
  const [fromError, setFormError] = useState({ name: "", image: "" });
  const [departments, setDepartments] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...from, [e.target.name]: e.target.value });
  };

  function getDepartmentsByUniversity() {
    axios
      .get("http://localhost:8081/department?universityId=" + query.get("id"))
      .then((d) => {
        setDepartments(d.data.depData);
      })
      .catch((error) => {
        alert(error?.message);
      });
  }
  useEffect(() => {
    getDepartmentsByUniversity();
  }, []);
  function saveDepartment() {
    try {
      let formData = new FormData();
      formData.append("name", from.name);
      formData.append("image", from.image, from.image.name);
      formData.append("universityId", query.get("id"));
      axios
        .post("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getDepartmentsByUniversity();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function resetForm() {
    setForm({ name: "", image: null, universityId: query.get("id") });
  }
  function updateDepartment() {
    try {
      let formData = new FormData();
      formData.append("name", from.name);
      formData.append("image", from.image, from.image.name);
      formData.append("universityId", query.get("id"));
      formData.append("id", departmentId);
      axios
        .put("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getDepartmentsByUniversity();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function deleteDepartment(id) {
    let ans = window.confirm("Want to delete data ?");
    if (!ans) return;
    try {
      axios
        .delete("http://localhost:8081/department", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          getDepartmentsByUniversity();
          resetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: "" };
    if (from.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Name Empty !!!" };
    }
    if (from.image == null) {
      errors = true;
      error = { ...error, image: "Please select image !!!" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      departmentId ? updateDepartment() : saveDepartment();
    }
  }
  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:8081/" + item.image}
              height="150px"
              width="150px"
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => {
                navigate(
                  ROUTES.productAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name,
                );
              }}
            >
              Add Product
            </button>
          </td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => {
                setDepartmentId(item._id);
                setForm({ ...from, name: item.name });
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteDepartment(item._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <Header />
      <div className="row p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">University Name</label>
              <div className="col-8">
                <input
                  type="text"
                  disabled
                  value={query.get("name")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Department Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  value={from.name}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{fromError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Department Image</label>
              <div className="col-8">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...from, image: file });
                  }}
                />
                <p className="text-danger">{fromError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onDepartmentSubmit();
              }}
            >
              {departmentId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="row border p-2 m-2">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add Product</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Department;
