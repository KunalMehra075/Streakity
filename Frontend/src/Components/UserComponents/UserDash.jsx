import React, { useEffect, useState } from "react";
import {
  AbsoluteCenter,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Th,
  Tr,
  Spinner,
} from "@chakra-ui/react";

import Pie from "../Extra/ProfileCircle";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import calculateCompletionPercentage from "../../utils/PercentageProfile";
import { useDispatch, useSelector } from "react-redux";

const UserDash = () => {
  const navigate = useNavigate();

  const MainUser = JSON.parse(localStorage.getItem("user_details_streakity"));
  const [Streaks, setStreaks] = useState([]);
  const [page, setpage] = useState(1);

  const getData = () => {
    let userID = MainUser._id;
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <>
      <Text
        mb="2"
        px={"10px"}
        fontWeight={"500"}
        fontSize={{ base: "1.3rem", md: "2rem" }}
      >
        Dashboard
      </Text>

      <Flex
        width={{ md: "99%" }}
        my={5}
        flexWrap={"wrap"}
        gap={2}
        direction={{ base: "column", md: "row" }}
      >
        {/**<!--*------- <Welcome Card> ----------->*/}
        <Card width={{ base: "100%", md: "50%" }} p={5} textAlign={"center"}>
          <Text fontSize={"23px"} fontWeight={"600"} my={"auto"}>
            Welcome To Company!
          </Text>
          <Text fontSize={"18px"} fontWeight={"400"} my={"auto"}>
            Your Dashboard 🧑🏼‍🏫 is your hub.
            <br /> View ongoing streakes and personalize your profile here.
            <br /> Stay organized and engaged in your learning journey.
          </Text>
        </Card>
        {/**<!--*------- <Total Streaks Card> ----------->*/}
        <Card width={{ base: "100%", md: "24%" }}>
          <CardBody
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex
              border={"5px solid lightgreen"}
              borderRadius={"50%"}
              p={1}
              justifyContent={"center"}
              alignItems={"center"}
              pos={"relative"}
            >
              <Flex
                border={"5px solid pink"}
                borderRadius={"50%"}
                width={40}
                justifyContent={"center"}
                alignItems={"center"}
                height={40}
              >
                <Heading mx={"auto"} size={"3xl"}>
                  {Streaks?.length || 1 || <Spinner></Spinner>}
                </Heading>
                <AbsoluteCenter
                  left={4}
                  top={"78%"}
                  background={"white"}
                  borderRadius={"50%"}
                >
                  <BsFillCheckCircleFill fontSize={"40px"} color="lightgreen" />
                </AbsoluteCenter>
              </Flex>
            </Flex>
          </CardBody>

          <Heading fontSize={"1.2rem"} mx={"auto"} my={5}>
            Total Streaks
          </Heading>
        </Card>
        {/**<!--*------- <Profile complete Card> ----------->*/}

        <Card
          p={5}
          gap={2}
          width={{ base: "100%", md: "24%" }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => navigate("/user/settings")}
        >
          <Pie
            percentage={calculateCompletionPercentage(MainUser)}
            colour="#2bb341"
          />
          <Text fontSize={"1.2rem"} fontWeight={"600"}>
            Your Profile Completeness
          </Text>
        </Card>
      </Flex>
      <Flex gap={2} direction={{ base: "column", md: "row" }}>
        <Card width={{ base: "100%", md: "100%" }} textAlign={"left"}>
          <Heading fontSize={"1.1rem"} mx={5} my={5}>
            Assigned Students
          </Heading>
          <TableContainer
            streakName="dashtable"
            position={"relative"}
            mx="5"
            mt="0"
            height={"600px"}
            overflowY={"scroll"}
            backgroundColor={"white"}
            border={"1px solid #ddd"}
            // borderRadius={"5px"}
          >
            <Table size={"sm"} variant="striped">
              <Thead
                backgroundColor={"white"}
                position={"sticky"}
                top="0"
                zIndex={"3"}
              >
                <Tr>
                  <Th sx={cellStyle}>Sr. no</Th>
                  <Th sx={cellStyle}>Whiz Code </Th>

                  <Th sx={cellStyle}>Student</Th>
                  <Th sx={cellStyle}>Subjects</Th>
                  <Th sx={cellStyle}>Start Date</Th>
                  <Th sx={cellStyle}>Timing</Th>
                  <Th sx={cellStyle}>HOURS</Th>

                  <Th sx={cellStyle}>Class Status</Th>

                  {/* <Th sx={headCellStyle}>Actions</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {Streaks?.length > 0 ? (
                  Streaks?.map((item, index) => {
                    let student = item?.studentID;
                    return (
                      <Tr key={item._id + "ab"}>
                        <Td sx={cellStyle}>{index + page * 10 - 9}</Td>

                        <Td sx={cellStyle}>
                          <>{item?.user_code}</>
                        </Td>

                        <Td style={{ ...cellStyle }}>
                          <b>
                            {student?.first_name + " " + student?.last_name}
                          </b>{" "}
                          <br />
                          <p style={{ fontSize: "13px" }}>
                            {student?.user_code}
                          </p>
                        </Td>
                        <Td sx={cellStyle}>{item?.streak_subject}</Td>
                        <Td sx={cellStyle}>
                          {item?.start_date.split("-").reverse().join("-")}
                        </Td>
                        <Td sx={cellStyle}>
                          <span>Start : {item?.start_timing}</span>
                          <br />
                          <span>End : {item?.end_timing}</span>
                        </Td>
                        <Td sx={cellStyle}>{item?.teaching_hours}</Td>

                        <Td sx={cellStyle}>
                          {item?.streak_status == "active" ? (
                            <Button
                              colorScheme="green"
                              size={"xs"}
                              variant={"ghost"}
                              border={"1px solid green"}
                              color={"green"}
                              bg={"green.100"}
                            >
                              ACTIVE
                            </Button>
                          ) : (
                            <Button
                              colorScheme="orange"
                              size={"xs"}
                              variant={"ghost"}
                              color={"red"}
                              border={"1px solid red"}
                            >
                              CLOSED
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td colSpan={8} sx={cellStyle}>
                      No Recent Streaks
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>

        {/* <Card p={5} gap={2} width={{ base: "100%", md: "25%" }}>
          <PieChart style={{ maxWidth: "300px" }} data={Piedata} />
        </Card>
        <Card p={5} width={{ base: "100%", md: "46%" }}>
          <BarChart options={Baroptions} data={Bardata} />
        </Card> */}
      </Flex>
    </>
  );
};

export default UserDash;

const cellStyle = {
  // border: "1px solid aqua !important",
  padding: "8px 4px",
  textAlign: "center",
};
const headCellStyle = {
  border: "1px solid #ddd",
  padding: "4px",
  textAlign: "center",
  color: "black",
};

const Baroptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart Showing Total Streaks in Previous Days",
    },
  },
};
const teachers = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Bardata = {
  labels: teachers,
  datasets: [
    {
      label: "Total Streaks",
      data: generateRandomData(teachers.length),
      backgroundColor: ["red", "lightgreen"],
    },
  ],
};
const Piedata = {
  labels: [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Physics",
  ],
  datasets: [
    {
      label: "# of Students Joined",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#FF6384", // Red
        "#36A2EB", // Blue
        "#FFCE56", // Yellow
        "#4CAF50", // Green
        "#9C27B0", // #961595
        "#FF9800", // Orange
      ],

      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

function generateRandomData(length) {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * 12) + 1);
  }
  return data;
}
