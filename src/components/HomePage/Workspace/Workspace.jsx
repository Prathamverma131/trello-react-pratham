import styles from "./Workspace.module.css";
import React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Credentials from "../../../utilities/credentials/credentials.json";

const Workspace = ({ cardData, setCardData }) => {
  let fetchData = async () => {
    try {
      const jsonData = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${Credentials.api_key}&token=${Credentials.api_token}`
      );
      setCardData({ type: "fetchdata", payload: { cardData: jsonData.data } });
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log("Error in api call");
      setCardData([]);
    }
  }, []);

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Box>
        <Typography sx={{ fontWeight: "900" }} variant="h6">
          Trello Workspace
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {cardData.map((card) => (
          <Card data={card} key={card.id} />
        ))}
      </Box>
    </Container>
  );
};

export default Workspace;
