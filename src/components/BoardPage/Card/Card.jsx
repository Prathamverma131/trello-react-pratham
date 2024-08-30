import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import Credentails from "../../../utilities/credentials/credentials.json";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

function Card({ data, cardsData, setCardsData, setModal, setCardId }) {
  const { enqueueSnackbar } = useSnackbar();
  const deleteApiCall = async (e, id) => {
    e.stopPropagation();
    try {
      let jsonData = await axios.delete(
        `https://api.trello.com/1/cards/${id}?key=${Credentails.api_key}&token=${Credentails.api_token}`
      );

      let filteredData = cardsData.filter((card) => card.id !== id);

      setCardsData({
        type: "deletecard",
        payload: { filteredCard: filteredData },
      });
      enqueueSnackbar("Deleted card successfully!", { variant: "warning" });
    } catch (e) {
      console.log("APi call failed");
      enqueueSnackbar("Unable to delete card", { variant: "error" });
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setCardId(data.id);
          setModal((prev) => !prev);
          localStorage.setItem("cardId", `${data.id}`);
        }}
        sx={{
          background: "white",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>{data.name}</Box>
        <Box>
          <span
            className="material-symbols-outlined"
            onClick={(e) => {
              deleteApiCall(e, data.id);
            }}
          >
            delete
          </span>
        </Box>
      </Box>
    </>
  );
}

export default Card;
