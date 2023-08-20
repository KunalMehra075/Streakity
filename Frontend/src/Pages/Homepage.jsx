// import {
//   Box,
//   Button,
//   Card,
//   Center,
//   Flex,
//   Grid,
//   GridItem,
//   HStack,
//   Heading,
//   Image,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import Carousel from "../Components/WebsiteComponents/Carousel";
// import bg from "../assets/bg.jpeg";
// import single from "../assets/icons/single.png";
// import multiple from "../assets/icons/multiple.png";
// import online from "../assets/icons/online.png";
// import offline from "../assets/icons/offline.png";
// import one from "../assets/icons/one.png";
// import two from "../assets/icons/two.png";
// import three from "../assets/icons/three.png";
// import four from "../assets/icons/four.png";
// import six from "../assets/icons/six.png";
// import Testemonials from "../Components/WebsiteComponents/Testemonials";
// import img from "../assets/img/img.jpg";
// import pic from "../assets/img/34.jpg";
// import Blog from "../Components/WebsiteComponents/Blog";

export default function Homepage() {
  return (
    <></>
    // <>
    //   <Carousel />
    //   <Flex //statsbox
    //     my="8"
    //     alignItems={"center"}
    //     justifyContent={"center"}
    //     direction={{ base: "column", md: "row" }}
    //     gap="4"
    //   >
    //     <Card
    //       height="120px"
    //       width="300px"
    //       bg="#eabfff"
    //       borderRadius="30"
    //       p="5"
    //       boxShadow="xl"
    //     >
    //       <Center fontSize={28} fontWeight="bold" m="1" color="green.700">
    //         500+
    //       </Center>
    //       <Center>Certified Users</Center>
    //     </Card>
    //     <Card
    //       height="120px"
    //       width="300px"
    //       bg="#fff9c8"
    //       borderRadius="30"
    //       p="5"
    //       boxShadow="xl"
    //     >
    //       <Center fontSize={28} fontWeight="bold" m="1" color="green.700">
    //         2500+
    //       </Center>
    //       <Center>Registered Students</Center>
    //     </Card>
    //     <Card
    //       height="120px"
    //       width="300px"
    //       bg="#c0ffd2"
    //       borderRadius="30"
    //       p="5"
    //       boxShadow="xl"
    //     >
    //       <Center fontSize={28} fontWeight="bold" m="1" color="green.700">
    //         10000+
    //       </Center>
    //       <Center>Streaks Conducted</Center>
    //     </Card>
    //   </Flex>

    //   <Flex //3rd box
    //     gap={{ base: "10", md: "3" }}
    //     alignItems="center"
    //     justifyContent="center"
    //     p="10"
    //     my="5"
    //     // backgroundImage={bg}
    //     direction={{ base: "column", md: "row" }}
    //     backgroundSize="cover"
    //     backgroundPosition="center"
    //   >
    //     <Link to="/need-user">
    //       <Button
    //         m={{ md: "5" }}
    //         variant={"solid"}
    //         colorScheme="orange"
    //         size="lg"
    //       >
    //         Need Home User
    //       </Button>
    //     </Link>
    //     <Link to="/user-register">
    //       <Button
    //         m={{ md: "5" }}
    //         variant={"solid"}
    //         colorScheme="orange"
    //         size="lg"
    //       >
    //         Register as User
    //       </Button>
    //     </Link>
    //   </Flex>

    //   <Box //why choose us
    //   >
    //     <Heading textAlign="center" my={"10"} size="lg" color={"#961595"}>
    //       Services We Offer!
    //     </Heading>

    //     <Flex
    //       direction={{ base: "column", md: "row" }}
    //       alignItems="center"
    //       justifyContent="center"
    //       gap={{ base: "5", md: "20" }}
    //       m="5"
    //     >
    //       <Flex
    //         direction={{ base: "column", sm: "row" }}
    //         alignItems="center"
    //         justifyContent="center"
    //         gap={{ base: "5", md: "20" }}
    //       >
    //         <Card
    //           height="170px"
    //           width="200px"
    //           bg="#c0ffd2"
    //           borderRadius="30"
    //           p="5"
    //           transition="width 0.2s ease"
    //           // _hover={{ width: "210px", height: "180px", fontWeight: "bold" }}
    //           alignItems={"center"}
    //           justifyContent={"center"}
    //         >
    //           <Image width="90px" src={single} mb="5" />
    //           <Heading textAlign="center" size="sm" fontWeight="normal">
    //             School <br /> Education (K-12)
    //           </Heading>
    //         </Card>
    //         <Card
    //           height="170px"
    //           width="200px"
    //           bg="#fff9c8"
    //           borderRadius="30"
    //           p="5"
    //           transition="width 0.2s ease"
    //           // _hover={{ width: "210px", height: "180px", fontWeight: "bold" }}
    //           alignItems={"center"}
    //           justifyContent={"center"}
    //         >
    //           <Image width="90px" src={multiple} mt="3" mb="7" />
    //           <Heading textAlign="center" size="sm" fontWeight="normal">
    //             Single & Multiple Subjects
    //           </Heading>
    //         </Card>
    //       </Flex>
    //       <Flex
    //         direction={{ base: "column", sm: "row" }}
    //         alignItems="center"
    //         justifyContent="center"
    //         gap={{ base: "5", md: "20" }}
    //       >
    //         <Card
    //           height="170px"
    //           width="200px"
    //           bg="#c3f6ff"
    //           borderRadius="30"
    //           p="5"
    //           transition="width 0.2s ease"
    //           // _hover={{ width: "210px", height: "180px", fontWeight: "bold" }}
    //           alignItems={"center"}
    //         >
    //           <Image width="90px" src={online} mb="5" />
    //           <Heading textAlign="center" size="sm" fontWeight="normal">
    //             Online Streaks
    //           </Heading>
    //         </Card>
    //         <Card
    //           height="170px"
    //           width="200px"
    //           bg="#eabfff"
    //           borderRadius="30"
    //           p="5"
    //           transition="width 0.2s ease"
    //           // _hover={{ width: "210px", height: "180px", fontWeight: "bold" }}
    //           alignItems={"center"}
    //         >
    //           <Image width="90px" src={offline} mb="5" />
    //           <Heading textAlign="center" size="sm" fontWeight="normal">
    //             In-Home Streaks
    //           </Heading>
    //         </Card>
    //       </Flex>
    //     </Flex>
    //   </Box>

    //   <Box //why us
    //     bg="#F7FAFC"
    //     backgroundSize="cover"
    //     backgroundPosition="center"
    //     py="5"
    //     px="10"
    //     mb="5"
    //     mt="10"
    //   >
    //     <Heading textAlign="center" my="5" size="lg" color={"#961595"}>
    //       Happy To Say!
    //     </Heading>

    //     <Flex
    //       justifyContent={{ base: "flex-start", md: "space-evenly" }}
    //       px="10"
    //       pb="10"
    //       pt="5"
    //       gap={{ base: "10", md: "20" }}
    //       direction={{ base: "column", md: "row" }}
    //     >
    //       <Stack>
    //         <Image width="70px" height="70px" src={one} />
    //         <Heading size="md">India's best in Usering Sector</Heading>
    //       </Stack>

    //       <Stack>
    //         <Image width="70px" height="70px" src={two} />
    //         <Heading size="md">In-Home & Online Tuitons</Heading>
    //       </Stack>

    //       <Stack>
    //         <Image width="60px" height="70px" src={three} />
    //         <Heading size="md">Easy User Replacement</Heading>
    //       </Stack>
    //     </Flex>

    //     <Flex
    //       justifyContent={{ base: "flex-start", md: "space-evenly" }}
    //       px="10"
    //       pb="10"
    //       gap={{ base: "10", md: "20" }}
    //       direction={{ base: "column", md: "row" }}
    //     >
    //       <Stack>
    //         <Image width="70px" height="70px" src={four} />
    //         <Heading size="md">Free Demo Class</Heading>
    //       </Stack>

    //       <Stack>
    //         <Image width="70px" height="70px" src={six} />
    //         <Heading size="md">Personalized learning and attention</Heading>
    //       </Stack>
    //     </Flex>
    //   </Box>

    //   <Box //benefits
    //     my="5"
    //   >
    //     <Heading textAlign="center" my="5" size="lg" color={"#961595"}>
    //       Benefits For Users!
    //     </Heading>
    //     <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
    //       <Box width={{ md: "50%" }} p="10">
    //         <Image src={img} m="auto" width="500px" borderRadius="25" />
    //       </Box>
    //       <Box width={{ md: "50%" }} pr="10">
    //         <Grid templateColumns="repeat(6, 1fr)">
    //           <GridItem colSpan={{ base: "6", sm: "3" }} mx="10" my="5">
    //             <HStack alignItems="center">
    //               <Box
    //                 p="2"
    //                 borderRadius="50%"
    //                 overflow="hidden"
    //                 bg="blue.300"
    //                 position="relative"
    //                 zIndex="1"
    //                 mr="-50px"
    //               >
    //                 <Box borderRadius="50%" overflow="hidden" bg="white" p="2">
    //                   <Image
    //                     width="120px"
    //                     transform="scale(1)"
    //                     src="/icons/one.png"
    //                   />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 bg="#87ecff"
    //                 p="7"
    //                 borderRadius="30"
    //                 left="-40px"
    //                 h="150px"
    //               >
    //                 <Heading size="md" ml="10">
    //                   Transparent Payment System
    //                 </Heading>
    //               </Box>
    //             </HStack>
    //           </GridItem>
    //           <GridItem colSpan={{ base: "6", sm: "3" }} mx="10" my="5">
    //             <HStack alignItems="center">
    //               <Box
    //                 p="2"
    //                 borderRadius="50%"
    //                 overflow="hidden"
    //                 bg="purple.300"
    //                 position="relative"
    //                 zIndex="1"
    //                 mr="-50px"
    //               >
    //                 <Box borderRadius="50%" overflow="hidden" bg="white" p="2">
    //                   <Image
    //                     src="/icons/two.png"
    //                     width="125px"
    //                     h={{ base: "65px" }}
    //                     transform="scale(1)"
    //                   />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 bg="#ddabff"
    //                 p="7"
    //                 borderRadius="30"
    //                 left="-40px"
    //                 h="150px"
    //               >
    //                 <Heading size="md" ml="10">
    //                   Flexiblity of Teaching Hours
    //                 </Heading>
    //               </Box>
    //             </HStack>
    //           </GridItem>
    //           <GridItem colSpan={{ base: "6", sm: "3" }} mx="10" my="5">
    //             <HStack alignItems="center">
    //               <Box
    //                 p="2"
    //                 borderRadius="50%"
    //                 overflow="hidden"
    //                 bg="pink.300"
    //                 position="relative"
    //                 zIndex="1"
    //                 mr="-50px"
    //               >
    //                 <Box borderRadius="50%" overflow="hidden" bg="white" p="2">
    //                   <Image
    //                     src="/icons/three.png"
    //                     width="110px"
    //                     h="60px"
    //                     transform="scale(1)"
    //                   />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 bg="#ffd1f7"
    //                 p="7"
    //                 borderRadius="30"
    //                 left="-40px"
    //                 h="150px"
    //               >
    //                 <Heading size="md" ml="10">
    //                   Access to 10000+ Students
    //                 </Heading>
    //               </Box>
    //             </HStack>
    //           </GridItem>
    //           <GridItem colSpan={{ base: "6", sm: "3" }} mx="10" my="5">
    //             <HStack alignItems="center">
    //               <Box
    //                 p="2"
    //                 borderRadius="50%"
    //                 overflow="hidden"
    //                 bg="green.300"
    //                 position="relative"
    //                 zIndex="1"
    //                 mr="-50px"
    //               >
    //                 <Box borderRadius="50%" overflow="hidden" bg="white" p="2">
    //                   <Image
    //                     src="/icons/four.png"
    //                     width="90px"
    //                     transform="scale(1)"
    //                   />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 bg="#ceffca"
    //                 p="7"
    //                 borderRadius="30"
    //                 left="-40px"
    //                 h="150px"
    //               >
    //                 <Heading size="md" ml="10">
    //                   Increase your Earnings
    //                 </Heading>
    //               </Box>
    //             </HStack>
    //           </GridItem>
    //         </Grid>
    //         <Flex
    //           justifyContent={"center"}
    //           mx={{ base: "10", sm: "20" }}
    //           my={{ base: "5" }}
    //           px={{ md: "20" }}
    //         >
    //           <HStack alignItems="center">
    //             <Box
    //               p="2"
    //               borderRadius="50%"
    //               overflow="hidden"
    //               bg="yellow.300"
    //               position="relative"
    //               zIndex="1"
    //               mr="-50px"
    //             >
    //               <Box borderRadius="50%" overflow="hidden" bg="white" p="2">
    //                 <Image
    //                   src="/icons/five.png"
    //                   width={{ base: "110px", md: "60px" }}
    //                   transform="scale(1)"
    //                 />
    //               </Box>
    //             </Box>
    //             <Box
    //               bg="#fffeb5"
    //               p="7"
    //               borderRadius="30"
    //               left="-40px"
    //               h="150px"
    //               w={{ sm: "70%" }}
    //             >
    //               <Heading size="md" ml="10">
    //                 100% Assured Satisfaction
    //               </Heading>
    //             </Box>
    //           </HStack>
    //         </Flex>
    //       </Box>
    //     </Flex>
    //   </Box>

    //   <Box id="blog">
    //     <Blog />
    //   </Box>

    //   <Flex
    //     alignItems="center"
    //     direction={{ base: "column", md: "row" }}
    //     py={"10"}
    //   >
    //     <Box //Book demo
    //       width={{ md: "50%" }}
    //       p="10"
    //       textAlign="center"
    //     >
    //       <Heading textAlign="center" size="lg" color={"#961595"} my="5">
    //         Book Your First Demo Class
    //       </Heading>
    //       <Link to="/book-demo">
    //         <Button
    //           m={{ md: "5" }}
    //           variant={"solid"}
    //           colorScheme="orange"
    //           size="lg"
    //         >
    //           BOOK NOW
    //         </Button>
    //       </Link>
    //     </Box>
    //     <Box width={{ base: "90%", md: "50%" }}>
    //       <Image
    //         src={pic}
    //         m="auto"
    //         width={{ base: "100%", md: "80%" }}
    //         borderRadius="25"
    //       />
    //     </Box>
    //   </Flex>

    //   <Box //vision and mission
    //     alignItems="center"
    //     bg="#F7FAFC"
    //     backgroundSize="cover"
    //     backgroundPosition="center"
    //     p="5"
    //   >
    //     <Flex
    //       alignItems="center"
    //       direction={{ base: "column", md: "row" }}
    //       px={{ base: "0", md: "20" }}
    //       py={5}
    //     >
    //       <Image
    //         src="/vision.jpg"
    //         w={{ base: "100%", md: "40%" }}
    //         borderRadius={30}
    //         mb={{ base: "10", md: "0" }}
    //       />
    //       <Box>
    //         <Heading textAlign="center" size="lg" color={"#961595"}>
    //           Company Vision
    //         </Heading>
    //         <Text fontSize="18" mt="5" ml="5">
    //           At Company, our vision is to redefine the landscape of education
    //           by creating a transformative online and home user platform that
    //           empowers learners of all ages and backgrounds to reach their full
    //           potential. We envision a future where education is personalized,
    //           engaging, and accessible, fostering a world where knowledge knows
    //           no limits.
    //         </Text>
    //         <Text fontSize="18" mt="5" ml="5">
    //           Our goal is to be a trailblazer in innovative and holistic
    //           learning, providing a seamless blend of technology and human
    //           connection. We strive to cultivate a community of learners who are
    //           not only academically successful but also curious, adaptable, and
    //           equipped with the skills necessary to excel in a rapidly evolving
    //           global society.
    //         </Text>
    //         <Text fontSize="18" mt="5" ml="5">
    //           We envision a platform where learners can connect with exceptional
    //           educators who are not just users but mentors, guiding students on
    //           a journey of intellectual and personal growth. Through dynamic and
    //           interactive learning experiences, we aim to spark a lifelong love
    //           for learning and instill the confidence to tackle any challenge.
    //         </Text>
    //         <Text fontSize="18" mt="5" ml="5">
    //           Company envisions breaking down geographical barriers, making
    //           quality education accessible to those who might otherwise be
    //           limited by their location. By leveraging the power of technology,
    //           we seek to create a global network of learners who share a passion
    //           for education and a commitment to continuous improvement.
    //         </Text>
    //         <Text fontSize="18" mt="5" ml="5">
    //           In this vision, Company is not just a platform but a catalyst for
    //           positive change, contributing to a world where education is a
    //           force for equality, empowerment, and progress. We are dedicated to
    //           nurturing the minds of today to become the leaders, innovators,
    //           and problem solvers of tomorrow.
    //         </Text>
    //         <Text fontSize="18" mt="5" ml="5">
    //           Join us in our pursuit of a brighter educational future, where
    //           Company becomes synonymous with excellence, innovation, and the
    //           unwavering belief in the limitless potential of every learner.
    //         </Text>
    //         <Text fontSize="18" mt="5" ml="5">
    //           The Company Team
    //         </Text>
    //       </Box>
    //     </Flex>
    //   </Box>
    //   <Box //testemonial
    //     my="10"
    //   >
    //     <Testemonials />
    //   </Box>
    // </>
  );
}
