import { AddIcon, ViewIcon } from "@chakra-ui/icons";
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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import DeleteBtn from "./DeleteBtn";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [flag, setFlag] = useState(true);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [network, setNetwork] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();

  //                                                 get data
  const getText = async () => {
    try {
      let data = await fetch(`${url}/contact`);
      data = await data.json();
      console.log(data.data[0]);
      setText(data?.data[0]?.text);
      setId(data?.data[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getOutlet = async () => {
    try {
      let data = await fetch(`${url}/outlet?page=${page}`);
      data = await data.json();
      setNetwork(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      let data = await fetch(`${url}/outlet`);
      data = await data.json();
      setCount(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  //                                             handler functions
  const handleSearch = async () => {
    try {
      if (!search) {
        getOutlet();
        getCount();
        setFlag(true);
        return;
      }
      let data = await fetch(`${url}/outlet/search/${search}`);
      data = await data.json();
      console.log(data);
      setNetwork(data.data);
      setCount(data.data.length)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/outlet/delete/${id}`, {
        method: "DELETE",
      });
      data = await data.json();
      getOutlet();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //                                                  update data

  const updateText = async () => {
    try {
      let data = await fetch(`${url}/contact/edit/${id}`, {
        method: "POST",
        body: JSON.stringify({ text: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      console.log(data);
      toast({
        title: "Contact Content Updated Successfully",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Invalid Response",
        description: error.message,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getText();
    getOutlet();
    getCount();
  }, [page]);
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
          onClick={() => navigate("/admin/outlet/add")}
        >
          Add New
        </Button>
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
        {/* <Button border={"1px solid #cfcccc"} rightIcon={<DeleteIcon/>}>
            Bulk Delete
        </Button> */}
      </Flex>
      <br />
      <FormControl>
        <FormLabel>Content</FormLabel>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          mt={"10px"}
          variant={"ghost"}
          bgColor={"black"}
          _hover={{ color: "black", bgColor: "#add8e6" }}
          color="#add8e6"
          border={"1px solid #cfcccc"}
          onClick={updateText}
        >
          Submit Content
        </Button>
      </FormControl>

      <br />
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption
            borderTop={"1px solid #161616"}
            bgColor={"#add8e6"}
            color={"black"}
          >
            There Are {count} Contact
          </TableCaption>
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Name</Th>
              <Th color={"#add8e6"}>Mobile</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {network?.map((e, i) => {
              return (
                <Tr key={e._id}>
                  <Td> {i + 1} </Td>
                  <Td>{e?.name}</Td>
                  <Td>{e?.mobile}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<ViewIcon />}
                        bgColor={"black"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        variant="solid"
                        color="#add8e6"
                        onClick={() => navigate(`/admin/outlet/${e._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        leftIcon={<BiEditAlt />}
                        border="1px solid #add8e6"
                        variant={"outline"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        onClick={() => navigate(`/admin/outlet/edit/${e._id}`)}
                      >
                        Edit
                      </Button>
                      <DeleteBtn handleDelete={() => handleDelete(e._id)} />
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
          </div>
        )}
      </Flex>
    </Box>
  );
};

export default Contact;
