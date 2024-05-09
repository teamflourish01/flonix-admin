import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

const Pages = () => {
  const [item, setItem] = useState([]);
  const [newsheading, setNewsheading] = useState([]);
  const [banner, setBanner] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    const getAboutus = async () => {
      try {
        const response = await fetch(`${url}/aboutus`);
        const data = await response.json();
        setItem(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getNewsHeading = async () => {
      try {
        let res = await fetch(`${url}/newsheading`);
        const data = await res.json();
        setNewsheading(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getHomeBanner = async () => {
      try {
        let res = await fetch(`${url}/homebanner`);
        const data = await res.json();
        setBanner(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAboutus();
    getNewsHeading();
    getHomeBanner();
  }, []);

  return (
    <Box p="4">
      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Page Name</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td> 1 </Td>
              <Td>About Page</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<ViewIcon />}
                    bgColor={"black"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    variant="solid"
                    color="#add8e6"
                    onClick={() => navigate("/admin/aboutus")}
                  >
                    View
                  </Button>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(
                        `/admin/aboutus/edit/${item.length > 0 && item[0]._id}`
                      )
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 2 </Td>
              <Td>News & Events Heading Section</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<ViewIcon />}
                    bgColor={"black"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    variant="solid"
                    color="#add8e6"
                    onClick={() =>
                      navigate(`/admin/newsheading/${newsheading[0]._id}`)
                    }
                  >
                    View
                  </Button>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(`/admin/newsheading/edit/${newsheading[0]._id}`)
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
            <Tr>
              <Td> 3 </Td>
              <Td>Home Banner</Td>
              <Td>
                <ButtonGroup>
                  <Button
                    leftIcon={<ViewIcon />}
                    bgColor={"black"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    variant="solid"
                    color="#add8e6"
                    onClick={() =>
                      navigate(`/admin/homebanner/${banner[0]._id}`)
                    }
                  >
                    View
                  </Button>
                  <Button
                    leftIcon={<BiEditAlt />}
                    border="1px solid #add8e6"
                    variant={"outline"}
                    _hover={{ bgColor: "#add8e6", color: "black" }}
                    onClick={() =>
                      navigate(`/admin/homebanner/edit/${banner[0]._id}`)
                    }
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </Box>
  );
};

export default Pages;
