import {
  Container,
  HStack,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiEdit3, FiPlusCircle, FiRefreshCcw } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ChangeUserPassword,
  DeleteUserByID,
  UpdateUser,
  getUsers,
} from "../../Redux/App/Action/User.action";
import { BsFillTrash2Fill } from "react-icons/bs";
import PaginationBox from "../Extra/Pagination";
import ReusableSearchBar from "../Extra/CommonSearchBar";
import ReusableSelectBar from "../Extra/CommonSelectFilter";
import ReusableDateFilter from "../Extra/CommonDateFilter";

const AdminUser = () => {
  const user = JSON.parse(localStorage.getItem("electron_details_streakity"));

  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = React.useRef();

  const [AllUsers, setAllUsers] = useState([]);
  const [Filtering, setFiltering] = useState(false);

  const [page, setpage] = useState(1);
  const [deleteID, setdeleteID] = useState("");
  const [editingID, seteditingID] = useState("");
  const [OStatus, setOstatus] = useState("");
  const [changepass, setchangepass] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isChangePasseOpen,
    onOpen: onChangePassOpen,
    onClose: onChangePassClose,
  } = useDisclosure();

  let { TotalUsers, loading, error } = useSelector(
    (store) => store?.UserManager
  );

  const getData = () => {
    dispatch(getUsers(setAllUsers, page));
    setFiltering(false);
  };
  const HandleUpdateUser = () => {
    const data = {
      working_status: OStatus,
    };
    dispatch(UpdateUser(editingID, data, getData, toast));
  };
  const HandleChangePassword = () => {
    if (!editingID || !changepass) {
      return toast({
        title: "Please try again",
        status: "info",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
    const data = {
      newPass: changepass,
      userID: editingID,
    };
    dispatch(ChangeUserPassword(data, getData, toast));
    setchangepass("");
  };
  const HandleDeleteUser = () => {
    if (user?.role !== "Admin") {
      return toast({
        title: "This Action can only be performed by Admin",
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
    dispatch(DeleteUserByID(deleteID, toast, getData));
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <Container
      maxW="container"
      borderRadius="5px"
      minH={"610px"}
      padding={"20px"}
      backgroundColor={"white"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          mb="2"
          p={"10px"}
          fontWeight={"500"}
          fontSize={{ base: "1.3rem", md: "2rem" }}
        >
          Users Management
        </Text>
        <Flex gap={2}>
          <Link to="/admin/add-user">
            <Button
              size={{ base: "sm", md: "md" }}
              colorScheme={"red"}
              variant={"solid"}
              rightIcon={<FiPlusCircle />}
            >
              Create New Users
            </Button>
          </Link>
        </Flex>
      </Flex>

      <HStack
        py={"10px"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <ReusableSearchBar
          searchUrl={"user/search-user"}
          datatype={"user_code"}
          placeholder={"Search by Whiz Code"}
          Entities={"Users"}
          setData={setAllUsers}
          getData={getData}
          setFiltering={setFiltering}
        />
        <ReusableSearchBar
          searchUrl={"user/search-user"}
          datatype={"first_name"}
          placeholder={"Search by Name"}
          Entities={"Users"}
          setData={setAllUsers}
          getData={getData}
          setFiltering={setFiltering}
        />
        <ReusableSearchBar
          searchUrl={"user/search-user"}
          datatype={"email"}
          placeholder={"Search by Email"}
          Entities={"Users"}
          getData={getData}
          setData={setAllUsers}
          setFiltering={setFiltering}
        />
        <ReusableSelectBar
          searchUrl={"user/search-user"}
          datatype={"working_status"}
          Entities={"Users"}
          Options={["Select Status", "Active", "Inactive", "Disabled"]}
          Values={["", "active", "inactive", "disabled"]}
          setData={setAllUsers}
          getData={getData}
          setFiltering={setFiltering}
        />

        <ReusableDateFilter
          searchUrl={"user/search-user"}
          datatype={"start_date"}
          Entities={"Users"}
          setData={setAllUsers}
          getData={getData}
          setFiltering={setFiltering}
        />
        <Button
          size={"md"}
          colorScheme="purple"
          p={0}
          onClick={() => getData()}
        >
          <FiRefreshCcw />
        </Button>
      </HStack>

      <TableContainer
        position={"relative"}
        my={"10px"}
        maxHeight={"700px"}
        overflowY={"auto"}
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
              <Th sx={headCellStyle}>Sr. no</Th>
              <Th sx={headCellStyle}>Whiz Code </Th>
              <Th sx={headCellStyle}>User Name </Th>
              <Th sx={headCellStyle}>Role</Th>
              <Th sx={headCellStyle}>Contact</Th>

              <Th sx={headCellStyle}>Status</Th>
              <Th sx={headCellStyle}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={"8"}>
                  <center>
                    {" "}
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </center>
                </Td>
              </Tr>
            ) : AllUsers?.length > 0 ? (
              AllUsers?.map((item, index) => {
                return (
                  <Tr key={item._id + "ab"}>
                    <Td sx={cellStyle}>{index + page * 10 - 9}</Td>

                    <Td sx={cellStyle}>{item?.user_code}</Td>
                    <Td
                      style={{
                        ...cellStyle,
                        borderRight: "1px solid #ddd !important",
                      }}
                    >
                      <b>{item?.first_name + " " + item.last_name}</b> <br />
                    </Td>
                    <Td sx={cellStyle}>{item?.role}</Td>

                    <Td sx={cellStyle}>
                      Email : {item?.email} <br />
                      +91 {item?.phone_number}
                    </Td>

                    <Td sx={cellStyle}>
                      {item.working_status == "active" ? (
                        <Button
                          colorScheme="green"
                          size={"xs"}
                          variant={"ghost"}
                          border={"1px solid green"}
                          color={"green"}
                          background={"green.200"}
                          isLoading={loading && editingID == item._id}
                          onClick={() => {
                            if (item.role == "Admin") return "";
                            seteditingID(item._id);
                            setOstatus("disabled");
                            onUpdateOpen();
                          }}
                        >
                          Active
                        </Button>
                      ) : item.working_status == "disabled" ? (
                        <Button
                          colorScheme="orange"
                          size={"xs"}
                          variant={"ghost"}
                          border={"1px solid red"}
                          color={"red"}
                          isLoading={loading && editingID == item._id}
                          background={"orange.300"}
                          onClick={() => {
                            seteditingID(item._id);
                            setOstatus("inactive");
                            onUpdateOpen();
                          }}
                        >
                          Disabled
                        </Button>
                      ) : (
                        <Button
                          colorScheme="blue"
                          size={"xs"}
                          variant={"ghost"}
                          border={"1px solid blue"}
                          isLoading={loading && editingID == item._id}
                          background={"blue.200"}
                          color={"blue"}
                          onClick={() => {
                            seteditingID(item._id);
                            setOstatus("active");
                            onUpdateOpen();
                          }}
                        >
                          Inactive
                        </Button>
                      )}
                    </Td>
                    <Td sx={cellStyle}>
                      <Button
                        colorScheme="blue"
                        variant={"solid"}
                        size={"sm"}
                        rightIcon={<FiEdit3 />}
                        isDisabled={user.role !== "Admin"}
                        onClick={() => {
                          seteditingID(item._id);
                          onChangePassOpen();
                        }}
                      >
                        Change Password
                      </Button>

                      <Button
                        isDisabled={user.role !== "Admin"}
                        onClick={() => {
                          seteditingID(item._id);
                          setdeleteID(item._id);
                          onOpen();
                        }}
                        colorScheme="blue"
                        background="red.400"
                        variant={"solid"}
                        size={"sm"}
                        p={0}
                        mx={1}
                      >
                        <BsFillTrash2Fill />
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={"8"}>
                  <center>
                    <Text>No Users Found</Text>
                  </center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/**<!--*------- <Pagination> ----------->*/}
      {!Filtering && TotalUsers > 10 && (
        <PaginationBox
          TotalMembers={TotalUsers || 20}
          page={page}
          setpage={setpage}
        />
      )}
      {/**<!--*------- <Alerts> ----------->*/}
      <AlertDialog
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action will delete a this User and cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  HandleDeleteUser(deleteID);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/**<!--*------- <Update Status popup> ----------->*/}

      <AlertDialog
        isCentered
        motionPreset="slideInBottom"
        isOpen={isUpdateOpen}
        leastDestructiveRef={cancelRef}
        onClose={onUpdateClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update User Status
            </AlertDialogHeader>

            <AlertDialogBody>
              Change Order Status to {OStatus.toLocaleUpperCase()}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onUpdateClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  HandleUpdateUser();
                  onUpdateClose();
                }}
                ml={3}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/**<!--*------- <Change Password Popup> ----------->*/}

      <AlertDialog
        isCentered
        motionPreset="slideInBottom"
        isOpen={isChangePasseOpen}
        leastDestructiveRef={cancelRef}
        onClose={onUpdateClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Changing Password Of User
            </AlertDialogHeader>

            <AlertDialogBody>
              Alert! You are changing the password of a user.
              <br />
              <br />
              <FormControl isInvalid={changepass?.length !== 8}>
                <FormLabel>Enter new Password</FormLabel>
                <Input
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  onChange={(e) => setchangepass(e.target.value)}
                  isRequired={true}
                />
                {changepass?.length !== 8 && (
                  <FormErrorMessage>Enter 8 digit password</FormErrorMessage>
                )}
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setchangepass("");
                  onChangePassClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  HandleChangePassword();

                  onChangePassClose();
                }}
                ml={3}
              >
                Change
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};
const cellStyle = {
  padding: "8px 8px",
  textAlign: "center",
};
const headCellStyle = {
  padding: "8px 4px",
  textAlign: "center",
  color: "black",
};

export default AdminUser;
