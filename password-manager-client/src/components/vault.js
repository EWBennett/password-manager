import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function Vault() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>This is a placeholder password entry</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          This is where the rest of the information about the password should go. I should probably
          keep writing so it's a bit longer.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
