import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiHome,
  FiList,
  FiMeh,
  FiMenu,
  FiPenTool,
  FiSettings,
  FiSmile,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import UserRoutes from "../Routes/UserRoutes";
import logo_light from "../assets/Icons/Streakity.png";
import avatar from "../assets/Icons/avatar.png";
import {
  BsFileBarGraph,
  BsFillBalloonFill,
  BsFillTreeFill,
} from "react-icons/bs";

export default function SideNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <UserRoutes />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const [Active, setActive] = useState("");
  let location = window.location.href;
  let tabopen = location.split("/")[4];
  useEffect(() => {
    if (!tabopen) {
      navigate("dashboard");
    }
    setActive("user/" + tabopen);
  }, [location]);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "230px" }}
      justifyContent={"center"}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" p="2" justifyContent="space-between">
        <Image src={logo_light} width={"150px"} ml={"20px"} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem
        key={"Dashboard"}
        icon={FiHome}
        path={"user/dashboard"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Dashboard</Text>
      </NavItem>
      <NavItem
        key={"Streaks"}
        icon={FiSmile}
        path={"user/streaks"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}> Streaks</Text>
      </NavItem>
      <NavItem
        key={"Tasks"}
        icon={FiList}
        path={"user/tasks"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}> Tasks</Text>
      </NavItem>
      <NavItem
        key={"Graphs"}
        icon={BsFileBarGraph}
        path={"user/graphs"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}> Graphs</Text>
      </NavItem>

      <NavItem
        key={"Books"}
        icon={FiBookOpen}
        path={"user/books"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Books</Text>
      </NavItem>
      <NavItem
        key={"Habits"}
        icon={BsFillTreeFill}
        path={"user/habits"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Habits</Text>
      </NavItem>
      <NavItem
        key={"Journal"}
        icon={FiPenTool}
        path={"user/journal"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Journal</Text>
      </NavItem>
      <NavItem
        key={"Settings"}
        icon={FiSettings}
        path={"user/settings"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Settings</Text>
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, path, Active, setActive, ...rest }) => {
  return (
    <Link
      as={RouteLink}
      to={"/" + path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        my="1"
        borderRadius="5px"
        role="group"
        cursor="pointer"
        bg={path == Active ? "linear-gradient(135deg, aqua,blue)" : "white"}
        color={path == Active ? "white" : "black"}
        fontWeight={path == Active ? "600" : "400"}
        onClick={() => setActive(path)}
        _hover={{
          bg: "linear-gradient(135deg, aqua,blue)",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    toast({
      title: "Logout Successfull.",
      description: "You have been successfully logged out.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  const user = JSON.parse(localStorage.getItem("user_details_streakity"));

  return (
    <Flex
      ml={{ base: 0, md: "230px" }}
      px={{ base: 4, md: 4 }}
      height="16"
      zIndex={"10"}
      position={"sticky"}
      top={"0"}
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image
        src={logo_light}
        display={{ base: "flex", md: "none" }}
        width={"70px"}
        alignSelf={"center"}
      />
      <HStack spacing={{ base: "0", md: "4" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        {user?.role == "Admin" && (
          <Tag
            variant="outline"
            colorScheme="blue"
            padding={"8px"}
            visibility={{ base: "hidden", md: "visible" }}
          >
            <VStack spacing={{ base: "0", md: "0" }} alignItems="flex-end">
              <Text fontSize="s">
                <b>Total Revenue</b>
              </Text>
              <Text fontSize="xs" color="gray.600">
                ₹ 1,00,000
              </Text>
            </VStack>
          </Tag>
        )}

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user?.first_name + " " + user?.last_name}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
                <Avatar size={"md"} src={user?.profile_photo || avatar} />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem
                onClick={() => navigate("/user/dashboard/change-password")}
              >
                Change Password
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
