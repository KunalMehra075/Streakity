import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";

import axios from "axios";
import { BASE_URL } from "../../utils/config";

const ReusableSelectBar = ({
  searchUrl,
  datatype,
  Options,
  Entities,
  setData,
  Values,
  getData,
  setFiltering,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let data = { [datatype]: searchQuery };
    const GetFilterEntity = () => {
      axios
        .post(`${BASE_URL}/api/${searchUrl}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setData(res?.data[Entities]))
        .catch((err) => console.log(err));
    };
    const Timer = setTimeout(() => {
      if (searchQuery !== "") {
        GetFilterEntity();
      }
    }, 300);
    return () => {
      clearTimeout(Timer);
    };
  }, [searchQuery]);

  return (
    <Select
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setFiltering(true);
      }}
      width={"600px"}
    >
      {Options.map((item, index) => {
        return (
          <option key={item + "342dgfds"} value={Values[index]}>
            {item}
          </option>
        );
      })}
    </Select>
  );
};

export default ReusableSelectBar;
