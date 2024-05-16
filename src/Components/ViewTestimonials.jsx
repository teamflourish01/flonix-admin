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

const ViewTestimonials = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const url = process.env.REACT_APP_DEV_URL;
  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/testimonials/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Data Delete Successfuly");
      navigate("/admin/certificate");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTestimonials = async () => {
    try {
      let data = await fetch(`${url}/testimonials/${id}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);
  return (
    <Box textAlign={"left"} p="4" marginLeft="20px">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Testimonials Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/testimonials/edit/${id}`)}
        >
          Edit
        </Button>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </Button>
      </Flex>
      <br />
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
        {product?.name}
      </Box>
      <br />

      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Designation
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {product?.designation}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Testimonials Description
      </Text>
      <Textarea
        height="150px"
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.text}
        fontSize={"medium"}
      />
      <br />
      <br />

      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Image
      </Text>
      <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
        <Image
          src={`${url}/testimonials/${product.image}`}
          style={{
            width: "300px",
            margin: "5px",
            marginLeft: "25px",
          }}
        />
      </SimpleGrid>
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

export default ViewTestimonials;
