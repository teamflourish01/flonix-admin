import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [image, setImage] = useState({});
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    let dup = { ...user };
    formData.append("dup", JSON.stringify(dup));
    console.log(Object.keys(image));
    if (Object.keys(image).length > 0) {
      formData.append("user", image);
    }
    try {
      let response = await axios.post(`${url}/user/add`, formData);
      
      let data = response.data;
      console.log("api res data",data);
      if (data.data) {
        localStorage.setItem("token", data.token);
        toast({
          title: "User Added",
          description: data.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });

        navigate("/");
      } else {
        toast({
          title: "User Not Added ",
          description: data.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p="4">
      <Flex justifyContent={"space-around"} gap="40px">
        <Box
          backgroundColor={"white"}
          w="700px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              variant="flushed"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              variant="flushed"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
        </Box>
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Profile</FormLabel>
            {dataUrl ? (
              <Image w="150px" h="150px" borderRadius={"50%"} src={dataUrl} />
            ) : (
              <Image
                w="150px"
                h="150px"
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
              />
            )}
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="user"
                onChange={(e) => handleFileChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note:</span>Upload Only
              200pxX200px photo and less than 500KB size
            </Text>
          </FormControl>
        </Box>
      </Flex>
      <br />
      <center>
        <Button
          variant={"solid"}
          bgColor={"#161616"}
          color="#add8e6"
          _hover={{
            color: "black",
            bgColor: "#add8e6",
            border: "1px solid #add8e6",
          }}
          leftIcon={isLoading && <Spinner color="blue.500" />}
          onClick={() => handleSubmit()}
          isDisabled={!user.name}
        >
          Add New{" "}
        </Button>
      </center>
    </Box>
  );
};

export default AddUser;
