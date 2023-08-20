import React, { useState, useEffect } from "react";
import { Button, Flex, Input, Box } from "@chakra-ui/react";

import axios from "axios";
import { BASE_URL } from "../../utils/config";

const SearchBarComponent = ({ setMarkuser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [FilterEntity, setFilteredEntity] = useState([]);

  // url, setparticular data,
  useEffect(() => {
    let data = { first_name: { $regex: searchQuery, $options: "i" } };
    const GetFilterEntity = () => {
      axios
        .post(`${BASE_URL}/api/user/search-user`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setFilteredEntity(res?.data?.Users))
        .catch((err) => console.log(err));
    };
    const Timer = setTimeout(() => {
      if (searchQuery !== "") {
        GetFilterEntity();
      }
    }, 300);
    return () => {
      setFilteredEntity([]);
      clearTimeout(Timer);
    };
  }, [searchQuery]);

  const HandleSelectuser = (user) => {
    setFilteredEntity([]);
    setSearchBar(
      `${user.first_name} ${user.last_name} - whizcode: ${user.whiz_code}`
    );
    setMarkuser(user);
  };

  const liststyles = {
    padding: "6px 12px",
    border: "0.1px dotted gray",
    borderRadius: "2px",
  };
  const UlStyles = {
    position: "absolute",
    background: "white",
    zIndex: "5",
    width: "100%",
    listStyle: "none",
    maxHeight: "260px",
    overflowY: "scroll",
    overflowX: "hidden",
  };

  const closedropdown = (e) => {
    if (!e.target.matches("[data-dropdown]")) {
      setFilteredEntity([]);
    }
  };
  return (
    <Flex width={"100%"} onClick={closedropdown} bg="white">
      <Box width={"100%"} style={{ position: "relative" }}>
        <Input
          type="text"
          value={searchBar}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSearchBar(e.target.value);
          }}
          placeholder="Search for a user..."
        />

        {FilterEntity?.length > 0 && (
          <ul style={UlStyles} data-dropdown>
            {FilterEntity?.map((user, index) => (
              <li
                onClick={() => HandleSelectuser(user)}
                style={liststyles}
                key={index}
              >
                <Box display={"inline-block"} style={{ width: "280px" }}>
                  {user.first_name} {user.last_name}
                </Box>
                <Box display={"inline-block"} style={{ width: "150px" }}>
                  - {user.whiz_code}
                </Box>
                <Box display={"inline-block"} style={{ width: "300px" }}>
                  - {user.email}
                </Box>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Flex>
  );
};

export default SearchBarComponent;
