import React from "react";
import List from "../List/List";
import { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import Credentails from "../../../utilities/credentials/credentials.json";
import styles from "../../HomePage/Navbar/Navbar.module.css";

function BoardBody({ listData, setListData, setModal, setCardId }) {
  const [modalState, setModalState] = useState(false);
  const [title, setTitle] = useState("");
  const { boardId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const postApiCall = async (e) => {
    try {
      let jsonData = await axios.post(
        `https://api.trello.com/1/boards/${boardId}/lists`,
        null,
        {
          params: {
            name: `${title}`,
            key: `${Credentails.api_key}`,
            token: `${Credentails.api_token}`,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );
      setListData((prev) => [...prev, jsonData.data]);
      enqueueSnackbar("Created list successfully!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Unable to create!", { variant: "warning" });
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
        background: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
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
        <input
          type="text"
          placeholder="Enter name of this card..."
          value={title}
          className={styles.input}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Box>
      <Button
        variant="outlined"
        sx={{ marginTop: 2 }}
        disabled={title ? false : true}
        onClick={(e) => {
          postApiCall(e);
          setModalState(!modalState);
        }}
      >
        Create
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        padding: 5,
        flexWrap: "wrap",
      }}
    >
      {listData.map((list) => {
        return (
          <List
            data={list}
            setListData={setListData}
            listData={listData}
            key={list.id}
            setModal={setModal}
            setCardId={setCardId}
          />
        );
      })}
      <Box sx={{ position: "relative" }}>
        <Button
          variant="contained"
          onClick={() => {
            setModalState(!modalState);
          }}
        >
          + Add another list
        </Button>
        {modalState ? modalComponent : null}
      </Box>
    </Box>
  );
}

export default BoardBody;
