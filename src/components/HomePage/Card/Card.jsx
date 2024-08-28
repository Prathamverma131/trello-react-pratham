import React from "react";
import { Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Card({ data }) {
  let navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        height: "10rem",
        width: "15rem",
        padding: 3,
        color: "white",
        ":hover": { cursor: "pointer" },
        background: `rgb(${Math.floor(Math.random() * 250)},${Math.floor(
          Math.random() * 250
        )},${Math.floor(Math.random() * 250)})`,
      }}
      onClick={() => {
        navigate(
          `/board/${data.name}/${data.shortLink ? data.shortLink : data.id}`
        );
      }}
    >
      {data.name}
    </Paper>
  );
}

export default Card;
