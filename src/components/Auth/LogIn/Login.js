import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { address } from "../../0auth/Helper/HelperApi";
import "../LogIn/Login.css";
import { authHelper } from "../../0auth/Helper/Config";
export const Login = () => {
  const [data, setData] = useState({});
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const logIn = async () => {
    try {
      const url = await authHelper()
        .post(`/user/login`, data)
        .then((result) => {
          if (result.data.data.accessToken) {
            localStorage.setItem(
              "token",
              JSON.stringify(result.data.data.accessToken)
            );
            Navigate("/dashboard");
          }
        });
    } 
    catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="vh-100" id="login-section">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" id="login-border">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log In
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="username"
                              type="text"
                              name="username"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="name">
                              Username
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="password"
                              type="password"
                              name="password"
                              autoComplete="on"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={logIn}
                          >
                            Log In
                          </button>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          Don't have an account
                          <Link to="/signup">Sign Up</Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
