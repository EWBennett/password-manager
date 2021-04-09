import React, { Component } from "react";
import { Link } from "react-router-dom";

class logIn extends Component {
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
          <label className="formFieldLabel" htmlFor="passwordInital">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Please Enter Password"
            name="password"
            required=""
          ></input>
          <button className="formFieldButton">Log In</button>{" "}
        </form>
      </div>
    );
  }
}
export default logIn;
