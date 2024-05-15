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

const ViewHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const url = process.env.REACT_APP_DEV_URL;

  const getHome = async () => {
    try {
      let data = await fetch(`${url}/home/${id}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHome();
  }, []);
  return (
    <Box textAlign={"left"} p="4">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Home Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/home/edit/${id}`)}
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
        Heading
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.banner_heading}
      </Box>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Banner Images
      </Text>
      <br />
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="50%">
        {product.banner_images &&
          product.banner_images.map((e, index) => (
            <Box key={index} marginRight="7px">
              <Image
                src={`${url}/home/${e}`}
                style={{
                  width: "200px",

                  margin: "5px",
                }}
              />
            </Box>
          ))}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        About Heading
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {product.about_heading}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        About Description
      </Text>
      <Textarea
        height="150px"
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.about_pera}
        fontSize={"medium"}
      />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        About Key-Feature
      </Text>
      {product?.about_points?.map((e) => (
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {e}
        </Text>
      ))}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        About Video
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {product?.about_video}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Top Products
      </Text>
      {product?.top_product?.map((e) => (
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {e}
        </Text>
      ))}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Trust-Factor Images
      </Text>
      <br />
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="50%">
        {product.trust_factor_images &&
          product.trust_factor_images.map((e, index) => (
            <Box key={index} marginRight="7px">
              <Image
                src={`${url}/home/${e}`}
                style={{
                  width: "200px",
                  margin: "5px",
                }}
              />
            </Box>
          ))}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Trust-fector Img Points
      </Text>
      {product?.trust_factor_text?.map((e) => (
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {e}
        </Text>
      ))}

      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Our Products
      </Text>
      {product?.our_products?.map((e) => (
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {e}
        </Text>
      ))}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Our Distrubutor Description
      </Text>
      <Textarea
        height="150px"
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.our_distributor_text}
        fontSize={"medium"}
      />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Our-Distrubutor Logo
      </Text>
      <br />
      <Box display="flex" flexDirection="row" flexWrap="wrap" width="50%">
        {product.our_distributor_logo &&
          product.our_distributor_logo.map((e, index) => (
            <Box key={index} marginRight="7px">
              <Image
                src={`${url}/home/${e}`}
                style={{
                  width: "200px",

                  margin: "5px",
                }}
              />
            </Box>
          ))}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Our Blogs
      </Text>
      {product?.our_blogs?.map((e) => (
        <Text
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {e}
        </Text>
      ))}
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

export default ViewHome;
