import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewInquiry = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getData = async () => {
    try {
      let data = await fetch(`${url}/inquiry/${id}`);
      data = await data.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box textAlign={"left"} p="4" ml={15}>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Category Details
        </Text>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Name
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {user?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Email
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {user?.email}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Mobile
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {user?.mobile}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        City
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {user?.city}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Message
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {user?.message}
      </Box>
      <br />
      
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {user?.createdAt ? (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(user.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      ) : (
        <Text>No Records</Text>
      )}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Updated at
      </Text>
      {user?.modifiedAt ? (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(user?.modifiedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      ) : (
        <Text>No Records</Text>
      )}
    </Box>
  );
};

export default ViewInquiry;
