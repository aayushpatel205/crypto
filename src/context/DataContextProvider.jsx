import React, { useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";

function DataContextProvider({ children }) {
  const [cryptoData, setCryptoData] = useState({});
  const [sortParam, setSortParam] = useState("market_cap_desc");
  const [currency, setCurrency] = useState("usd");
  const [pageNo, setPageNo] = useState(1);
  const [savedData , setSavedData] = useState([]);
  const [trendData , setTrendData] = useState();

  useEffect(()=>{
    dataFunc();
  }, [currency, sortParam, pageNo]);

  const dataFunc = async () => {
    const data1 = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortParam}&per_page=10&page=${pageNo}&price_change_percentage=1h%2C24h%2C7d`
    );
    setCryptoData({old : data1.data , new : data1.data});
  };
  return (
    <DataContext.Provider
      value={{
        cryptoData,
        setCryptoData,
        sortParam,
        setSortParam,
        setCurrency,
        currency,
        setPageNo,
        savedData,
        setSavedData,
        trendData,
        setTrendData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
