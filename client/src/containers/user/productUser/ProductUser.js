import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductUser() {
  const query = useQuery();
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
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
  function renderProducts() {
    return products?.map((item) => {
      return (
        <div className="col-4">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8081/" + item.images[0]}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Product Name : {item.name}</h5>
              <h5 class="card-title">
                Product Description : {item.description}
              </h5>
              <h5 class="card-title">Product Price : {item.price}</h5>

              <a
                href="#"
                class="btn btn-primary"
                onClick={() => {
                  navigate(ROUTES.productDetail.name + "?id=" + item._id);
                }}
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Header />
      <div className="row border p-2 m-2">{renderProducts()}</div>
    </div>
  );
}

export default ProductUser;
