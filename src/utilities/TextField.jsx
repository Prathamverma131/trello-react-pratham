import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ handleEvent, label = "Card Name" }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        onChange={handleEvent}
      />
    </Box>
  );
}
