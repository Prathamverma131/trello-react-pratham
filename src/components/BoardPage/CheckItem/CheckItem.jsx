import React from "react";
import { Checkbox, Box, Typography } from "@mui/material";
import axios from "axios";
import Credentials from "../../../utilities/credentials/credentials.json";
import { useParams } from "react-router-dom";

function CheckItem({ data, checkItems, setCheckItems }) {
  const checkedApiCall = async (e) => {
    const cardId = localStorage.getItem("cardId");
    let state = "incomplete";

    if (e.target.checked) {
      state = "complete";
    }

    try {
      let jsonData = await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${data.id}`,
        null,
        {
          params: {
            key: Credentials.api_key,
            token: Credentials.api_token,
            state: state,
          },
        }
      );

      let filteredData = checkItems.map((item) => {
        if (data.id === item.id) {
          item.state = state;
        }
        return item;
      });

      setCheckItems(filteredData);
    } catch (e) {
      console.log("api call failed");
    }
  };

  const deleteApi = async () => {
    try {
      let jsonData = await axios.delete(
        `https://api.trello.com/1/checklists/${data.idChecklist}/checkItems/${data.id}`,
        {
          params: {
            key: Credentials.api_key,
            token: Credentials.api_token,
          },
        }
      );

      let filteredData = checkItems.filter((item) => data.id !== item.id);
      setCheckItems(filteredData);
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Checkbox
          checked={data.state === "complete" ? true : false}
          onChange={checkedApiCall}
        />
        {data.name}
      </Box>
      <Box
        sx={{ marginRight: 2, ":hover": { cursor: "pointer" } }}
        onClick={deleteApi}
      >
        X
      </Box>
    </Box>
  );
}

export default CheckItem;
