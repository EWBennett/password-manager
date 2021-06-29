import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Settings from "../components/SettingsForm";
import axios from "axios";

export default class ChangeSettings extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }
  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const token = localStorage.getItem("access_token");
    try {
      const { status, data: user } = await axios.get("https://localhost:3100/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200 && user) {
        this.setState({ user });
      }
    } catch (e) {
      console.error(`RETRIEVAL FAILED: ${e}`);
    }
  }

  render() {
    if (this.state?.user) {
      const userRecord = {
        username: this.state.user.username || "",
        email: this.state.user.email || "",
        password: this.state.user.password || "",
        confirmPassword: this.state.user.confirmPassword || "",
        passwordHint: this.state.user.passwordHint || "",
      };
      return (
        <Paper elevation={3}>
          <Settings userRecord={userRecord} />
        </Paper>
      );
    }
    return <>LOADING</>;
  }
}
