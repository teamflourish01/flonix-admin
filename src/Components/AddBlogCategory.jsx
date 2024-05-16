import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlogCategory = () => {
  let url = process.env.REACT_APP_DEV_URL;
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSave = async() => {
    try {
        let data = await fetch(`${url}/blogcategory/add`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
      });
      data = await data.json();
      console.log(data);
      if(data.data){
        toast({
          title: "Category Added",
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
        navigate("/admin/blogcategory");
      } catch (error) {
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
  return (
    <Box p="4">
      <Flex justifyContent={"center"}>
        <Box
          border={"1px solid #add8e6"}
          width={["100%", "80%", "60%", "50%"]}
          padding={"20px"}
          borderRadius="20px"
        >
          <FormControl isRequired>
            <FormLabel color={"#add8e6"} m={"0"}>
              Name
            </FormLabel>
            <Input
              type="text"
              color={"black"}
              borderColor={"#add8e6"}
              value={category.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <ButtonGroup gap="40px">
            <Button
              variant={"solid"}
              bgColor={"#161616"}
              color="#add8e6"
              _hover={{
                color: "black",
                bgColor: "#add8e6",
                border: "1px solid #add8e6",
              }}
              onClick={handleSave}
              isDisabled={!category.name}
            >
              Save
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddBlogCategory;
