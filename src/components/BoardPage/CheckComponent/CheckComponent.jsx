import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import axios from "axios";
import Credentials from "../../../utilities/credentials/credentials.json";
import { useState, useEffect } from "react";
import CheckItem from "../CheckItem/CheckItem";

function CheckComponent({ data, checkList, setCheckList }) {
  const [checkItems, setCheckItems] = useState([]);
  const [itemsName, setItemsName] = useState("");

  const postApiCall = async () => {
    console.log(itemsName, data.id);
    try {
      let jsonData = await axios.post(
        `https://api.trello.com/1/checklists/${data.id}/checkItems`,
        null,
        {
          params: {
            name: itemsName,
            key: Credentials.api_key,
            token: Credentials.api_token,
          },
        }
      );

      setCheckItems([...checkItems, jsonData.data]);
    } catch (e) {
      console.log("Api call failed!");
    }
  };

  const deleteApiCall = async (id) => {
    let jsonData = await axios.delete(
      `https://api.trello.com/1/checklists/${id}`,
      {
        params: {
          key: Credentials.api_key,
          token: Credentials.api_token,
        },
      }
    );
    let filteredData = checkList.filter((check) => check.id !== id);
    setCheckList(filteredData);
  };

  const apiCall = async () => {
    try {
      let jsonData = await axios.get(
        `https://api.trello.com/1/checklists/${data.id}/checkItems`,
        {
          params: {
            key: Credentials.api_key,
            token: Credentials.api_token,
          },
        }
      );
      setCheckItems(jsonData.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    try {
      apiCall();
    } catch (e) {}
  }, []);

  return (
    <Box sx={{ background: "lightgray", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{data.name}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            deleteApiCall(data.id);
          }}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        {checkItems.map((item) => {
          return (
            <CheckItem
              key={item.id}
              data={item}
              checkItems={checkItems}
              setCheckItems={setCheckItems}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          onChange={(e) => {
            setItemsName(e.target.value);
          }}
          style={{
            padding: "0.5rem",
            marginTop: "0.4rem",
            border: "none",
            outline: "none",
          }}
          type="text"
          placeholder="Add item..."
        />
        <Button
          variant="outlined"
          onClick={() => {
            postApiCall();
          }}
          disabled={itemsName ? false : true}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default CheckComponent;
