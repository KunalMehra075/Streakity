import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Container,
  Flex,
  FormControl,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminWebsite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = React.useRef();

  const [OStatus, setOstatus] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const getData = () => {};

  useEffect(() => {
    getData();
  }, []);

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
          Website Management
        </Text>
        <Flex gap={2}>
          <Button
            bg={"blue.400"}
            colorScheme={"blue"}
            variant={"solid"}
            rightIcon={<FiSettings />}
          >
            Settings
          </Button>
        </Flex>
      </Flex>

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
              Are you sure? This action will delete a User and cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
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
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef}
        onClose={onClose1}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {OStatus == "rejected"
                ? "Are you sure to you want to Disable this user?"
                : "Updating User"}
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl color={"black"}>
                Changing User Status to {OStatus.toLocaleUpperCase()}
                <br />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose1}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  HandleUpdateUser(OStatus);
                  onClose1();
                }}
                ml={3}
              >
                Update
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
  borderRight: "1px solid #ddd !important",
  borderLeft: "1px solid #ddd !important",
};
const headCellStyle = {
  borderLeft: "1px solid #ddd !important",
  padding: "8px 4px",
  textAlign: "center",
  color: "black",
};

export default AdminWebsite;
