import axios from "axios";
import React, { useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const navigate = useNavigate();
  const value = useContext(DataContext);
  const trendData = value.trendData;
  const setTrendData = value.setTrendData;

  useEffect(() => {
    getTrendData();
  }, []);

  const getTrendData = async () => {
    const trendingData = await axios.get(
      `https://api.coingecko.com/api/v3/search/trending`
    );
    setTrendData(trendingData?.data?.coins);
    console.log(trendData);
  };
  return (
    <div style={{padding: "0px 20px 20px"}}>
      <TableContainer
        style={{
          border: "1px solid #808080",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>Logo</Th>
              <Th>Name</Th>
              <Th>Market Cap Rank</Th>
              <Th>Price</Th>
              <Th>Price Btc</Th>
              <Th>Market Cap</Th>
              <Th>Total Volume</Th>
              <Th>Total Volume Btc</Th>
              <Th>24H</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trendData?.map((element) => {
              return (
                <Tr>
                  <Td onClick={() => navigate(`/${element.item.id}`)} style={{cursor: "pointer"}}>
                    <img src={element.item.small} style={{height:40,width:40}}/>
                    <p>{element.item.symbol}</p>
                  </Td>
                  <Td>{element.item.name}</Td>
                  <Td>{element.item.market_cap_rank}</Td>
                  <Td>{"$" + element.item.data.price.toFixed(4)}</Td>
                  <Td>{element.item.price_btc.toFixed(9)}</Td>
                  <Td>{element.item.data.market_cap}</Td>
                  <Td>{element.item.data.total_volume}</Td>
                  <Td>{element.item.data.total_volume_btc.slice(0,6)}</Td>
                  <Td 
                    style={{color: element.item.data.price_change_percentage_24h.usd > 0 ? "#018749" : "red" , fontWeight: 600}}
                  >{element.item.data.price_change_percentage_24h.usd.toFixed(4)}</Td>

                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Trending;
