import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { PieChart } from "../Extra/PieChart";
import IndianNumberSystem from "../../utils/IndianNumberSystem";

import axios from "axios";
import { BASE_URL } from "../../utils/config";

const AdminDash = () => {
  // const [DashDetails, setDashDetails] = useState({});

  // let AllStates = DashDetails?.AllStates;
  // let StatesObj = DashDetails?.PieObject;
  // let AllStValues = [];
  // for (let i in StatesObj) {
  //   AllStValues.push(StatesObj[i]);
  // }

  // const carddata1 = [
  //   { head: "Total Revenue", num: DashDetails?.TotalRevenue },
  //   { head: "Total Students", num: DashDetails?.TotalStudents },
  //   { head: "Total Users", num: DashDetails?.TotalUsers },
  //   { head: "Total Streaks", num: DashDetails?.TotalStreaks },
  // ];
  // const carddata2 = [
  //   { head: "Active Users", num: DashDetails?.ActiveUsers },
  //   { head: "Active Streaks", num: DashDetails?.ActiveStreaks },
  //   { head: "Active Students", num: DashDetails?.ActiveStudents },
  //   { head: "Active Users", num: DashDetails?.ActiveUsers },
  // ];

  // const Piedata = {
  //   labels: AllStates || [""],
  //   datasets: [
  //     {
  //       label: "# of People Joined",
  //       data: AllStValues || [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         "#FF6384", // Red
  //         "#36A2EB", // Blue
  //         "#FFCE56", // Yellow
  //         "#4CAF50", // Green
  //         "#9C27B0", // #961595
  //         "#FF9800", // Orange
  //       ],

  //       borderColor: "white",
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  // const getData = () => {
  //   axios
  //     .get(`${BASE_URL}/api/test/get-dashboard-details`)
  //     .then((res) => setDashDetails(res?.data));
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

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

      {/* <Flex width="99%" my={3} flexWrap={"wrap"} gap={2}>
        {carddata1.map((item) => {
          return <AdminCards key={item.head} head={item.head} num={item.num} />;
        })}
      </Flex> */}

      {/* <Flex gap={2} direction={{ base: "column", md: "row" }}>
        <Grid templateColumns={"repeat(2,1fr)"} width={"70%"}>
          {carddata2.map((item) => {
            return (
              <AdminCards2 key={item.head} head={item.head} num={item.num} />
            );
          })}
        </Grid> */}
      {/**<!--*------- <Pie Chart> ----------->*/}
      {/* <Card
          p={5}
          my={1}
          gap={2}
          width={{ base: "100%", md: "25%" }}
          borderRadius={"15px"}
        >
          <PieChart style={{ maxWidth: "300px" }} data={Piedata} />
          <Text textAlign={"center"} fontWeight={"500"}>
            Pie Chart showing data of Users of company, all around India <br />
            (State-wise)
          </Text>
        </Card> */}
      {/* </Flex> */}
    </>
  );
};

export default AdminDash;

const AdminCards = ({ head, num }) => {
  return (
    <Card width={{ base: "100%", md: "24%" }} borderRadius={"15px"}>
      <Heading fontSize={{ base: "1.3rem", md: "1.2rem" }} mx={"auto"} my={5}>
        {head}
      </Heading>
      <CardBody
        display={"flex"}
        justifyContent={"end"}
        alignItems={"end"}
        my={1}
        py={2}
      >
        <Heading fontSize={PurpleFontSize} color={"purple.600"} m={"auto"}>
          {IndianNumberSystem(+num) || <Spinner />}
        </Heading>
      </CardBody>
    </Card>
  );
};
const AdminCards2 = ({ head, num }) => {
  return (
    <Card width={{ base: "100%", md: "98%" }} my={1} borderRadius={"15px"}>
      <Heading fontSize={{ base: "1.3rem", md: "1.2rem" }} mx={"auto"} my={8}>
        {head}
      </Heading>
      <CardBody
        display={"flex"}
        justifyContent={"end"}
        alignItems={"end"}
        my={1}
        py={2}
      >
        <Heading fontSize={PurpleFontSize} color={"purple.600"} m={"auto"}>
          {IndianNumberSystem(+num) || <Spinner />}
        </Heading>
      </CardBody>
    </Card>
  );
};
const PurpleFontSize = "2.4rem";
