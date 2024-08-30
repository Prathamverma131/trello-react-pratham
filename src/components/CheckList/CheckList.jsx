import React from "react";
import { useState, useEffect, useReducer } from "react";
import styles from "./CheckList.module.css";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Credentials from "../../utilities/credentials/credentials.json";
import CheckComponent from "../BoardPage/CheckComponent/CheckComponent";
import BasicTextFields from "../../utilities/TextField";
import { checkListReducer } from "../../utilities/useReducer/useReducer";

function CheckList({ setModal, cardId }) {
  const [checkListName, setCheckListName] = useState("");
  const [checkList, checkListDispatcher] = useReducer(checkListReducer, []);

  const postData = async () => {
    try {
      let jsonData = await axios.post(
        "https://api.trello.com/1/checklists",
        null,
        {
          params: {
            idCard: cardId,
            key: Credentials.api_key,
            token: Credentials.api_token,
            name: checkListName,
          },
        }
      );
      checkListDispatcher({
        type: "newlist",
        payload: { newlist: jsonData.data },
      });
    } catch (e) {
      checkListDispatcher();
    }
  };

  const fetchData = async () => {
    let jsonData = await axios.get(
      `https://api.trello.com/1/cards/${cardId}/checklists/`,
      {
        params: {
          key: Credentials.api_key,
          token: Credentials.api_token,
        },
      }
    );
    checkListDispatcher({
      type: "apicall",
      payload: { checkListData: jsonData.data },
    });
  };

  useEffect(() => {
    try {
      fetchData();
    } catch {
      console.log("error while fetching checklist");
      checkListDispatcher();
    }
  }, [cardId]);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          background: "grey",
          opacity: "0.8",
        }}
        onClick={() => {
          setModal((prev) => !prev);
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          minHeight: "50vh",
          width: "50vh",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Typography variant="h5">Checklist</Typography>
          <Typography
            onClick={() => {
              setModal((prev) => !prev);
            }}
            variant="h5"
            sx={{ ":hover": { cursor: "pointer" } }}
          >
            X
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {checkList.map((item) => {
            return (
              <CheckComponent
                data={item}
                checkList={checkList}
                setCheckList={checkListDispatcher}
                key={item.id}
              />
            );
          })}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <BasicTextFields
              label={"CheckList Name"}
              handleEvent={(e) => {
                setCheckListName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              disabled={checkListName ? false : true}
              onClick={() => {
                postData();
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckList;
