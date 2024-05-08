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
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddNewsHeading = () => {
  const [certificate, setCertificate] = useState({
    image: "",
    imgdescription: "",
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
    setCertificate({ ...certificate, [name]: value });
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
      formdata.append("imgdescription", certificate.imgdescription);
      formdata.append("image", ctimage);

      let res = await axios.post(
        `${url}/certificate/add`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        alert("Certificate Add successfuly");
        Navigate("/admin/certificate");
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
              <FormControl>
                <FormLabel htmlFor="image" color={"#add8e6"}>
                  Certificate Image
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
                        width: "150px",
                        height: "100px",
                        margin: "5px",
                      }}
                    />
                    <Button
                      colorScheme="red"
                      size="sm"
                      position="absolute"
                      top={0}
                      left={130}
                      zIndex={1}
                      onClick={handleDeleteSingleImage}
                      borderRadius="50px"
                    >
                      <CloseIcon />
                    </Button>
                  </Flex>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="imgdescription" color={"#add8e6"}>
                  Certificate Description
                </FormLabel>
                <Textarea
                  id="imgdescription"
                  placeholder="Enter your Description"
                  mb={4}
                  name="imgdescription"
                  value={certificate.imgdescription}
                  onChange={handleInput}
                />
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
              Add New Certificate
            </Button>
          </center>
        </form>
      </Box>
    </>
  );
};

export default AddNewsHeading;
