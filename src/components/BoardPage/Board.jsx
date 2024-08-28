import React from "react";
import Navbar from "./Navbar/Navbar";
import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BoardBody from "./BoardBody/BoardBody";
import { SnackbarProvider } from "notistack";
import CheckList from "../CheckList/CheckList";

function Board() {
  const { boardName, boardId } = useParams();
  const [listData, setListData] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    try {
      const fetchApi = async () => {
        let jsonData = await axios.get(
          `https://api.trello.com/1/boards/${boardId}/lists?key=3201d7b21e55820e3304f953bea743f8&token=ATTA4a66862219b268712569cd5453e27bfe6f955326e5e6c6ae0b92b4c410a4b0d28FD4C6CA`
        );
        setListData(jsonData.data);
      };
      fetchApi();
    } catch (e) {
      setListData([]);
    } finally {
    }
  }, [boardId]);

  return (
    <SnackbarProvider>
      <Box sx={{ background: "#0079bf", minHeight: "100vh" }}>
        <Navbar />
        <BoardBody
          listData={listData}
          setListData={setListData}
          setModal={setOpenList}
          setCardId={setCardId}
        />
      </Box>
      {openList ? <CheckList setModal={setOpenList} cardId={cardId} /> : null}
    </SnackbarProvider>
  );
}

export default Board;
