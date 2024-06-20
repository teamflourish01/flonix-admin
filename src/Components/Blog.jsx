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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Blog = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const url = process.env.REACT_APP_DEV_URL;
  const [blog, setBlog] = useState([]);

  const getBlog = async () => {
    try {
      let data = await fetch(`${url}/blog`);
      data = await data.json();
      console.log(data.data);
      setBlog(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      let data = await fetch(`${url}/blog`);
      data = await data.json();
      setCount(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!search) {
        getBlog();
        getCount();
        setFlag(true);
      } else {
        let data = await fetch(`${url}/blog/search/${search}`);
        data = await data.json();
        setBlog(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/blog/delete/${id}`, {
        method: "DELETE",
      });
      data = await data.json();
      console.log(data);
      getBlog();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
    getCount();
  }, []);

  return (
    <Box p="4">
      <Flex gap={5} justifyContent={"space-between"}>
        <Flex gap={5}>
          <Button
            variant={"ghost"}
            bgColor={"black"}
            _hover={{ color: "black", bgColor: "#add8e6" }}
            color="#add8e6"
            border={"1px solid #cfcccc"}
            onClick={() => navigate("/admin/blogcategory")}
          >
            Blog Category
          </Button>
          <Button
            leftIcon={<AddIcon />}
            variant={"ghost"}
            bgColor={"black"}
            _hover={{ color: "black", bgColor: "#add8e6" }}
            color="#add8e6"
            border={"1px solid #cfcccc"}
            onClick={() => navigate("/admin/blog/add")}
          >
            Add New
          </Button>
        </Flex>
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
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption
            borderTop={"1px solid #161616"}
            bgColor={"#add8e6"}
            color={"black"}
          >
            There Are {count} Blogs
          </TableCaption>
          <Thead bgColor={"black"}>
            <Tr>
              <Th color={"#add8e6"}>#</Th>
              <Th color={"#add8e6"}>Name</Th>
              <Th color={"#add8e6"}>Category</Th>
              <Th color={"#add8e6"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {blog?.map((e, i) => {
              return (
                <Tr key={e._id}>
                  <Td> {i + 1} </Td>
                  <Td
                    style={{
                      whiteSpace: "normal",
                      width: "600px",
                      textAlign: "justify",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {e?.name}
                  </Td>
                  <Td>{e?.category?.name}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        leftIcon={<ViewIcon />}
                        bgColor={"black"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        variant="solid"
                        color="#add8e6"
                        onClick={() => navigate(`/admin/blog/${e?.slug}`)}
                      >
                        View
                      </Button>
                      <Button
                        leftIcon={<BiEditAlt />}
                        border="1px solid #add8e6"
                        variant={"outline"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        onClick={() => navigate(`/admin/blog/edit/${e?.slug}`)}
                      >
                        Edit
                      </Button>
                      <DeleteBtn handleDelete={() => handleDelete(e?.slug)} />
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

export default Blog;
