import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddTestimonials = () => {
  const [item, setItem] = useState({
    name: "",
    designation: "",
    text: "",
    image: "",
  });
  const [selectedImages, setSelectedImages] = useState("");
  const [ctimage, setctImage] = useState({});
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const handleInput = (e) => {
    let { name, value, file } = e.target;
    if (name === "image") {
      value = file;
    }
    setItem({ ...item, [name]: value });
  };

  const handleSingleImageChange = (e) => {
    let file = e.target.files[0];
    setctImage(file);
    // selected image Display
    const imageUrl = URL.createObjectURL(file);
    setSelectedImages(imageUrl);
  };
  const handleDeleteSingleImage = () => {
    setctImage({});
    setSelectedImages("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", item.name);
      formdata.append("designation", item.designation);
      formdata.append("text", item.text);
      formdata.append("image", ctimage);

      let res = await axios.post(`${url}/testimonials/add`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Certificate Add successfuly");
        Navigate("/admin/testimonials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box p="4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <center>
            <Box
              backgroundColor={"white"}
              w={["100%", "100%", "100%", "50%", "50%"]}
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              padding={"20px"}
              borderRadius={"20px"}
            >
              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="name" color={"#add8e6"}>
                  Name
                </FormLabel>
                <Input
                  variant="flushed"
                  id="name"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="name"
                  value={item.name}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="designation" color={"#add8e6"}>
                  Designation
                </FormLabel>
                <Input
                  variant="flushed"
                  id="designation"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="designation"
                  value={item.designation}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="text" color={"#add8e6"}>
                  Testimonials Description
                </FormLabel>
                <Textarea
                  id="text"
                  placeholder="Enter your Description"
                  mb={4}
                  name="text"
                  value={item.text}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="image" color={"#add8e6"}>
                  Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleSingleImageChange}
                  mb={4}
                />
              </FormControl>
              <FormControl>
                {selectedImages && (
                  <Flex alignItems="center" position="relative">
                    <img
                      src={selectedImages}
                      alt="selected img"
                      style={{
                        width: "200px",

                        margin: "5px",
                      }}
                    />
                    <Button
                      leftIcon={<DeleteIcon />}
                      bgColor={"red.400"}
                      position="absolute"
                      size="sm"
                      top={0}
                      marginLeft="160px"
                      zIndex={1}
                      _hover={{ bgColor: "red.500", color: "white" }}
                      color="white"
                      onClick={handleDeleteSingleImage}
                      borderRadius="50px"
                    ></Button>
                  </Flex>
                )}
              </FormControl>
            </Box>
          </center>
          <br />
          <center>
            <Button
              type="submit"
              variant={"solid"}
              bgColor={"gray"}
              color="add8e6"
              _hover={{
                color: "black",
                bgColor: "#add8e6",
                border: "1px solid #add8e6",
              }}
            >
              Add New
            </Button>
          </center>
        </form>
      </Box>
    </>
  );
};

export default AddTestimonials;
