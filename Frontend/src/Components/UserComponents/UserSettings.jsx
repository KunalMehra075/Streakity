import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/Icons/avatar.png";
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
  Box,
  Flex,
  useToast,
  Image,
} from "@chakra-ui/react";

import { FiCheckCircle, FiEdit3, FiX } from "react-icons/fi";

import { AddIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { IndianQualifications, IndianSubjects } from "../../utils/IndianData";
import { UpdateUserProfile } from "../../Redux/App/Action/User.action";

const UserSettings = () => {
  const [ProfileDetails, setProfileDetails] = useState({});
  const user = JSON.parse(localStorage.getItem("user_detail_userapp"));
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const ProfileInputRef = useRef(null);
  const ResumeInputRef = useRef(null);

  const [EDITING, setEDITING] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploaded1, setIsUploaded1] = useState(false);
  const [filename, setfilename] = useState("Change Profile");
  const [filename1, setfilename1] = useState("Update Resume");
  const [loading1, setloading1] = useState(false);
  const [loading, setloading] = useState(false);
  const [Subjects, setSubjects] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProfileDetails((prevProfileDetails) => ({
      ...prevProfileDetails,
      [name]: value,
    }));
  };
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setProfileDetails((prevProfileDetails) => ({
      ...prevProfileDetails,
      address: {
        ...prevProfileDetails.address,
        [name]: value,
      },
    }));
  };
  const HandleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${BASE_URL}/api/test/upload-to-s3`, formData)
      .then((res) => {
        const filelocation = res?.data?.fileUrl;
        console.log(res.data.msg, "URL :", filelocation);
        if (e.target.name == "profile_photo") {
          setIsUploaded(true);
          setfilename(file.name);
          setloading(false);
          setProfileDetails((prevProfileDetails) => ({
            ...prevProfileDetails,
            profile_photo: filelocation + "",
          }));
        } else {
          setIsUploaded1(true);
          setfilename1(file.name);
          setloading1(false);
          setProfileDetails((prevProfileDetails) => ({
            ...prevProfileDetails,
            resume_link: filelocation + "",
          }));
        }

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
  const HandleAddsub = () => {
    let sub = document.getElementById("selectsubs")?.value;
    if (Subjects.includes(sub) || !sub) {
      return toast({
        position: "top",
        title: !sub ? "Please select a subject" : "Subject Already Added",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    }
    let newsubarr = [...Subjects, sub];
    setSubjects(newsubarr);

    toast({
      position: "top",
      title: "Added to List",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const HandleSaveProfileDetails = async (e) => {
    e.preventDefault();
    ProfileDetails.subjects = Subjects;
    ProfileDetails.editingProfile = true;
    ProfileDetails.primary_subject = Subjects[0];

    dispatch(UpdateUserProfile(user?._id, ProfileDetails, toast, navigate));
  };
  useEffect(() => {
    setProfileDetails(user);
    setSubjects(user?.subjects);
  }, []);
  return (
    <>
      <Container
        maxW="container"
        borderRadius="5px"
        mb="10"
        minH={"610px"}
        padding={"20px"}
        backgroundColor={"white"}
        as="form"
        onSubmit={HandleSaveProfileDetails}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text
            mb="2"
            px={{ md: "10px" }}
            fontWeight={"500"}
            fontSize={{ base: "1.3rem", md: "2rem" }}
          >
            Profile & Settings
          </Text>
          <Flex gap={2}>
            {!EDITING && (
              <Button
                bg="purple.500"
                colorScheme="purple"
                my={{ md: "10px" }}
                px={{ base: 3, md: 10 }}
                onClick={() => setEDITING(true)}
                leftIcon={<FiEdit3 />}
              >
                Edit Profile
              </Button>
            )}
          </Flex>
        </Flex>

        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="25px 10px 10px 10px"
          >
            <Box position="relative">
              <Text fontSize="1.3rem" fontWeight={"600"} bg="white">
                Edit Personal Details
              </Text>
              <Divider border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormLabel>First Name</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter First Name"
              type="text"
              name="first_name"
              value={ProfileDetails.first_name || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormLabel>Last Name</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Last Name"
              type="text"
              name="last_name"
              value={ProfileDetails.last_name || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormLabel>Email</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Email"
              type="email"
              name="email"
              value={ProfileDetails?.email || ""}
              onChange={handleInputChange}
              isRequired={true}
            />
          </GridItem>
          <GridItem
            as="div"
            colSpan={{ base: 12, md: 3 }}
            p="8px"
            mx={5}
            borderRadius={"10px"}
            rowSpan={3}
            border={"1px solid #ddd"}
          >
            <FormControl my="2" p={2} textAlign={"center"}>
              <input
                disabled={EDITING ? false : true}
                type="file"
                accept="image/*"
                name="profile_photo"
                ref={ProfileInputRef}
                style={{ display: "none" }}
                onChange={HandleFileUpload}
              />
              <Image
                m={" 15px auto"}
                borderRadius={"50%"}
                src={ProfileDetails?.profile_photo || avatar}
                w={"180px"}
                h={"180px"}
                objectPosition={"center"}
                objectFit={"cover"}
              />
              <Button
                colorScheme={isUploaded ? "green" : "blue"}
                bg={isUploaded ? "green.500" : "purple.500"}
                isLoading={loading}
                size={"sm"}
                loadingText="Uploading"
                spinnerPlacement="start"
                leftIcon={isUploaded ? <CheckIcon /> : <EditIcon />}
                onClick={() => {
                  setloading(true);
                  ProfileInputRef.current.click();
                }}
                isDisabled={EDITING ? false : true}
              >
                {filename}
              </Button>
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormLabel>Gender</FormLabel>
            <Select
              isDisabled={EDITING ? false : true}
              placeholder="Select gender"
              name="gender"
              value={ProfileDetails.gender || ""}
              isRequired={true}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </Select>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormLabel>LinkedIn Profile</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Paste LinkedIn Profile Link"
              type="text"
              name="linkedin"
              value={ProfileDetails.linkedin || ""}
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormLabel>Other Social</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Other Social Link"
              type="text"
              name="other_social"
              value={ProfileDetails.other_social || ""}
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 3 }} p="8px">
            <FormControl
              isInvalid={ProfileDetails?.phone_number?.length !== 10}
            >
              <FormLabel>Phone number</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                placeholder="Enter Phone Number"
                type="number"
                name="phone_number"
                value={ProfileDetails?.phone_number || ""}
                onChange={handleInputChange}
                isRequired={true}
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 2 }} p="8px">
            <FormControl>
              <FormLabel>Date Of Birth</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                type="date"
                name="DOB"
                value={ProfileDetails?.DOB || "2000-02-02"}
                onChange={handleInputChange}
                isRequired={true}
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 2 }} p="8px">
            <FormControl>
              <FormLabel>Years Of Experience</FormLabel>
              <Input
                isDisabled={EDITING ? false : true}
                type="number"
                name="years_of_experience"
                value={ProfileDetails?.years_of_experience || "2"}
                onChange={handleInputChange}
                isRequired={true}
              />
            </FormControl>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 2 }} p="8px">
            <FormControl>
              <FormLabel>Mode Of Work</FormLabel>
              <Select
                isDisabled={EDITING ? false : true}
                w={{ base: "100%", md: "100%" }}
                name="mode_of_work"
                value={ProfileDetails?.mode_of_work || ""}
                onChange={handleInputChange}
                isRequired={true}
              >
                <option value={""}>Mode of Work </option>
                <option value={"online"}>Online</option>
                <option value={"offline"}>Offline</option>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="25px 10px 10px 10px"
          >
            <Box position="relative">
              <Text fontSize={"1.3rem"} fontWeight={"600"} bg="white">
                Edit Address Details
              </Text>
              <Divider border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="8px">
            <FormLabel>H.no / Flat / Floor / Building</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Address Line 1"
              type="text"
              name="address1"
              isRequired={true}
              value={ProfileDetails?.address?.address1 || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="8px">
            <FormLabel>Address Line 2</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Address Line 2"
              type="text"
              name="address2"
              value={ProfileDetails?.address?.address2 || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>District</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter District"
              type="text"
              name="district"
              value={ProfileDetails?.address?.district || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>City</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter City"
              type="text"
              name="city"
              isRequired={true}
              value={ProfileDetails?.address?.city || ""}
              onChange={handleAddressInputChange}
            />
          </GridItem>
          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>State</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter State"
              type="text"
              name="state"
              value={ProfileDetails?.address?.state || ""}
              isRequired={true}
              onChange={handleAddressInputChange}
            />
          </GridItem>

          <GridItem as="div" colSpan={{ base: 6, md: 3 }} p="8px">
            <FormLabel>Pincode</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              placeholder="Enter Pincode"
              type="number"
              name="pincode"
              value={ProfileDetails?.address?.pincode || ""}
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
                Edit Professional Details
              </Text>
              <Divider border={"1px solid red"} opacity={"0.2"} />
            </Box>
          </GridItem>

          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="8px">
            {Subjects?.length > 0 && (
              <Flex
                w={"100%"}
                wrap={"wrap"}
                gap={3}
                bg={"#f2ffe6"}
                p="2"
                my={1}
                borderRadius={"5px"}
                border={"1px solid #ddd"}
              >
                {Subjects?.map((item, index) => {
                  return (
                    <Button
                      isDisabled={EDITING ? false : true}
                      key={item + 234}
                      variant={"ghost"}
                      border={"1px solid #ddd"}
                      borderRadius={"30px"}
                      size={"md"}
                      color={index == 0 ? "black" : "black"}
                      bg={index == 0 ? "white" : "purple.100"}
                      rightIcon={<FiX />}
                      onClick={() => {
                        let subs = Subjects.filter((el) => item !== el);
                        setSubjects(subs);
                      }}
                    >
                      {index == 0 && "Primary: "}
                      {item}
                    </Button>
                  );
                })}
              </Flex>
            )}
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="8px">
            <FormLabel>Add or Remove Subjects </FormLabel>
            <Flex
              w="100%"
              alignItems={"center"}
              direction={{ base: "column", md: "row" }}
              gap="2"
            >
              <Select
                isDisabled={EDITING ? false : true}
                width={"80%"}
                id="selectsubs"
              >
                <option value="">Select Subjects</option>
                {IndianSubjects.map((item) => {
                  return (
                    <option key={item + "12df3"} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Select>
              <Button
                leftIcon={<AddIcon />}
                colorScheme={"red"}
                onClick={HandleAddsub}
                isDisabled={EDITING ? false : true}
              >
                Add
              </Button>
            </Flex>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 6 }} p="8px">
            <FormLabel>
              Highest Qualification : {ProfileDetails?.highest_qualification}
            </FormLabel>
            <Select
              isDisabled={EDITING ? false : true}
              width={"100%"}
              name="highest_qualification"
              value={ProfileDetails?.highest_qualification || ""}
              onChange={handleInputChange || ""}
            >
              <option value="">Change Highest Qualification</option>
              {IndianQualifications.map((item) => {
                return (
                  <option key={item + "123"} value={item}>
                    {item}
                  </option>
                );
              })}
            </Select>
          </GridItem>
          <GridItem as="div" colSpan={{ base: 12, md: 12 }} p="8px">
            <FormLabel>Resume Link :</FormLabel>
            <Input
              isDisabled={EDITING ? false : true}
              value={ProfileDetails?.resume_link || ""}
              isReadOnly={true}
            ></Input>
            <Box
              border={"1px solid #ddd"}
              borderRadius={"5px"}
              p={"10px"}
              width={{ base: "100%", md: "30%" }}
              textAlign={"center"}
              my={2}
            >
              <FormLabel>Update Resume</FormLabel>
              <input
                disabled={EDITING ? false : true}
                accept="application/pdf"
                type="file"
                name="resume_link"
                ref={ResumeInputRef}
                style={{ display: "none" }}
                onChange={HandleFileUpload}
              />
              <Button
                colorScheme={isUploaded1 ? "green" : "blue"}
                bg={isUploaded1 ? "green.500" : "blue.500"}
                isLoading={loading1}
                size={"md"}
                loadingText="Uploading"
                spinnerPlacement="start"
                leftIcon={isUploaded ? <CheckIcon /> : <EditIcon />}
                onClick={() => {
                  setloading1(true);
                  ResumeInputRef.current.click();
                }}
                isDisabled={EDITING ? false : true}
              >
                {filename1}
              </Button>
            </Box>
          </GridItem>

          <GridItem
            as="div"
            colSpan={{ base: 12, md: 12 }}
            p="8px"
            display={"flex"}
            justifyContent={"end"}
            alignItems={"end"}
          >
            {EDITING && (
              <Flex
                gap={3}
                justifyContent={"end"}
                alignItems={"center"}
                width={"100%"}
              >
                <Button
                  bg="green.500"
                  colorScheme="red"
                  my="10px"
                  px={10}
                  type="submit"
                  leftIcon={<FiCheckCircle />}
                >
                  Save Profile Details
                </Button>
                <Link to="/user/dashboard">
                  <Button colorScheme="gray" my="10px" px={10}>
                    Cancel
                  </Button>
                </Link>{" "}
              </Flex>
            )}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default UserSettings;
