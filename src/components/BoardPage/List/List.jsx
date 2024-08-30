import React, { act } from "react";
import { useState, useEffect, useReducer } from "react";
import { Box, Typography, Container, Paper, Button } from "@mui/material";
import Credentails from "../../../utilities/credentials/credentials.json";
import axios from "axios";
import BasicTextFields from "../../../utilities/TextField";
import Card from "../Card/Card";
import { useSnackbar } from "notistack";

const cardReducer = (state, action) => {
  switch (action.type) {
    case "apicall":
      return action.payload.cardData;
    case "newcard":
      return [...state, action.payload.newCardData];
    case "deletecard":
      return action.payload.filteredCard;
    default:
      return state;
  }
};

function List({ data, setListData, listData, setModal, setCardId }) {
  const [cardsData, cardsDispatcher] = useReducer(cardReducer, []);
  const [cardName, setCardName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const deleteApi = async (id) => {
    try {
      const jsonData = await axios.put(
        `https://api.trello.com/1/lists/${id}/closed?key=${Credentails.api_key}&token=${Credentails.api_token}&value=true`
      );
      let filteredData = listData.filter(
        (list) => list.id !== jsonData.data.id
      );
      setListData({
        type: "deletelist",
        payload: { deletedList: filteredData },
      });

      enqueueSnackbar("Deleted list successfully", { variant: "warning" });
    } catch (e) {
      enqueueSnackbar("Unable to delete list", { variant: "error" });
      console.log("failed to deleted list");
    }
  };

  const addCard = async () => {
    try {
      const jsonData = await axios.post(
        "https://api.trello.com/1/cards",
        null,
        {
          params: {
            idList: `${data.id}`,
            key: Credentails.api_key,
            token: Credentails.api_token,
            name: cardName,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );

      cardsDispatcher({
        type: "newcard",
        payload: { newCardData: jsonData.data },
      });
      enqueueSnackbar("Created card successfully!", { variant: "success" });
    } catch {
      cardsDispatcher();
      console.log("Unable to create card");
    }
  };

  const eventHandler = (e) => {
    setCardName(e.target.value);
  };

  useEffect(() => {
    const apiCall = async () => {
      const jsonData = await axios.get(
        `https://api.trello.com/1/lists/${data.id}/cards`,
        {
          params: {
            key: `${Credentails.api_key}`,
            token: `${Credentails.api_token}`,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );
      cardsDispatcher({
        type: "apicall",
        payload: { cardData: jsonData.data },
      });
    };

    try {
      apiCall();
    } catch (e) {
      console.log("error while fetching card");
    }
  }, []);

  return (
    <Paper
      sx={{
        borderRadius: "1rem",
        minWidth: "300px",
        boxSizing: "content-box",
        padding: 2,
        background: "#f1f2f4",
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{data.name}</Typography>
        <Box>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              deleteApi(data.id);
            }}
          >
            delete
          </span>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {cardsData.map((card) => (
          <Card
            key={card.id}
            data={card}
            cardsData={cardsData}
            setCardsData={cardsDispatcher}
            setModal={setModal}
            setCardId={setCardId}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          alignItems: "center",
        }}
      >
        <BasicTextFields handleEvent={eventHandler} />
        <Button
          disabled={cardName ? false : true}
          variant="outlined"
          sx={{ p: 1, height: 1 }}
          onClick={addCard}
        >
          Create
        </Button>
      </Box>
    </Paper>
  );
}

export default List;
