import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { renderMatches, useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Product() {
  const query = useQuery();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    departmentId: query.get("id"),
    images: null,
  });
  const [formError, setFormError] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    images: "",
  });
  const [products, setProducts] = useState(null);
  const [productId, setProductId] = useState(null);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function getProductsByDepartment() {
    axios
      .get("http://localhost:8081/product?departmentId=" + query.get("id"))
      .then((d) => {
        setProducts(d.data.prdData);
      })
      .catch((error) => {
        alert(error?.message);
      });
  }
  useEffect(() => {
    getProductsByDepartment();
  }, []);
  function saveProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("qty", form.qty);
      formData.append("departmentId", query.get("id"));
      axios
        .post("http://localhost:8081/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getProductsByDepartment();
          ressetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function updateProduct() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("qty", form.qty);
      formData.append("departmentId", query.get("id"));
      formData.append("id", productId);
      axios
        .put("http://localhost:8081/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          getProductsByDepartment();
          ressetForm();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function deleteProduct(id) {
    let ans = window.confirm("Want to delete data ?");
    if (!ans) return;
    try {
      axios
        .delete("http://localhost:8081/product", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          getProductsByDepartment();
        });
    } catch (error) {
      alert(error?.message);
    }
  }
  function onProductSubmit() {
    let errors = false;
    let error = { name: "", description: "", price: "", qty: "", images: "" };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Name Empty !!!" };
    }
    if (form.description.trim().length == 0) {
      errors = true;
      error = { ...error, description: "Description Empty !!!" };
    }
    if (form.price == 0 || form.price == "") {
      errors = true;
      error = { ...error, price: "Price Empty !!!" };
    }
    if (form.qty == 0 || form.qty == "") {
      errors = true;
      error = { ...error, qty: "Qty Empty !!!" };
    }
    if (form.images == null) {
      errors = true;
      error = { ...error, images: "Please select image !!!" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      productId ? updateProduct() : saveProduct();
    }
  }
  function ressetForm() {
    setForm({
      name: "",
      description: "",
      price: "",
      qty: "",
      departmentId: query.get("id"),
      images: null,
    });
  }

  function renderProducts() {
    return products?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:8081/" + item.images[0]}
              height="150px"
              width="150px"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.qty}</td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => {
                setProductId(item._id);
                setForm({
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  qty: item.qty,
                });
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteProduct(item._id);
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
      <div className="row border p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {productId ? "Edit Product" : "New Product"}
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">Department Name</label>
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
              <label className="col-4">Product Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Description</label>
              <div className="col-8">
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Price</label>
              <div className="col-8">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Qty</label>
              <div className="col-8">
                <input
                  type="number"
                  name="qty"
                  value={form.qty}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.qty}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Product Images</label>
              <div className="col-8">
                <input
                  type="file"
                  name="images"
                  className="form-control"
                  onChange={(e) => {
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button
              className="btn btn-info"
              onClick={() => {
                onProductSubmit();
              }}
            >
              {productId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="row border p-2 m-2">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Product Qty</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
