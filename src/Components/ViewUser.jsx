import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewUser = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const handleDelete = async () => {
    try {
      let data = await fetch(`${url}/user/delete/${id}`, {
        method: "DELETE",
      });
      data = await data.json();
      navigate("/admin/user");
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      let data = await fetch(`${url}/user/${id}`);
      data = await data.json();
      setUser(data.data);
      console.log("State Data", user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box textAlign={"left"} p="4" ml={5}>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View User Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/user/edit/${id}`)}
        >
          Edit
        </Button>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={handleDelete}
        >
          Delete
        </Button>
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
      {user.image && (
        <>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Profile
          </Text>
          <Image src={`${url}/user/${user.image}`} />
          <br />
        </>
      )}
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

export default ViewUser;
