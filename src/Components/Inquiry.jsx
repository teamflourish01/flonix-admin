import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Inquiry = () => {
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (!search) {
        await getInquiry();
        await getCount();
        setFlag(true);
        return;
      }
      let data = await fetch(`${url}/inquiry?search=${search}`);
      data = await data.json();
      setUser(data.data);
      setCount(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getCount = async () => {
    try {
      let data = await fetch(`${url}/inquiry`);
      data = await data.json();
      setCount(data.data.length);
      // console.log("Total User Data", count);
    } catch (error) {
      console.log(error);
    }
  };
  const getInquiry = async () => {
    try {
      let data = await fetch(`${url}/inquiry?page=${page}`);
      data = await data.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInquiry();
    getCount();
  }, [page]);
  return (
    <Box p="4">
      <Flex justifyContent={"flex-end"} mr={5}>
        <Box>
          <span>Search:</span>
          <Input
            color={"black"}
            onBlur={() => setFlag(true)}
            w="150px"
            onChange={(e) => {
              setSearch(e.target.value);
              setFlag(false);
            }}
            value={search}
            onKeyUp={handleSearch}
          />
        </Box>
      </Flex>
      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption
            borderTop={"1px solid #161616"}
            bgColor={"#add8e6"}
            color={"black"}
          >
            There Are {count} Inquiry
          </TableCaption>
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Name</Th>
              <Th color={"#add8e6"}>Email</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user?.map((e, i) => {
              const sNumber = (page-1) * 12 + i + 1;
              return (
                <Tr key={e._id}>
                  <Td> {sNumber} </Td>
                  <Td>{e?.name}</Td>
                  <Td>{e?.email}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<ViewIcon />}
                        bgColor={"black"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        variant="solid"
                        color="#add8e6"
                        onClick={() => navigate(`/admin/inquiry/${e?._id}`)}
                      >
                        View
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
      {search === "" && (
        <Flex justifyContent={"center"}>
          <Button
            border="1px solid #add8e6"
            bgColor={"black"}
            isDisabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <BsArrowLeft color="#add8e6" />
          </Button>
          <Button>{page}</Button>
          <Button
            variant={"outline"}
            border="1px solid #add8e6"
            bgColor={"black"}
            isDisabled={page >= count / 12}
            onClick={() => setPage(page + 1)}
          >
            <BsArrowRight color="#add8e6" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Inquiry;
