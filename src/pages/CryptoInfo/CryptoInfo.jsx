import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import "./cryptoinfo.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoInfo = () => {
  const toast = useToast();
  const { id } = useParams();
  const [chartData, setChartData] = useState(null);
  const [coinData , setCoinData] = useState();
  const apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=4`
        );
        const prices = response?.data.prices;
        const timestamps = prices?.map((price) =>
          new Date(price[0]).toLocaleDateString()
        );
        const values = prices?.map((price) => price[1]);
        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: id,
              data: values,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      } catch (error) {
        toast({
          title: "Error!",
          description: error,
          status: "failure",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    const apiData = async()=>{
      const apiData = await axios.get(apiLink);
      setCoinData(apiData?.data[0]);
    }
    apiData();
    fetchChartData();
  }, []);

  return chartData ? <div style={{display: "flex" , alignItems: "center" , gap: 30 , color:"#4A5568" , background: "linear-gradient(109.6deg, rgb(177, 173, 219) 11.2%, rgb(245, 226, 226) 91.1%)" , backgroundColor: "#cdc1ff",backgroundImage: "linear-gradient(316deg, #cdc1ff 0%, #e5d9f2 74%)" , height: "100dvh"}}>
    <div style={{width: "calc(100dvw - 800px)" , display: "flex" , flexDirection: "column" , alignItems: "center" , height: "100%" , justifyContent: "center"}}>
        <img src={coinData?.image} height={150} width={150} alt="Coin Image"/>
        <span className="info">{coinData?.name}</span>
        <span className="info">Symbol: {coinData?.symbol}</span>
        <span className="info">Current Price: ${coinData?.current_price}</span>
        <span className="info">Market Cap: ${coinData?.market_cap}</span>
        <span className="info">Total Volume: {coinData?.total_volume}</span>
    </div>
    {/* <div
      style={{ width: "1200px", height: "600px", padding: 20 }}
    > */}
      <div style={{width: "70%"}}>{chartData ? <Line data={chartData} /> : <></>}</div>
    {/* </div> */}
  </div> : <Loader/>;
};

export default CryptoInfo;
