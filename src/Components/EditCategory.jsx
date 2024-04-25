import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { categoryid } = useParams();
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  let url = process.env.REACT_APP_DEV_URL;
  const handleChange = (e) => {
    let { value, name } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const getData = async () => {
    try {
      let data = await fetch(`${url}/category/${categoryid}`);
      data = await data.json();
      console.log(data.data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async () => {
    try {
      let data = await fetch(`${url}/category/edit/${categoryid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      data = await data.json();
      if(data.data){
        
        toast({
          title: "Category Updated",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }else{
        toast({
          title: "Invalid Response",
          description: data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
      navigate("/admin/category");
      // console.log(data.data);
    } catch (error) {
      // console.log(error);
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

  useLayoutEffect(() => {
    getData();
  }, []);
  return (
    <Box p="4">
      <center>
        <Box
          width={"50%"}
          padding="20px"
          border={"1px solid #add8e6"}
          borderRadius={"20px"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
          }
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={category.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <Button
            bgColor={"black"}
            color="#add8e6"
            _hover={{ bgColor: "#add8e6", color: "black" }}
            onClick={editData}
          >
            Edit Item
          </Button>
        </Box>
      </center>
    </Box>
  );
};

export default EditCategory;
