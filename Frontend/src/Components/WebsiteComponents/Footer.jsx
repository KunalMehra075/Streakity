import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import facebook from "../../assets/Icons/facebook.png";
import insta from "../../assets/Icons/insta.png";
import twitter from "../../assets/Icons/twitter.png";
import youtube from "../../assets/Icons/youtube.png";
import linkedin from "../../assets/Icons/linkedin.png";
import logo from "../../assets/Icons/company.jpg";

import { MdLocalPhone, MdLocationOn, MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <Box bg="white" border={"1px solid #ddd"}>
      <Grid
        templateColumns="repeat(10, 1fr)"
        mx="5"
        p="10"
        gap={{ base: "5", md: "20" }}
        spacing="2"
      >
        <GridItem colSpan={{ base: "10", sm: "5", md: "2" }} align="center">
          <Box>
            <Image src={logo} width={{ base: "100px", sm: "150px" }} />
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: "10", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">Navigate</Heading>
            <Box as="a" href={"/about"}>
              About us
            </Box>
            <Box as="a" href={"/blogs"}>
              Blog
            </Box>
            <Box as="a" href={"/faq"}>
              FAQ
            </Box>
            <Box as="a" href={"/privacy-policy"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"/contact-us"}>
              Contact Us
            </Box>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "10", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">Join Us</Heading>
            <Box as="a" href={"/need-user"}>
              Need a User
            </Box>
            <Box as="a" href={"/user-register"}>
              User Registration
            </Box>
            <Box as="a" href={"/user-login"}>
              User Login
            </Box>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "10", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md"> Contact Info</Heading>
            <HStack>
              <MdLocationOn color={"black"} />
              <Text>Bangalore, India</Text>
            </HStack>
            <HStack as="a" href={"mailto:sample@gmail.com"}>
              <MdEmail color="black" />
              <Text>sample@gmail.com</Text>
            </HStack>
            <HStack as="a" href={"tel:+91-8369563412"}>
              <MdLocalPhone color="black" />
              <Text>+91-8369563412</Text>
            </HStack>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "10", sm: "5", md: "2" }}>
          <Stack>
            <Heading size="md">Follow Us</Heading>
            <HStack>
              <a
                href="https://www.facebook.com/CompanyUserials"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={facebook} />
              </a>
              <a
                href="https://www.instagram.com/whiz_guru_user"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={insta} />
              </a>

              <a href="" target="_blank" rel="noreferrer">
                <Image width="30px" src={youtube} />
              </a>

              <a
                href="https://twitter.com/whiz_guru_user"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={twitter} />
              </a>

              <a
                href="https://www.linkedin.com/in/company-the-enlightened-brain-960b80287/"
                target="_blank"
                rel="noreferrer"
              >
                <Image width="30px" src={linkedin} />
              </a>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}
