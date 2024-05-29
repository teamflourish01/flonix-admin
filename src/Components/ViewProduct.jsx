import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const toast = useToast();
  const dataArray = Object.entries(product?.specification || {});
  const detailArray = Object.entries(product?.details || {});
  const performanceArray = Object.entries(product?.performance || {});
  const url = process.env.REACT_APP_DEV_URL;
  const handleDelete = () => {};

  const getProduct = async () => {
    try {
      let data = await fetch(`${url}/product/${id}`);
      data = await data.json();
      console.log(data.data, "single");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Box textAlign={"left"} p="4">
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Product Details
        </Text>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/product/edit/${id}`)}
        >
          Edit
        </Button>
        <Button
          borderRadius={"20px"}
          color={"#add8e6"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={() => handleDelete(id)}
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
        {product?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Category
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {product?.category?.name}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Description
      </Text>
      <Textarea
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        value={product?.description}
        fontSize={"medium"}
      />
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Key Features
      </Text>

      {product?.key_features?.map((e) => (
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
        Image
      </Text>
      <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
        {product?.image &&
          product?.image.map((e) => <Image src={`${url}/product/${e}`} />)}
      </SimpleGrid>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Image Alt Text
      </Text>

      {product?.image_alt?.map((e) => (
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
        Testing
      </Text>
      <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
        {product?.mark &&
          product?.mark.map((e, i) => {
            return (
              <>
                <Image src={`${url}/product/${e}`} />
                <br />
                <Box
                  padding="10px 20px"
                  width="50%"
                  bgColor={"#eef1f4"}
                  fontSize={"medium"}
                >
                  {product?.mark_text[i]}
                </Box>
              </>
            );
          })}
      </SimpleGrid>
      <br />
      {dataArray.length > 0 && (
        <>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Specification
          </Text>
          <Table w={"50%"} bgColor={"#eef1f4"}>
            <Thead>
              <Tr>
                <Th>Parameter</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataArray?.map(([parameter, value]) => (
                <Tr key={parameter}>
                  <Td>{parameter}</Td>
                  <Td>{value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}

      {detailArray.length > 0 && (
        <>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Product Details
          </Text>
          <Table w={"50%"} bgColor={"#eef1f4"}>
            <Thead>
              <Tr>
                <Th>Parameter</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {detailArray?.map(([parameter, value]) => (
                <Tr key={parameter}>
                  <Td>{parameter}</Td>
                  <Td>{value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
      {performanceArray.length > 0 && (
        <>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Performance Feature
          </Text>
          <Table w={"50%"} bgColor={"#eef1f4"}>
            <Thead>
              <Tr>
                <Th>Parameter</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {performanceArray?.map(([parameter, value]) => (
                <Tr key={parameter}>
                  <Td>{parameter}</Td>
                  <Td>{value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
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

export default ViewProduct;
