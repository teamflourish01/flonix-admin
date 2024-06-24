import { ViewIcon } from "@chakra-ui/icons";
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
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import { useNavigate } from "react-router-dom";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Inquiry = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearch(query);
      setPage(1);
      console.log("Debauncing use ", query);
    }, 500),
    []
  );

  const handleSearchChange = async (e) => {
    debouncedSearch(e.target.value);
  };

  const getInquiry = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        `${url}/inquiry?page=${page}&limit=12&search=${search}`
      );
      const data = await res.json();
      setUser(data.data);
      setCount(data.count);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInquiry();
  }, [page, search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box p="4">
      <Flex justifyContent={"flex-end"} mr={5}>
        <Box>
          <span>Search:</span>
          <Input
            color={"black"}
            w="150px"
            onChange={handleSearchChange}
            // value={search}
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
          {loading ? (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Spinner color="blue.500" /> 
              </Td>
            </Tr>
          ) : (
            <Tbody>
              {user?.map((e, i) => {
                const sNumber = (page - 1) * 12 + i + 1;
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
          )}
        </Table>
      </TableContainer>

      <br />
      {search === "" && (
        <Flex justifyContent={"center"}>
          <Button
            border="1px solid #add8e6"
            bgColor={"black"}
            isDisabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <BsArrowLeft color="#add8e6" />
          </Button>
          <Button>{page}</Button>
          <Button
            variant={"outline"}
            border="1px solid #add8e6"
            bgColor={"black"}
            isDisabled={page >= count / 12}
            onClick={() => handlePageChange(page + 1)}
          >
            <BsArrowRight color="#add8e6" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Inquiry;
