import React, { useEffect, useState } from "react";
import {
  Route,
  Link as RouteLink,
  Routes,
  useNavigate,
} from "react-router-dom";
import logo_light from "../assets/Icons/company.jpg";
import avatar from "../assets/Icons/avatar.png";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  useToast,
  Tag,
  Heading,
  Spinner,
  Button,
} from "@chakra-ui/react";
import {
  FiUser,
  FiHome,
  FiTruck,
  FiBriefcase,
  FiPackage,
  FiMenu,
  FiBell,
  FiUsers,
  FiChevronDown,
  FiGitBranch,
  FiFileText,
  FiSend,
  FiSettings,
  FiTerminal,
  FiMeh,
  FiUpload,
  FiCompass,
  FiLogOut,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { theme1 } from "../utils/colours";
import AdminRoutes from "../Routes/AdminRoutes";
import IndianNumberSystem from "../utils/IndianNumberSystem";
import axios from "axios";
import { BASE_URL } from "../utils/config";

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
        <AdminRoutes />
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
    setActive("admin/" + tabopen);
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
        path={"admin/dashboard"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Dashboard</Text>
      </NavItem>
      <NavItem
        key={"User"}
        icon={FiUsers}
        path={"admin/user"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}> User</Text>
      </NavItem>
      <NavItem
        key={"Student"}
        icon={FiFileText}
        path={"admin/student"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Student</Text>
      </NavItem>

      <NavItem
        key={"Streaks"}
        icon={FiMeh}
        path={"admin/streaks"}
        setActive={setActive}
        Active={Active}
      >
        <Text size={"sm"}> Streaks</Text>
      </NavItem>
      <NavItem
        key={"User"}
        icon={FiUser}
        path={"admin/user"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Users</Text>
      </NavItem>

      <NavItem
        key={"Website"}
        icon={FiSettings}
        path={"admin/website"}
        Active={Active}
        setActive={setActive}
      >
        <Text size={"sm"}>Website</Text>
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
        bg={path == Active ? theme1 : "white"}
        color={path == Active ? "white" : "black"}
        fontWeight={path == Active ? "600" : "400"}
        onClick={() => setActive(path)}
        _hover={{
          bg: theme1,
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

  const user = JSON.parse(localStorage.getItem("user_detail_userapp"));

  const [DashDetails, setDashDetails] = useState({});

  const getData = () => {
    axios.get(`${BASE_URL}/api/test/get-dashboard-details`).then((res) => {
      setDashDetails(res?.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Flex
      pos={"relative"}
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
        {user?.role == "Admin" && (
          <>
            <Tag
              variant="outline"
              colorScheme="green"
              padding={"8px"}
              visibility={{ base: "hidden", md: "visible" }}
            >
              <VStack spacing={{ base: "0", md: "0" }} alignItems="flex-end">
                <Text fontSize="s">
                  <b>Daily Revenue</b>
                </Text>
                <Text fontSize="xs" color="gray.600">
                  ₹ {IndianNumberSystem(+DashDetails?.DailyRevenue)}
                </Text>
              </VStack>
            </Tag>
            <Tag
              variant="outline"
              colorScheme="blue"
              padding={"8px"}
              visibility={{ base: "hidden", md: "visible" }}
            >
              <VStack spacing={{ base: "0", md: "0" }} alignItems="flex-end">
                <Text fontSize="s">
                  <b>Monthly Revenue</b>
                </Text>
                <Text fontSize="xs" color="gray.600">
                  ₹ {IndianNumberSystem(+DashDetails?.MonthlyRevenue)}
                </Text>
              </VStack>
            </Tag>
          </>
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
                    {user?.role + " "}
                  </Text>
                </VStack>
                <Avatar size={"md"} src={user?.profile_photo || avatar} />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                variant="outline"
                border={"none"}
                _hover={{ background: "gray.100" }}
                // leftIcon={<FiUser />}
                px={2}
              >
                Profile
              </MenuItem>

              <MenuItem
                variant="outline"
                border={"none"}
                _hover={{ background: "gray.100" }}
                // leftIcon={<FiCompass />}
                px={2}
              >
                Change Password
              </MenuItem>

              <MenuItem
                variant="outline"
                border={"none"}
                onClick={() => navigate("/admin/dashboard/upload-stuff")}
                // leftIcon={<FiUpload />}
                _hover={{ background: "gray.100" }}
                px={2}
              >
                Upload PDF
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={handleLogout}
                variant="outline"
                border={"none"}
                // leftIcon={<FiLogOut />}
                _hover={{ background: "gray.100" }}
                px={2}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
