import { Button, Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import axios from "axios";
import * as copy from "clipboard-copy";
import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const form = (props) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  async function savePassword() {
    const { id, passwordName: name, URL, username, password, notes } = values;
    const token = localStorage.getItem("access_token");
    if (id) {
      try {
        const response = await axios.patch(
          `https://localhost:3100/api/passwords/me/${id}`,
          {
            name,
            URL,
            username,
            password,
            notes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (e) {
        console.error(`PATCH FAILED: ${e}`);
      }
    } else {
      try {
        const response = await axios.post(
          "https://localhost:3100/api/passwords/me",
          {
            name,
            URL,
            username,
            password,
            notes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (e) {
        console.error(`POST FAILED: ${e}`);
      }
    }
  }

  function copyUserToClipboard() {
    copy(values.username);
  }
  function copyPassToClipboard() {
    copy(values.password);
  }

  return (
    <div className="formWrap">
      <form className="formFields" onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <TextField
              required
              fullWidth
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
              style={{ width: 300 }}
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
              style={{ width: 300 }}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="copy to clipboard" onClick={copyUserToClipboard}>
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: 300 }}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="copy to clipboard" onClick={copyPassToClipboard}>
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: 300 }}
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
              style={{ width: 300 }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isSubmitting}
              onClick={savePassword}
              style={{ width: 100 }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const PasswordForm = withFormik({
  mapPropsToValues: ({ passwordRecord: pr }) => {
    return {
      id: pr?.id || "",
      passwordName: pr?.passwordName || "",
      URL: pr?.URL || "",
      password: pr?.password || "",
      username: pr?.username || "",
      notes: pr?.notes || "",
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

export default PasswordForm;
