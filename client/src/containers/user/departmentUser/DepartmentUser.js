import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function DepartmentUser() {
  const query = useQuery();
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
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
  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:8081/" + item.image}
              alt="Card image cap"
              height="150px"
              width="150px"
            />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <a
                onClick={() => {
                  navigate(ROUTES.productUser.name + "?id=" + item._id);
                }}
                class="btn btn-primary text-white"
              >
                View Products
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
      <div className="row border p-2 m-2">{renderDepartments()}</div>
    </div>
  );
}

export default DepartmentUser;
