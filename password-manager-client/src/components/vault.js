import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import axios from "axios";
import React from "react";

class Vault extends React.Component {
  constructor() {
    super();
    this.state = { passwords: [] };
  }

  componentDidMount() {
    this.getPasswords();
  }

  async getPasswords() {
    const token = localStorage.getItem("access_token");
    const { status, data } = await axios.get("http://localhost:3100/api/passwords/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === 200 && data) {
      this.setState({ passwords: data });
    }
  }

  render() {
    return (
      <div>
        {this.state.passwords.map((password) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{password?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <passwordForm></passwordForm>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
}
export default Vault;
