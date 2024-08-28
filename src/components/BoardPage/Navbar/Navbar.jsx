import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

function Navbar() {
  const { boardName, boardId } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#0067a3", p: 2, color: "white" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            ":hover": "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Trello
        </Typography>
        <Typography variant="h5">{boardName}</Typography>
      </Container>
    </Box>
  );
}

export default Navbar;
