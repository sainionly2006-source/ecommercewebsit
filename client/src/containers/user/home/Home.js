import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

function Home() {
  const [universities, setUniversities] = useState(null);
  const navigate = useNavigate();
  function getUniversities() {
    axios
      .get("http://localhost:8081/university")
      .then((d) => {
        setUniversities(d.data.univData);
      })
      .catch((error) => {
        alert(error?.message);
      });
  }
  useEffect(() => {
    getUniversities();
  }, []);
  function renderUniversities() {
    return universities?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8081/" + item.image}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <a
                onClick={() => {
                  navigate(ROUTES.departmentUser.name + "?id=" + item._id);
                }}
                class="btn btn-primary text-white"
              >
                View Department
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
      <div className="row border p-2 m-2">{renderUniversities()}</div>
    </div>
  );
}

export default Home;
