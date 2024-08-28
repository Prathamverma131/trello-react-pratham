import React from "react";
import Navbar from "./Navbar/Navbar";
import Workspace from "./Workspace/Workspace";
import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

const Home = () => {
  let [cardData, setCardData] = useState([]);
  return (
    <SnackbarProvider maxSnack={3}>
      <Navbar cardData={cardData} setCardData={setCardData} />
      <Workspace cardData={cardData} setCardData={setCardData} />
    </SnackbarProvider>
  );
};

export default Home;
