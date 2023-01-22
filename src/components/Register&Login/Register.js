import React, { Component } from "react";
import "./Register.css";
import Header from "../Header/Header";
const url = "http://localhost:5005/register";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameValid: true,
      email: "",
      emailValid: true,
      password: "",
      passwordValid: true,
      phone: "",
      phoneValid: true,
      formValid: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });

    if (event.target.id === "name") {
      this.validateName(event.target.value);
    }
    if (event.target.id === "email") {
      this.validateEmail(event.target.value);
    }
    if (event.target.id === "password") {
      this.validatePassword(event.target.value);
    }
    if (event.target.id === "phone") {
      this.validatePhone(event.target.value);
    }

    if (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.phone !== ""
    ) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  };

  validateName = (name) => {
    if (name.length < 3) {
      this.setState({ nameValid: false });
      return false;
    } else {
      this.setState({ nameValid: true });
      return true;
    }
  };
  validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      this.setState({ emailValid: false });
      return false;
    } else {
      this.setState({ emailValid: true });
      return true;
    }
  };
  validatePassword = (password) => {
    if (password.length < 8) {
      this.setState({ passwordValid: false });
      return false;
    } else {
      this.setState({ passwordValid: true });
      return true;
    }
  };
  validatePhone = (phone) => {
    if (isNaN(phone) || phone.toString().length !== 10) {
      this.setState({ phoneValid: false });
      return false;
    } else {
      this.setState({ phoneValid: true });
      return true;
    }
  };

  handleSubmit = () => {
    if (this.state.formValid) {
      fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      }).then(this.props.history.push("/login"));
    }
  };

  render() {
    return (
      <div>
        <Header />

        <div className="main">
          <div class="form-containers">
            <div class="form-headings">Signup Form</div>
            <form onSubmit={this.handleSubmit}>
              <label for="name">Name:</label>
              <input
                type={this.state.nameValid ? "text" : "text"}
                id="name"
                class={
                  this.state.nameValid ? "form-inputs" : "form-inputs error"
                }
                required
                onChange={this.handleChange}
                value={this.state.name}
              />
              {!this.state.nameValid && (
                <div className="error-message">
                  Name should be at least 3 characters long
                </div>
              )}

              <label for="email">Email:</label>
              <input
                type={this.state.emailValid ? "email" : "email"}
                id="email"
                class={
                  this.state.emailValid ? "form-inputs" : "form-inputs error"
                }
                required
                onChange={this.handleChange}
                value={this.state.email}
              />
              {!this.state.emailValid && (
                <div className="error-message">Email is invalid</div>
              )}

              <label for="password">Password:</label>
              <input
                type={this.state.passwordValid ? "password" : "password"}
                id="password"
                class={
                  this.state.passwordValid ? "form-inputs" : "form-inputs error"
                }
                required
                onChange={this.handleChange}
                value={this.state.password}
              />
              {!this.state.passwordValid && (
                <div className="error-message">
                  Password should be at least 8 characters long
                </div>
              )}

              <label for="phone">Phone:</label>
              <input
                type={this.state.phoneValid ? "number" : "number"}
                id="phone"
                class={
                  this.state.phoneValid ? "form-inputs" : "form-inputs error"
                }
                onChange={this.handleChange}
                value={this.state.phone}
                required
              />
              {!this.state.phoneValid && (
                <div className="error-message">
                  Phone should be a 10 digit number
                </div>
              )}

              <input
                type="submit"
                value="Signup"
                class="form-submits"
                onClick={this.handleSubmit}
                disabled={
                  !this.state.nameValid ||
                  !this.state.emailValid ||
                  !this.state.passwordValid ||
                  !this.state.phoneValid
                }
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
