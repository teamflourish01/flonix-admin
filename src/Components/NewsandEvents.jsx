import { AddIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";

const NewsAndEvents = () => {
  const [category, setCategory] = useState([]);
  const [newsAndEvents, setNewsAndEvents] = useState([]);
  const [newsheading, setNewsheading] = useState([]);
  const [searchNewsAndEvnts, setSearchNewsAndEvents] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const url = process.env.REACT_APP_DEV_URL;

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFlag(false);
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFlag(true);
      setCount(newsAndEvents.length);
    }
    const filteredData = newsAndEvents.filter((item) =>
      item.cardheading.toLowerCase().includes(search.toLowerCase())
    );
    setSearchNewsAndEvents(filteredData);
    setCount(filteredData.length);
  };

  useEffect(() => {
    handleSearch();
  }, [search, newsAndEvents]);

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
        `${url}/newsandevent?page=${page}&limit=5&search=${search}`
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
      const res = await fetch(`${url}/newsandevent/${id}`, {
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
            onFocus={() => setFlag(false)}
            onBlur={() => {
              if (!search.trim()) {
                setFlag(true);
              }
            }}
            w="150px"
            onChange={handleSearchChange}
            value={search}
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
              <Th color={"#add8e6"}>Card Heading</Th>
              <Th color={"#add8e6"}>Date</Th>
              <Th color={"#add8e6"}>Place</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchNewsAndEvnts?.map((item, index) => {
              const serialNumber = (page - 1) * 5 + index + 1;
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
                  <Td> {serialNumber} </Td>
                  <Td>{item?.cardheading}</Td>
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

                      <DeleteBtn handleDelete={() => handleDelete(item._id)} />
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
