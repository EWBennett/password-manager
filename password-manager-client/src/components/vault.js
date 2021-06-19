import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import passwordForm from "./passwordForm";

export default function Vault() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>
          This is a placeholder password entry. This should be the name of the password record.
        </Typography>
      </AccordionSummary>
      <AccordionDetails>component={passwordForm}</AccordionDetails>
    </Accordion>
  );
}
