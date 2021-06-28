import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import copy from "clipboard-copy";
import React, { useState } from "react";

export default function Generator() {
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [state, setState] = React.useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const { lowercase, uppercase, numbers, symbols } = state;
  const [password, setPassword] = useState("");
  const [length, setLength] = useState("16");
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  function generate() {
    var charset = "";
    var result = "";
    if (lowercase) {
      charset += lower;
    }
    if (uppercase) {
      charset += upper;
    }
    if (numbers) {
      charset += num;
    }
    if (symbols) {
      charset += sym;
    }
    for (var i = 0, n = charset.length; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(result);
  }

  function copyToClipboard() {
    copy(password);
  }

  return (
    <Paper elevation={3}>
      <div className="formWrap">
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="password"
              color="primary"
              variant="outlined"
              fullWidth="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="copy to clipboard" onClick={copyToClipboard}>
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <FormControl component="fieldset">
            <FormGroup column>
              <Grid item>
                <TextField
                  id="length"
                  label="Length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </Grid>
              <Grid container item>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="lowercase"
                        checked={lowercase}
                      />
                    }
                    label="Lowercase"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="uppercase"
                        checked={uppercase}
                      />
                    }
                    label="Uppercase"
                  />
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="numbers"
                        checked={numbers}
                      />
                    }
                    label="Numbers"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="symbols"
                        checked={symbols}
                      />
                    }
                    label="Symbols"
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={generate}>
                  Generate
                </Button>
              </Grid>
            </FormGroup>
          </FormControl>
        </Grid>
      </div>
    </Paper>
  );
}
