import { AddIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
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
import { BiEditAlt } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NewsAndEvents = () => {
  const [category, setCategory] = useState([]);
  const [newsAndEvents, setNewsAndEvents] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;
  const handleSearch = () => {};

  const getCategory = async () => {
    try {
      // console.log(url);
      let res = await fetch(`${url}/category`);
      res = await res.json();
      console.log(res);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getNewsAndEvents = async (page) => {
    try {
      let res = await fetch(
        `http://localhost:8080/newsandevent?page=${page}&limit=5`
      );
      const data = await res.json();

      setNewsAndEvents(data.data);
      setTotalPages(Math.ceil(data.count / 5));
      setCount(data.count);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
    getNewsAndEvents(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/newsandevent/${id}`, {
        method: "DELETE",
      });
      alert("Data Delete Successfuly");
      getNewsAndEvents();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p="4">
      <Flex gap={5} justifyContent={"space-between"}>
        <Button
          leftIcon={<AddIcon />}
          variant={"ghost"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          color="#add8e6"
          border={"1px solid #cfcccc"}
          onClick={() => navigate("/admin/newsandevents/add")}
        >
          Add New
        </Button>
        <Box>
          <span>Search:</span>
          <Input
            color={"black"}
            onBlur={() => setFlag(true)}
            w="150px"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyUp={handleSearch}
          />
        </Box>
        {/* <Button border={"1px solid #cfcccc"} rightIcon={<DeleteIcon />}>
          Bulk Delete
        </Button> */}
      </Flex>
      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption
            borderTop={"1px solid #161616"}
            bgColor={"#add8e6"}
            color={"black"}
          >
            There Are Total {count} Items
          </TableCaption>
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Heading</Th>
              <Th color={"#add8e6"}>Description</Th>
              <Th color={"#add8e6"}>Date</Th>
              <Th color={"#add8e6"}>Place</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsAndEvents?.map((item, index) => {
              const formattedDate = new Date(item.date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              );
              return (
                <Tr key={item._id}>
                  <Td> {(page - 1) * 5 + index + 1} </Td>
                  <Td>{item?.generalheading}</Td>
                  <Td>{item?.generaltext}</Td>
                  <Td>{formattedDate}</Td>
                  <Td>{item?.place}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<ViewIcon />}
                        bgColor={"black"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        variant="solid"
                        color="#add8e6"
                        onClick={() =>
                          navigate(`/admin/newsandevents/${item._id}`)
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
                          navigate(`/admin/newsandevents/edit/${item._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        leftIcon={<DeleteIcon />}
                        bgColor={"red.400"}
                        _hover={{ bgColor: "red.500", color: "white" }}
                        color="white"
                        onClick={() => handleDelete(item._id)}
                      ></Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      <Flex justifyContent={"center"}>
        {flag && (
          <div>
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
              isDisabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              <BsArrowRight color="#add8e6" />
            </Button>
          </div>
        )}
      </Flex>
    </Box>
  );
};

export default NewsAndEvents;
