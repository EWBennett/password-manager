import { Button, Grid, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const form = (props) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  async function savePassword() {
    const { passwordName, URL, username, password, notes } = values;
    const response = await axios.post("http://localhost:3100/api/passwords/me", {
      passwordName,
      URL,
      username,
      password,
      notes,
    });
  }

  return (
    <Paper elevation={3}>
      <div className="formWrap">
        <form className="formFields" onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
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
                autoFocus
              />
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
              <TextField
                id="notes"
                color="primary"
                variant="outlined"
                label="Notes"
                value={values.notes}
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
                onClick={passwordForm}
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
      setSubmitting(false);
    }, 1000);
  },
})(form);

export default passwordForm;
