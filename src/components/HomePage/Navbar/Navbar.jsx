import React from "react";
import Button from "@mui/material/Button";
import { Container, Box, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import styles from "./Navbar.module.css";
import Credentails from "../../../utilities/credentials/credentials.json";

function Navbar({ cardData, setCardData }) {
  let [modalState, setModalState] = useState(false);
  let [title, setTitle] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const postApiCall = async () => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/boards/?name=${title}&key=${Credentails.api_key}&token=${Credentails.api_token}`
      );

      setCardData({ type: "addcard", payload: { newCard: response.data } });
      enqueueSnackbar("Board created successfully!", { variant: "success" });
    } catch (e) {
      console.log("Unable to create board");
      enqueueSnackbar("Unable to create the board!", { variant: "error" });
    }
  };

  let modalComponent = (
    <Box
      sx={{
        position: "absolute",
        border: "1px solid grey",
        width: "200px",
        zIndex: 999,
        right: 0,
        mt: 1,
        p: 2,
        borderRadius: 3,
        bgcolor: "white",
        color: "black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <Typography variant="h6">Create Board</Typography>
        <Typography
          onClick={() => {
            setModalState(!modalState);
          }}
          sx={{
            ":hover": { cursor: "pointer" },
          }}
          variant="h6"
        >
          X
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography sx={{ marginBottom: 2 }}>Board Title:</Typography>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Box>
      <Button
        variant="outlined"
        sx={{ marginTop: 2 }}
        disabled={title ? false : true}
        onClick={() => {
          postApiCall();
        }}
      >
        Create
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        border: "1px solid grey",
        padding: 2,
        background: "#0067a3",
        color: "white",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5">Trello </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Button
            variant="contained"
            onClick={() => setModalState(!modalState)}
          >
            Create
          </Button>
          {modalState ? modalComponent : null}
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar;
