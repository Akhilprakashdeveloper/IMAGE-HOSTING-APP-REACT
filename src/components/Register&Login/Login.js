import React, { useState } from "react";
import Header from "../Header/Header";
import "./Login.css";
import { Link } from "react-router-dom";

const url = "http://localhost:5005/login";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth === false) {
          setFormData({ message: data.token });
        } else {
          sessionStorage.setItem("token", data.token);
          props.history.push("/");
        }
      });
  };

  return (
    <>
      <div className="login-bg">
        <Header />
        <div className="container">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3>Login</h3>
              <h2>{formData.message}</h2>
            </div>
            <div className="panel-body">
              <div className="row">
                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    class="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                id="submit-button"
              >
                Login
              </button>
              <button className="btn" id="register-button">
                <Link
                  to="/register"
                  className="register-link"
                  style={{ textDecoration: "none" }}
                >
                  Don't have an account create one now
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
