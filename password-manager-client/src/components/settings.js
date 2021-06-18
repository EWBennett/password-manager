import React, { Component } from "react";
import { Button, TextField, Container, Paper, Grid } from "@material-ui/core";
import { Formik, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const form = (props) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  return (
    <Paper elevation={3}>
      <form className="formFields" onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <TextField
            required
            id="passwordName"
            color="primary"
            variant="outlined"
            label="Name"
            placeholder="Name"
            value={values.passwordName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.passwordName && Boolean(errors.passwordName)}
            helperText={touched.passwordName ** Boolean(errors.passwordName)}
            autoFocus
          />
          <TextField
            id="URL"
            color="primary"
            variant="outlined"
            label="Website Address"
            placeholder="Address"
            value={values.URL}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="password"
            color="primary"
            variant="outlined"
            label="Website password"
            placeholder="Password"
            type="password"
            autoComplete="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="username"
            color="primary"
            variant="outlined"
            label="Website username"
            placeholder="Username"
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="notes"
            color="primary"
            variant="outlined"
            label="Notes"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

const passwordForm = withFormik({
  mapPropsToValues: ({ passwordName, URL, password, username, notes }) => {
    return {
      passwordName: passwordName || "",
      URL: URL || "",
      password: password || "",
      username: username || "",
      notes: notes || "",
    };
  },

  validationSchema: Yup.object().shape({
    passwordName: Yup.string().required("A name is required"),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default passwordForm;