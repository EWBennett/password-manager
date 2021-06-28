import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import PasswordForm from "../components/PasswordForm";

class Vault extends React.Component {
  constructor(props) {
    super();
    this.state = { passwords: [] };
  }

  componentDidMount() {
    this.getPasswords();
  }

  async getPasswords() {
    const token = localStorage.getItem("access_token");
    try {
      const { status, data: passwords } = await axios.get(
        "http://localhost:3100/api/passwords/me/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200 && passwords) {
        this.setState({ passwords });
      }
    } catch (e) {
      console.error(`RETRIEVAL FAILED: ${e}`);
    }
  }

  async deletePassword(id) {
    const token = localStorage.getItem("access_token");
    try {
      const { status } = await axios.delete(`http://localhost:3100/api/passwords/me/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.error(`DELETION FAILED: ${e}`);
    }
    this.getPasswords();
    this.render();
  }

  render() {
    console.log(this.props.searchQuery);
    return (
      <div>
        {this.state.passwords
          .filter((password) => {
            return (password?.name || "")
              .toLowerCase()
              .includes((this.props?.searchQuery || "").toLowerCase());
          })
          .map((password) => {
            const passwordRecord = {
              id: password?.id || "",
              passwordName: password?.name || "",
              URL: password?.URL || "",
              password: password?.password || "",
              username: password?.username || "",
              notes: password?.notes || "",
            };
            console.log(passwordRecord);
            return (
              <Accordion key={password?.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{password?.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <PasswordForm passwordRecord={passwordRecord} />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={async () => {
                          await this.deletePassword(passwordRecord.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    );
  }
}
export default Vault;
