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

const ViewHomeBanefits = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const url = process.env.REACT_APP_DEV_URL;

  const getHomeBenefits = async () => {
    try {
      let data = await fetch(`${url}/robenefits/${id}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeBenefits();
  }, []);
  return (
    <Box textAlign={"left"} p="4" marginLeft="25px">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Home Benefits Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/robenefits/edit/${id}`)}
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
        Main Heading
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.main_heading}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Left Heading 1
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.left_heading1}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Left Text 1
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.left_text1}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Left Heading 2
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.left_heading2}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Left text 2
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.left_text2}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Right Heading 1
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.right_heading1}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Right text 1
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.right_text1}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Right Heading 2
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.right_heading2}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Right text 2
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.right_text2}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Heading 1
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_heading1}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Text 1
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_text1}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Heading 2
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_heading2}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Text 2
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_text2}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Heading 3
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_heading3}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Text 3
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_text3}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Heading 4
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_heading4}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Bottom Text 4
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {/* {product.length > 0 && product[0].bannerlable} */}
        {product.bottom_text4}
      </Box>
      <br />

      <Text fontWeight={"semibold"} fontSize={"xl"}>
        First Image
      </Text>
      <br />

      <Image
        src={`${url}/robenefits/${product?.first_image}`}
        style={{
          width: "200px",
          margin: "5px",
          marginLeft: "25px",
        }}
      />
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Seconed Image
      </Text>
      <br />

      <Image
        src={`${url}/robenefits/${product?.seconed_image}`}
        style={{
          width: "200px",
          margin: "5px",
          marginLeft: "25px",
        }}
      />
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

export default ViewHomeBanefits;
