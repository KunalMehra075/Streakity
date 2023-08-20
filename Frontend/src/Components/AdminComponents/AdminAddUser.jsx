import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  FormLabel,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  Text,
  FormControl,
  FormErrorMessage,
  Divider,
  useToast,
  Box,
  Flex,
} from "@chakra-ui/react";
import { postUser } from "../../Redux/App/Action/User.action";
import { FiPlusCircle } from "react-icons/fi";
import { BASE_URL } from "../../utils/config";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
import getFormattedDate from "../../utils/CurrentDate";

const initial = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  alternate_phone_number: "",
  start_date: getFormattedDate(),
  gender: "",
  role: "User",
  address: {
    address1: "",
    address2: "",
    state: "",

    city: "",
    pincode: "",
  },
  profile_photo: "",
  aadhar_number: "",
};

const AdminAddUser = () => {
  const [formData, setFormData] = useState(initial);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const [isUploaded, setIsUploaded] = useState(false);
  const [filename, setfilename] = useState("Upload Profile Img/PNG");
  const [loading, setloading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };
  const HandleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${BASE_URL}/api/test/upload-to-s3`, formData)
      .then((res) => {
        const filelocation = res?.data?.fileUrl;
        console.log(res.data.msg, "URL :", filelocation);
        setIsUploaded(true);
        setfilename(file.name);
        setloading(false);
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile_photo: filelocation + "",
        }));

        toast({
          position: "top",
          title: "Profile Photo Uploaded Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsUploaded(false);
        toast({
          title: "Something Went wrong",
          status: "error",
          duration: 4000,
          position: "top",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(postUser(formData, navigate, toast));
  };
  console.log(formData);
  return (
    <Container
      as="form"
      maxW="container"
      borderRadius="5px"
      mb="10"
      padding={"30px"}
      backgroundColor={"white"}
      onSubmit={handleSubmit}
    >
      <Text
        p={"5px"}
        fontWeight={"500"}
        fontSize={{ base: "1.3rem", md: "2rem" }}
      >
        Add details of user:
      </Text>

      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem
          as="div"
          colSpan={{ base: 12, md: 12 }}
          p="25px 10px 10px 10px"
        >
          <Box position="relative">
            <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
              Personal Details
            </Text>
            <Divider border={"1px solid red"} opacity={"0.2"} />
          </Box>
        </GridItem>
        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="Enter First Name"
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleInputChange}
            isRequired={true}
          />
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Enter Last Name"
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleInputChange}
            isRequired={true}
          />
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleInputChange}
            isRequired={true}
          />
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormControl isInvalid={formData?.phone_number?.length !== 10}>
            <FormLabel>Phone number</FormLabel>
            <Input
              placeholder="Enter Phone Number"
              type="number"
              name="phone_number"
              value={formData?.phone_number || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
            {formData?.phone_number?.length !== 10 && (
              <FormErrorMessage>Enter 10 digit phone number</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormControl
            isInvalid={formData?.alternate_phone_number?.length !== 10}
          >
            <FormLabel>Alternate Phone number</FormLabel>
            <Input
              placeholder="Enter Alternate Phone Number"
              type="number"
              name="alternate_phone_number"
              value={formData?.alternate_phone_number || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
            {formData?.alternate_phone_number?.length !== 10 && (
              <FormErrorMessage>Enter 10 digit phone number</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Select gender"
            name="gender"
            value={formData.gender || ""}
            isRequired={true}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </Select>
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px"></GridItem>

        <GridItem
          as="div"
          colSpan={{ base: 12, md: 12 }}
          p="25px 10px 10px 10px"
        >
          <Box position="relative">
            <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
              Address Details
            </Text>
            <Divider border={"1px solid red"} opacity={"0.2"} />
          </Box>
        </GridItem>
        <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
          <FormLabel>H.no / Flat / Floor / Building</FormLabel>
          <Input
            placeholder="Enter Address Line 1"
            type="text"
            name="address1"
            isRequired={true}
            value={formData?.address?.address1 || ""}
            onChange={handleAddressInputChange}
          />
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="10px">
          <FormLabel>Address Line 2</FormLabel>
          <Input
            placeholder="Enter Address Line 2"
            type="text"
            isRequired={true}
            name="address2"
            value={formData?.address?.address2 || ""}
            onChange={handleAddressInputChange}
          />
        </GridItem>

        <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
          <FormLabel>District</FormLabel>
          <Input
            placeholder="Enter District"
            type="text"
            name="district"
            value={formData?.address?.district || ""}
            onChange={handleAddressInputChange}
          />
        </GridItem>
        <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
          <FormLabel>City</FormLabel>
          <Input
            placeholder="Enter City"
            type="text"
            name="city"
            isRequired={true}
            value={formData?.address?.city || ""}
            onChange={handleAddressInputChange}
          />
        </GridItem>
        <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
          <FormLabel>State</FormLabel>
          <Input
            placeholder="Enter State"
            type="text"
            name="state"
            value={formData?.address?.state || ""}
            isRequired={true}
            onChange={handleAddressInputChange}
          />
        </GridItem>

        <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="10px">
          <FormLabel>Pincode</FormLabel>
          <Input
            placeholder="Enter Pincode"
            type="number"
            name="pincode"
            value={formData?.address?.pincode || ""}
            isRequired={true}
            onChange={handleAddressInputChange}
          />
        </GridItem>
        <GridItem
          as="div"
          colSpan={{ base: 12, md: 12 }}
          p="25px 10px 10px 10px"
        >
          <Box position="relative">
            <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
              Other Details
            </Text>
            <Divider border={"1px solid red"} opacity={"0.2"} />
          </Box>
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormControl
            my="2"
            border={"1px solid #ddd"}
            p={2}
            borderRadius={"10px"}
            textAlign={"center"}
          >
            <FormLabel mx={3}>Upload CV</FormLabel>

            <input
              type="file"
              accept=".pdf"
              name="download_link"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={HandleFileUpload}
            />
            <Button
              colorScheme={isUploaded ? "green" : "blue"}
              isLoading={loading}
              loadingText="Uploading"
              spinnerPlacement="start"
              leftIcon={isUploaded ? <CheckIcon /> : <AddIcon />}
              onClick={() => {
                setloading(true);
                fileInputRef.current.click();
              }}
            >
              {filename}
            </Button>
          </FormControl>
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormControl isInvalid={formData?.aadhar_number?.length !== 12}>
            <FormLabel>Aadhar number</FormLabel>
            <Input
              placeholder="Enter Aadhar Number"
              type="number"
              isRequired={true}
              name="aadhar_number"
              value={formData?.aadhar_number || ""}
              onChange={handleInputChange}
            />
            {formData?.aadhar_number?.length !== 12 && (
              <FormErrorMessage>Enter 12 digit Aadhar number</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>

        <GridItem as="div" colSpan={{ base: 12, md: 4 }} p="10px">
          <FormControl isInvalid={formData?.password?.length !== 8}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter Password"
              type="password"
              name="password"
              value={formData?.password || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
            {formData?.password?.length !== 8 && (
              <FormErrorMessage>Enter 8 digit password</FormErrorMessage>
            )}
          </FormControl>
        </GridItem>
        <GridItem
          as="div"
          colSpan={{ base: 12, md: 12 }}
          p="10px"
          display={"flex"}
          justifyContent={"end"}
          alignItems={"end"}
        >
          <Flex
            gap={3}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            <Button
              colorScheme="blue"
              my="10px"
              type="submit"
              leftIcon={<FiPlusCircle />}
            >
              Add User
            </Button>
            <Link to="/admin/user">
              <Button colorScheme="blue" my="10px">
                Cancel
              </Button>
            </Link>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default AdminAddUser;
