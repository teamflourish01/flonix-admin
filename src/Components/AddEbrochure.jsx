import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddEbrochure = () => {
  const [item, setItem] = useState({
    filename: "",
    doc: "",
  });
  const [selectedImages, setSelectedImages] = useState("");
  const [ctimage, setctImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const handleInput = (e) => {
    let { name, value, file } = e.target;
    if (name === "doc") {
      value = file;
    }
    setItem({ ...item, [name]: value });
  };

  const handleSingleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setctImage(file);
      // selected image Display
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages(imageUrl);
    } else {
      setctImage({});
      setSelectedImages("");
    }
  };
  const handleDeleteSingleImage = () => {
    setctImage({});
    setSelectedImages("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("filename", item.filename);
      formdata.append("doc", ctimage);

      let res = await axios.post(`${url}/ebrochure/add`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast({
          title: "Data Added Successfuly",
          description: res.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/ebrochure");
      } else {
        toast({
          title: "Data Not Added ",
          description: res.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
                  File Name
                </FormLabel>
                <Input
                  variant="flushed"
                  id="filename"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="filename"
                  value={item.filename}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="doc" color={"#add8e6"}>
                  Document
                </FormLabel>
                <Input
                  variant="flushed"
                  id="doc"
                  type="file"
                  name="doc"
                  accept="application/pdf"
                  onChange={handleSingleImageChange}
                  mb={4}
                />
              </FormControl>
            </Box>
          </center>
          <br />
          <center>
            <Button
              type="submit"
              variant={"solid"}
              bgColor={"black"}
              color="#add8e6"
              _hover={{
                color: "black",
                bgColor: "#add8e6",
                border: "1px solid #add8e6",
              }}
              isLoading={isLoading}
              spinner={<Spinner color="blue.500" />}
            >
              Add New
            </Button>
          </center>
        </form>
      </Box>
    </>
  );
};

export default AddEbrochure;
