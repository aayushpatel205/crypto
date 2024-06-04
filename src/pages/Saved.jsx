import React, { useEffect } from "react";
import { useContext } from "react";
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

const Saved = () => {
  const navigate = useNavigate();
  const value = useContext(DataContext);
  const currency = value?.currency;
  const savedData = value?.savedData;
  const setSavedData = value?.setSavedData;

  const delFunc = (delId) => {
    setSavedData(
      savedData.filter((element) => {
        return element.id !== delId;
      })
    );
  };

  return (
    <div
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: "relative",
      }}
    >
      <TableContainer
        style={{
          border: "1px solid #808080",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Table variant="striped" colorScheme="purple" style={{color:"#4A5568"}}>
          <Thead>
            <Tr>
              <Th>Save</Th>
              <Th>Logo</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Total Volume</Th>
              <Th>Market Cap</Th>
              <Th>1H</Th>
              <Th>24H</Th>
              <Th>7D</Th>
            </Tr>
          </Thead>
          <Tbody style={{ position: "relative" }}>
            {savedData.length === 0 ? (
              <></>
            ) : (
              savedData.map((element) => {
                console.log(savedData.length);
                return (
                  <Tr >
                    <Td>
                      <FaStar
                        size={25}
                        fill="yellow"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                          delFunc(element.id);
                        }}
                      />
                    </Td>
                    <Td onClick={() => navigate(`/${element.id}`)} style={{cursor: "pointer"}}>
                      <img
                        src={element.image}
                        style={{ height: 35, width: 35 }}
                      />
                      {element.symbol.charAt(0).toUpperCase() +
                        element.symbol.slice(1)}
                    </Td>
                    <Td>
                      {element.id.charAt(0).toUpperCase() + element.id.slice(1)}
                    </Td>
                    <Td>
                      {typeof element.current_price == "number"
                        ? currency.toUpperCase() + " " + element.current_price
                        : `${element.current_price}`}
                    </Td>
                    <Td>
                      {typeof element.total_volume == "number"
                        ? element.total_volume
                        : `${element.total_volume}`}
                    </Td>
                    <Td>
                      {typeof element.market_cap == "number"
                        ? currency.toUpperCase() + " " + element.market_cap
                        : `${element.market_cap}`}
                    </Td>
                    <Td
                      style={{
                        color:
                          element.price_change_percentage_1h_in_currency > 0
                            ? "#018749"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {typeof element.price_change_percentage_1h_in_currency ==
                      "number"
                        ? element.price_change_percentage_1h_in_currency.toFixed(
                            4
                          )
                        : `${element.price_change_percentage_1h_in_currency}`}
                    </Td>
                    <Td
                      style={{
                        color:
                          element.price_change_percentage_24h_in_currency > 0
                            ? "#018749"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {typeof element.price_change_percentage_24h == "number"
                        ? element.price_change_percentage_24h.toFixed(4)
                        : `${element.price_change_percentage_24h}`}
                    </Td>
                    <Td
                      style={{
                        color:
                          element.price_change_percentage_7d_in_currency > 0
                            ? "#018749"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {typeof element.price_change_percentage_7d_in_currency ==
                      "number"
                        ? element.price_change_percentage_7d_in_currency.toFixed(
                            4
                          )
                        : `${element.price_change_percentage_7d_in_currency}`}
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Saved;
