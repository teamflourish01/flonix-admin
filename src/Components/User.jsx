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
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const User = () => {
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      let data = await fetch(`${url}/user/delete/${id}`, {
        method: "DELETE",
      });
      data = await data.json();
      console.log(data);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!search) {
        getUser();
        getCount();
        setFlag(true);
        return;
      }
      let data = await fetch(`${url}/user/search/${search}`);
      data = await data.json();
      setUser(data.data);
      setCount(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const getCount = async () => {
    try {
      let data = await fetch(`${url}/user`);
      data = await data.json();
      setCount(data.data.length);
      console.log("Total User Data", count);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      let data = await fetch(`${url}/user?page=${page}`);
      data = await data.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
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
          onClick={() => navigate("/admin/user/add")}
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
      <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
        <Table variant="simple">
          <TableCaption
            borderTop={"1px solid #161616"}
            bgColor={"#add8e6"}
            color={"black"}
          >
            There Are {count} Product
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
              return (
                <Tr key={e._id}>
                  <Td> {i + 1} </Td>
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
                        onClick={() => navigate(`/admin/user/${e?._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        leftIcon={<BiEditAlt />}
                        border="1px solid #add8e6"
                        variant={"outline"}
                        _hover={{ bgColor: "#add8e6", color: "black" }}
                        onClick={() => navigate(`/admin/user/edit/${e?._id}`)}
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

export default User;
