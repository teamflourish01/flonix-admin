import { AddIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); //
  const [count, setCount] = useState(0);
  const url = process.env.REACT_APP_DEV_URL;

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const getCategory = async () => {
    try {
      let res = await fetch(`${url}/category`);
      res = await res.json();
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewsAndEvents = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        `${url}/newsandevent?page=${page}&limit=12&search=${search}`
      );
      const data = await res.json();
      setNewsAndEvents(data.data);
      setCount(data.count);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getNewsAndEvents();
  }, [page, search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (slug) => {
    try {
      await fetch(`${url}/newsandevent/${slug}`, {
        method: "DELETE",
      });

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
            w="150px"
            onChange={handleSearchChange}
            value={search}
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
          {loading ? (
            <Tr>
              <Td colSpan={5} textAlign="center">
                <Spinner color="blue.500" />
              </Td>
            </Tr>
          ) : (
            <Tbody>
              {newsAndEvents?.map((item, index) => {
                const serialNumber = (page - 1) * 12 + index + 1;
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
                    <Td
                      style={{
                        whiteSpace: "normal",
                        width: "500px",
                        textAlign: "justify",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      {item?.cardheading}
                    </Td>
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
                            navigate(`/admin/newsandevents/${item?.slug}`)
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
                            navigate(`/admin/newsandevents/edit/${item?.slug}`)
                          }
                        >
                          Edit
                        </Button>
                        <DeleteBtn
                          handleDelete={() => handleDelete(item?.slug)}
                        />
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

export default NewsAndEvents;
