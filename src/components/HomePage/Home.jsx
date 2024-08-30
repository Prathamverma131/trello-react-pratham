import React from "react";
import Navbar from "./Navbar/Navbar";
import Workspace from "./Workspace/Workspace";
import { useState, useReducer } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import Credentials from "../../utilities/credentials/credentials.json";
import { cardReducer } from "../../utilities/useReducer/useReducer";

const Home = () => {
  let [cardState, cardDispatcher] = useReducer(cardReducer, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <Navbar cardData={cardState} setCardData={cardDispatcher} />
      <Workspace cardData={cardState} setCardData={cardDispatcher} />
    </SnackbarProvider>
  );
};

export default Home;
