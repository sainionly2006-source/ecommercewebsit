import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: null, role: null });
  useEffect(() => {
    let id = localStorage.getItem("id");
    let role = localStorage.getItem("role");
    if (id) setUser({ id: id, role: role });
  }, []);

  function renderButtons() {
    if (user?.id) {
      return (
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.login.name);
            }}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
          <button
            className="btn btn-success m-1"
            onClick={() => {
              navigate(ROUTES.register.name);
            }}
          >
            Register
          </button>
          <button
            className="btn btn-success m-1"
            onClick={() => {
              navigate(ROUTES.login.name);
            }}
          >
            Login
          </button>
        </>
      );
    }
  }
  function renderNavigation() {
    if (user?.role == "admin") {
      return (
        <>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to={ROUTES.home.name} className="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.about.name} className="nav-link">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.contact.name} className="nav-link">
                Contact
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.support.name} className="nav-link">
                Support
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.universityAdmin.name} className="nav-link">
                University Management
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.universityAdmin.name} className="nav-link">
                Order Management
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.universityAdmin.name} className="nav-link">
                User Management
              </Link>
            </li>
          </ul>
        </>
      );
    } else {
      return (
        <>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to={ROUTES.home.name} className="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.about.name} className="nav-link">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.contact.name} className="nav-link">
                Contact
              </Link>
            </li>
            <li class="nav-item">
              <Link to={ROUTES.support.name} className="nav-link">
                Support
              </Link>
            </li>
          </ul>
        </>
      );
    }
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {renderNavigation()}
          {renderButtons()}
        </div>
      </nav>
    </>
  );
}

export default Header;
