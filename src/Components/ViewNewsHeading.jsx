import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewNewsHeading = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const url = process.env.REACT_APP_DEV_URL;
  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/newsheading/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Data Delete Successfuly");
      navigate("/admin/page");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewsHeading = async () => {
    try {
      let data = await fetch(`${url}/newsheading/${id}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewsHeading();
  }, []);
  return (
    <Box textAlign={"left"} p="4">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View News And Events Heading Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/newsheading/edit/${id}`)}
        >
          Edit
        </Button>
        {/* <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </Button> */}
      </Flex>

      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        News & Events Heading
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
        _readOnly
      >
        {product?.heading}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        News & Events Description
      </Text>
      <Textarea
        height="150px"
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.description}
        fontSize={"medium"}
      />
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {product?.createdAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(product.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Updated at
      </Text>
      {product?.modifiedAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(product.modifiedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
    </Box>
  );
};

export default ViewNewsHeading;
