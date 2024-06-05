import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useLayoutEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const { slugname } = useParams();
  let url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();

  const getData = async () => {
    console.log(slugname);
    try {
      let data = await fetch(`${url}/category/${slugname}`);
      data = await data.json();
      console.log(data.data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      let res = await fetch(`${url}/category/delete/${slugname}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      //console.log(res);
      toast({
        title: "Category Deleted",
        description: res.msg,
        status: "success",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
      toast({
        title: "Invalid Response",
        description: error.message,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };
  useLayoutEffect(() => {
    getData();
  }, []);
  return (
    <Box textAlign={"left"} p="4">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Category Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/category/edit/${slugname}`)}
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
        {category?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Order
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {category?.order}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        PermaLink
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {url+"/category/"+category?.slug}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {category?.createdAt ? (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(category.createdAt).toLocaleString("en-IN", {
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
      {category?.modifiedAt ? (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(category.modifiedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      ) : (
        <Text>No Records</Text>
      )}
    </Box>
  );
};

export default ViewCategory;
