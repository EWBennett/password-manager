import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const form = (props) => {
  if (localStorage.getItem("access_token")) {
    window.location.assign("/#/dashboard");
  }
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  async function logIn() {
    const { username, password } = values;
    const { data, status } = await axios.post("http://localhost:3100/api/auth/login", {
      username,
      password,
    });
    if (status === 201 && data?.access_token) {
      localStorage.setItem("access_token", data.access_token);
      window.location.assign("/#/dashboard/");
    }
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
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isSubmitting}
            onClick={logIn}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const logIn = withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required(" "),
    password: Yup.string().min(8, "Must be at least 8 characters").required(" "),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default logIn;
