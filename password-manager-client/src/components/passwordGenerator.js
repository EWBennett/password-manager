import React, { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Checkbox,
} from "@material-ui/core";
import { Visibility, VisibilityOff, FileCopy } from "@material-ui/icons";
import copy from "clipboard-copy";

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
  const [password, setPassword] = useState("");
  const { lowercase, uppercase, numbers, symbols } = state;

  function generate() {}

  return (
    <Paper elevation={3}>
      <div className="formWrap">
        <Grid container justify="center" spacing={1}>
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
                    <IconButton aria-label="copy to clipboard" onClick={copy(password)}>
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
                <TextField id="length" label="Length" type="number" defaultValue="16" />
              </Grid>
              <Grid container item>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox checked={state.checkedA} onChange={handleChange} name="lowercase" />
                    }
                    label="Lowercase"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox checked={state.checkedA} onChange={handleChange} name="uppercase" />
                    }
                    label="Uppercase"
                  />
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox checked={state.checkedA} onChange={handleChange} name="numbers" />
                    }
                    label="Numbers"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox checked={state.checkedA} onChange={handleChange} name="symbols" />
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
