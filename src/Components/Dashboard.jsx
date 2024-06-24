import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HiUsers } from "react-icons/hi";
import { MdOutlineContactPage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate=useNavigate()
  return (
    <Flex
      p="4"
      justifyContent={"space-around"}
      gap="40px"
    //   w={"100%"}
      flexDirection={["column", "column", "column", "row", "row"]}
    >
      <Card border={"2px solid #add8e6"} borderRadius={"20px"} bg="linear-gradient(to right, white, #add8e6)">
        <CardHeader>
          <Heading size="lg" color={"black"}>
            {" "}
            User
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            You Have {} Users in your database.Click on button below to view all
            users.
          </Text>
        </CardBody>
        <CardFooter justifyContent={"space-around"} alignItems={"center"}>
          <HiUsers size="70px" color="#add8e6" />
          <Button
            mt={"10px"}
            _hover={{ color: "black", bgColor: "white" }}
            variant={"ghost"}
            bgColor={"black"}
            color={"#add8e6"}
            onClick={() => navigate("/admin/user")}
          >
            View all Users
          </Button>
        </CardFooter>
      </Card>
      {/* <Card bgGradient='linear(to-r, white, gray.300)'>
      <CardHeader>
        <Heading size='md'> Post</Heading>
      </CardHeader>
      <CardBody>
        <Text>You Have {blog} Posts in your database.Click on button below to view all posts.</Text>
      </CardBody>
      <CardFooter justifyContent={"space-around"} alignItems={"center"}>
      <BsFillFileEarmarkPostFill size="70px" color='#ccd6e1' />
        <Button mt={"10px"} bgColor={"gray.100"} onClick={()=>navigate("/admin/blog")} border="1px solid #161616">View all Posts</Button>
      </CardFooter>
    </Card> */}
      <Card border={"2px solid #add8e6"} borderRadius={"20px"} bg="linear-gradient(to right, white, #add8e6)"  >
        <CardHeader>
          <Heading size="lg" color={"black"}>
            {" "}
            Page
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            You Have 6  Pages in your database.Click on button below to view all
            pages.
          </Text>
        </CardBody>
        <CardFooter justifyContent={"space-around"} alignItems={"center"}>
          <MdOutlineContactPage size="70px" color="#add8e6" />
          <Button
            mt={"10px"}
            variant={"ghost"}
            _hover={{ color: "black", bgColor: "white" }}
            bgColor={"black"}
            color={"#add8e6"}
            onClick={() => navigate("/admin/page")}
          >
            View all Pages
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Dashboard;
