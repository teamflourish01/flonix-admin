import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Contectdetails = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getContectDetails = async () => {
    try {
      let data = await fetch(`${url}/contect`);
      data = await data.json();
      console.log(data, "data");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContectDetails();
  }, []);
  return (
    <Box p="10">
      <br />
      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Email</Th>
              <Th color={"#add8e6"}>Office Address</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product?.map((e, i) => {
              return (
                <Tr key={e._id}>
                  <Td> {i + 1} </Td>
                  <Td>{e?.email}</Td>
                  <Td
                    style={{
                      width: "400px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {e?.officeaddress}
                  </Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<BiEditAlt />}
                        border="1px solid #add8e6"
                        variant={"outline"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        onClick={() =>
                          navigate(`/admin/contectdetails/edit/${e._id}`)
                        }
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </Box>
  );
};

export default Contectdetails;
