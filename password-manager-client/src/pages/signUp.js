import React, { Component } from "react";
import { Link } from "react-router-dom";

class signUp extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      username: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      <div className="formCentre">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <label className="formFieldLabel" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="formFieldInput"
            placeholder="Please Enter Username"
            name="username"
            required=""
          ></input>
          <label className="formFieldLabel" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Please Enter Email"
            name="email"
            required=""
          ></input>{" "}
          <label className="formFieldLabel" htmlFor="passwordInital">
            Password:
          </label>
          <input
            type="password"
            id="passwordInital"
            className="formFieldInput"
            placeholder="Please Enter Password"
            name="passwordInital"
            required=""
          ></input>
          <label className="formFieldLabel" htmlFor="passwordConfirm">
            Confirm Password:
          </label>
          <input
            type="password"
            id="passwordConfirm"
            className="formFieldInput"
            placeholder="Please Confirm Your Password"
            name="passwordConfirm"
            required=""
          ></input>
          <button className="formFieldButton">Sign In</button>{" "}
        </form>
      </div>
    );
  }
}
export default signUp;
