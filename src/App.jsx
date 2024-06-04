import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Crypto from "./pages/Crypto";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import CryptoInfo from "./pages/CryptoInfo/CryptoInfo";

const App = () => {
  const value = useContext(DataContext);
  

  return (
    <div style={{ width: "100%" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Crypto />} />
          <Route path="trending" element={<Trending />} />
          <Route path="saved" element={<Saved />} />
        </Route>
        <Route path="/:id" element={<CryptoInfo />} />
      </Routes>
    </div>
  );
};

export default App;
