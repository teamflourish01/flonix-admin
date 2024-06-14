import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState({});
  const [singleImg, setSingleImg] = useState("");
  const [selectSingImg, setSelectSingImg] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

  const getData = async () => {
    try {
      let data = await fetch(`${url}/user/${id}`);
      data = await data.json();
      setUserData(data.data);
      reset(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (singleImg) {
        formData.append("image", singleImg);
      }
      const response = await axios.put(`${url}/user/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Data Update Successfully",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/user");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast({
        title: "Data Not Updated",
        description: error.response?.data.msg || "An error occurred",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleUpdatePswd = async (data) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);
      const response = await axios.put(`${url}/user/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Password Update Successfully",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error("Password Update failed", error);
      toast({
        title: "Password Not Updated",
        description: error.response?.data.msg || "An error occurred",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setSingleImg(file);
    const imageUrl = URL.createObjectURL(file);
    setSelectSingImg(imageUrl);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Flex justifyContent={"center"} p="4">
      <Box
        w={["100%", "75%", "50%", "40%", "40%"]}
        borderRadius={"20px"}
        mt={"5%"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        padding={"10px"}
      >
        <form onSubmit={handleSubmit(handleUpdate)}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              required
              w={["xs", "xs", "xs", "sm", "sm"]}
              type="text"
              name="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <Text color="red">{errors.name.message}</Text>}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              required
              w={["xs", "xs", "xs", "sm", "sm"]}
              type="email"
              name="email"
              {...register("email")}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address (e.g., user@example.com)"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup ml="85px" w={["xs", "xs", "xs", "sm", "sm"]}>
              <Input
                required
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password")}
              />
              <InputRightElement>
                <IconButton
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  bg="gray.200"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* <Text
              textAlign={"end"}
              _hover={{ cursor: "pointer" }}
              color={"blue.500"}
              fontSize={"large"}
              onClick={onOpen}
            >
              Change Password
            </Text>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Text>Leave It For No Change</Text>
                    <InputGroup size="md">
                      <Input
                        required
                        w={["xs", "xs", "xs", "sm", "sm"]}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        {...register("password")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                          mr="20px"
                          bg="gray.200"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={handleSubmit(handleUpdatePswd)}
                  >
                    Save
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal> */}
          <br />
          <FormLabel>Profile Pic</FormLabel>
          <Box w="150px" border={"1px dashed gray"}>
            {selectSingImg ? (
              <Image w="150px" height={"150px"} src={selectSingImg} />
            ) : userData.image ===
              "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" ? (
              <Image w="150px" height={"150px"} src={userData.image} />
            ) : !userData.image ? (
              <Image
                w="150px"
                height={"150px"}
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
              />
            ) : (
              <Image
                w="150px"
                height={"150px"}
                src={`${url}/user/` + userData.image}
              />
            )}
          </Box>
          <br />
          <Box>
            <input
              type="file"
              name="image"
              id="filepicker"
              onChange={handleFileChange}
            />
          </Box>
          <Text>
            <span style={{ fontWeight: "bold" }}>Note:</span>Upload Only
            200pxX200px photo and less than 500KB size
          </Text>
          <br />
          <Button type="submit">Save</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default EditUser;
