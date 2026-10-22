import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetail() {
  const query = useQuery();
  const [prdDet, setPrdDet] = useState(null);
  const navigate = useNavigate();
  function getProductDetail() {
    axios
      .get("http://localhost:8081/productDetail?id=" + query.get("id"))
      .then((d) => {
        setPrdDet(d.data.prdData);
      })
      .catch((error) => {
        alert(error?.message);
      });
  }
  useEffect(() => {
    getProductDetail();
  }, []);
  function renderImages() {
    return prdDet?.images.map((item) => {
      return (
        <img
          src={"http://localhost:8081/" + item}
          height="150px"
          width="150px"
        />
      );
    });
  }
  return (
    <div>
      <Header />
      <div className="row border p-2 m-2">
        <div class="card mx-auto">
            <div style={{ display: "flex", flexDirection: "row" }}>
            {renderImages()}
          </div>
          <div class="card-body">
            <h5 class="card-title">Product Name : {prdDet?.name}</h5>
            <h5 class="card-title">
              Product Description : {prdDet?.description}
            </h5>
            <h5 class="card-title">Product Price : {prdDet?.price}</h5>
            <h5 class="card-title">
              Product qty : <input type="number" name="qty" />
            </h5>
            <a
              href="#"
              class="btn btn-primary"
              onClick={() => {
                localStorage.getItem("id")
                  ? navigate(ROUTES.home.name)
                  : navigate(ROUTES.login.name);
              }}
            >
              Add To Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
