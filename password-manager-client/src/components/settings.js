import { Button, Grid, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const form = (props) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  async function updateDetails() {
    const { username, email, password, passwordHint } = values;
    const response = await axios.patch("http://localhost:3100/api/auth/login", {
      username,
      email,
      password,
      passwordHint,
    });
  }

  return (
    <Paper elevation={3}>
      <div className="formWrap">
        <form className="formFields" onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <TextField
                id="username"
                color="primary"
                variant="outlined"
                label="Your username"
                placeholder="Username"
                autoComplete="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                color="primary"
                variant="outlined"
                label="Your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                color="primary"
                variant="outlined"
                label="Your account password"
                placeholder="Password"
                type="password"
                autoComplete="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
                label="Notes"
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
                onClick={settings}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  );
};

const settings = withFormik({
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
    password: Yup.string().min(8, "Must be at least 8 characters").required(" "),
    confirmPassword: Yup.string()
      .required(" ")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default settings;
