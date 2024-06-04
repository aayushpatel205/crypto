import React, { useEffect, useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
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
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import Loader from "../components/Loader/Loader";

const Crypto = () => {
  const navigate = useNavigate();
  const array1 = [
    "market_cap_asc",
    "market_cap_desc",
    "volume_asc",
    "volume_desc",
    "id_asc",
    "id_desc",
  ];
  const value = useContext(DataContext);
  const currency = value?.currency;
  const setPageNo = value?.setPageNo;
  const cryptoData = value?.cryptoData;
  const setCryptoData = value?.setCryptoData;
  const setSavedData = value?.setSavedData;
  const savedData = value?.savedData;
  const setSortParam = value?.setSortParam;
  const setCurrency = value?.setCurrency;
  const [search, setSearch] = useState("");

  useEffect(() => {
    filterFunc();
  }, [search]);

  const filterFunc = () => {
    setCryptoData({
      ...cryptoData,
      new: cryptoData?.old?.filter((element) => {
        return element.id.includes(search);
      }),
    });
  };

  return (
    <div
      style={{
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          height: 50,
          width: "80%",
          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <Input
            focusBorderColor="purple.200"
            style={{
              height: 32,
              width: 250,
              borderRadius: 5,
            }}
            placeholder="Search"
            fontSize={14}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>

        <div style={{ display: "flex", gap: 5 }}>
          <label>Currency:</label>
          <Menu>
            <MenuButton
              as={Button}
              style={{ height: 25 }}
              rightIcon={<BiChevronDown />}
            >
              Currency
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setCurrency("inr");
                }}
              >
                INR
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrency("usd");
                }}
              >
                USD
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <div style={{ display: "flex", gap: 5 }}>
          <label>Sort By: </label>
          <Menu>
            <MenuButton
              as={Button}
              style={{ height: 25 }}
              rightIcon={<BiChevronDown />}
            >
              Sort
            </MenuButton>
            <MenuList>
              {array1.map((element, index) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setSortParam(array1[index]);
                    }}
                  >
                    {element}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </div>
      </div>
      <TableContainer
        style={{ border: "1px solid #808080", borderRadius: 10, marginTop: 20 }}
      >
        <Table
          variant="striped"
          colorScheme="purple"
          style={{ color: "#4A5568" }}
        >
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
          <Tbody>
            {cryptoData?.new?.map((element) => {
              return (
                <Tr>
                  <Td>
                    <FaStar
                      style={{cursor: "pointer"}}
                      fill={savedData.includes(element) ? "yellow" : "grey"}
                      size={25}
                      onClick={() => {
                        if (!savedData.includes(element)) {
                          setSavedData([...savedData, element]);
                        }
                      }}
                    />
                  </Td>
                  <Td
                    onClick={() => navigate(`/${element.id}`)}
                    style={{ cursor: "pointer" }}
                  >
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
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        defaultCurrent={1}
        total={100}
        onChange={(page) => {
          setPageNo(page);
        }}
        style={{ alignSelf: "flex-end", margin: 10 }}
      />
    </div>
  );
};

export default Crypto;
