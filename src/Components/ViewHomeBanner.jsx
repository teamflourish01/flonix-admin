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

const ViewHomeBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const url = process.env.REACT_APP_DEV_URL;
  

  const getHomebanner = async () => {
    try {
      let data = await fetch(`${url}/homebanner/${id}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomebanner();
  }, []);
  return (
    <Box textAlign={"left"} p="4">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Home Banner Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/homebanner/edit/${id}`)}
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
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Banner Lable
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bannerlable}
      </Box>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Banner Images
      </Text>
      <br />
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="50%">
        {product.bannerimages &&
          product.bannerimages.map((e, index) => (
            <Box key={index} marginRight="7px">
              <Image
                src={`http://localhost:8080/homebanner/${e}`}
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "5px",
                }}
              />
            </Box>
          ))}
      </Box>
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

export default ViewHomeBanner;
