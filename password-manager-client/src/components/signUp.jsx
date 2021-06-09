import React, { Component } from "react";
import { Button, TextField, Container, Paper, Grid } from "@material-ui/core";
import { Formik, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { SignalCellularNullSharp } from "@material-ui/icons";

const form = (props) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  async function signUp() {
    const { username, email, password, passwordHint } = values;
    const response = await axios.post("http://localhost:3100/api/users/signup", {
      username,
      email,
      password,
      passwordHint,
    });
  }

  return (
    <form className="formFields" onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField
            required
            id="username"
            color="primary"
            variant="outlined"
            label="Username"
            placeholder="Username"
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            autoFocus
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="email"
            color="primary"
            variant="outlined"
            label="Email Address"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="password"
            color="primary"
            variant="outlined"
            label="Password"
            placeholder="Password"
            type="password"
            autoComplete="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="confirmPassword"
            color="primary"
            variant="outlined"
            label="Confirm Password"
            placeholder="Password"
            type="password"
            autoComplete="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Grid>
        <Grid item>
          <TextField
            id="passwordHint"
            color="primary"
            variant="outlined"
            label="Password Hint"
            placeholder="Hint"
            value={values.passwordHint}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitting}
            onClick={signUp}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const signUp = withFormik({
  mapPropsToValues: ({ username, email, password, confirmPassword, passwordHint }) => {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      passwordHint: passwordHint || "",
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required(" "),
    email: Yup.string().email("Invalid email address").required(" "),
    password: Yup.string().min(8, "Password must contain at least 8 characters").required(" "),
    confirmPassword: Yup.string()
      .required(" ")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default signUp;
