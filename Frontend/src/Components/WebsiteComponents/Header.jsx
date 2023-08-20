import logo from "../../assets/Icons/Streakity.png";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  HamburgerIcon,
  CloseIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignItems={"center"}
        bg={"gray.700"}
        display={{ base: "none", md: "flex" }}
        color="white"
        gap="5"
        px="20"
        py="2"
      >
        <Box>
          <a href="tel:+91-789456123">
            <PhoneIcon m="2" /> +91-789456123
          </a>
        </Box>
        <Box>
          <a href="mailto:sample@gmail.com">
            <EmailIcon m="2" />
            email@gmail.com
          </a>
        </Box>
        <Spacer />
        <Button as={Link} size="sm" mr="10" to="/">
          Do Something
        </Button>
        <Flex alignItems={"center"} gap="4">
          <a
            href="https://www.facebook.com/CompanyUserials"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
          </a>

          <a
            href="https://www.instagram.com/whiz_guru_user"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>

          <a
            href="https://twitter.com/whiz_guru_user"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter />
          </a>

          <a href="" target="_blank" rel="noreferrer">
            <BsYoutube />
          </a>

          <a
            href="https://www.linkedin.com/in/company-the-enlightened-brain-960b80287"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
        </Flex>
      </Flex>
      <Box bg="white" px={{ base: "3", md: "5" }} py={1}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box mx={{ base: "10px", md: "30px" }}>
              <a href="/">
                <Image src={logo} width="90px" />
              </a>
            </Box>
            <HStack
              as={"nav"}
              spacing={5}
              display={{ base: "none", md: "flex" }}
              h="4"
              fontSize="18"
              fontWeight="bold"
            >
              <NavLink to="/"> Home </NavLink>
              <NavLink to="/about"> About </NavLink>
              <NavLink to="blogs">Blog</NavLink>
              <NavLink to="/contact-us"> Contact Us </NavLink>
            </HStack>
          </HStack>
          <HStack
            as={"nav"}
            spacing={5}
            display={{ base: "none", md: "flex" }}
            h="4"
          >
            <NavLink to="/admin-login">
              <Button colorScheme="blue" borderRadius={5}>
                Admin Login
              </Button>
            </NavLink>
            <NavLink to="/user-login">
              <Button colorScheme="blue" borderRadius={5} p="5">
                User Login
              </Button>
            </NavLink>
          </HStack>
          <Box display={{ md: "none" }}></Box>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon fontSize={"30px"} />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4} fontWeight="bold">
              <NavLink to="/"> Home </NavLink>
              <NavLink to="/about"> About </NavLink>
              <NavLink to="blogs">Blog</NavLink>
              <NavLink to="/contact-us"> Contact Us </NavLink>

              <NavLink to="/admin-login">
                <Button colorScheme="orange" size="sm">
                  Admin Login
                </Button>
              </NavLink>
              <NavLink to="/user-login">
                <Button colorScheme="orange" size="sm">
                  User Login
                </Button>
              </NavLink>
              <Box my="3">
                <Box>
                  <a href="tel:+91-8369563412">
                    <PhoneIcon my="2" mr="2" /> +91-8369563412
                  </a>
                </Box>
                <Box>
                  <a href="mailto:sample@gmail.com">
                    <EmailIcon my="2" mr="2" />
                    sample@gmail.com
                  </a>
                </Box>
                <NavLink to="/book-demo">
                  <Button size="sm" my="2" variant="outline" colorScheme="blue">
                    Book Demo Class
                  </Button>
                </NavLink>

                <Flex my="2" alignItems={"center"} gap="4">
                  <a
                    href="https://www.facebook.com/CompanyUserials"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsFacebook />
                  </a>

                  <a
                    href="https://www.instagram.com/whiz_guru_user"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsInstagram />
                  </a>

                  <a
                    href="https://twitter.com/whiz_guru_user"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsTwitter />
                  </a>

                  <a href="" target="_blank" rel="noreferrer">
                    <BsYoutube />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/company-the-enlightened-brain-960b80287"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsLinkedin />
                  </a>
                </Flex>
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
