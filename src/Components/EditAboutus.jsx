import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";

const EditAboutus = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getAboutusById = async () => {
    try {
      const response = await fetch(`${url}/aboutus/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAboutusById();
  }, [id]);

  // edit logic
  const handleSingleImage = (e) => {
    let file = e.target.files[0];
    setSingleImg(file);

    // Display selected Img
    const imageUrl = URL.createObjectURL(file);
    setselectSingImg(imageUrl);
  };
  const handleDeleteSingleImage = () => {
    setSingleImg("");
    setselectSingImg("");
  };

  const handleMultipleImage = (e) => {
    const file = e.target.files[0];
    setSelectedImages([...selectedImages, file]);
  };
  const handleDeleteMultipleImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  const handleDBImgdelete = async (index) => {
    try {
      const response = await fetch(
        `${url}/aboutus/deleteimg/${id}/${index}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        getAboutusById();
      }
    } catch (error) {
      console.log("Error Deleting Multiple Img From DB", error);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("heading", item.heading);
      formData.append("description", item.description);
      formData.append("bannerheading", item.bannerheading);
      formData.append("bannerdescription", item.bannerdescription);
      formData.append("mission", item.mission);
      formData.append("vision", item.vision);
      formData.append("goals", item.goals);

      for (let x of selectedImages) {
        formData.append("logoimages", x);
      }
      if (singleImg) {
        formData.append("banner", singleImg);
      }
      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/aboutus/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("data Update Successfuly");
        Navigate("/admin/aboutus/");
      } else {
        throw new Error("Faild to update Data");
      }
    } catch (error) {
      console.error("Update faild", error);
    }
  };

  return (
    <>
      <Box p="4">
        <Flex
          justifyContent={"space-around"}
          gap="40px"
          flexDirection={["column", "column", "column", "row", "row"]}
        >
          <Box
            backgroundColor={"#white"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="generalheading" color={"#add8e6"}>
                  Heading
                </FormLabel>
                <Input
                  id="heading"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="heading"
                  value={item.heading}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description" color={"#add8e6"}>
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter your message"
                  mb={4}
                  name="description"
                  value={item.description}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="banner" color={"#add8e6"}>
                  Banner Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="banner"
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleSingleImage}
                  mb={4}
                />
              </FormControl>
              <FormControl>
                {selctSinImg && (
                  <Flex alignItems="center" position="relative">
                    <img
                      src={selctSinImg}
                      alt="selected img"
                      style={{
                        width: "200px",
                        marginBottom: "10px",
                        margin: "5px",
                      }}
                    />
                    <Button
                      leftIcon={<DeleteIcon />}
                      bgColor={"red.400"}
                      position="absolute"
                      size="sm"
                      top={0}
                      left="180px"
                      zIndex={1}
                      _hover={{ bgColor: "red.500", color: "white" }}
                      color="white"
                      onClick={handleDeleteSingleImage}
                    ></Button>
                  </Flex>
                )}
              </FormControl>
              {!selctSinImg && item.banner && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`http://localhost:8080/aboutus/${item.banner}`}
                      alt="selected img"
                      style={{
                        width: "200px",
                        
                        margin: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </Flex>
                </FormControl>
              )}
              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="bannerheading" color={"#add8e6"}>
                  Banner Heading
                </FormLabel>
                <Input
                  variant="flushed"
                  id="bannerheading"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="bannerheading"
                  value={item.bannerheading}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="bannerdescription" color={"#add8e6"}>
                  Banner Description
                </FormLabel>
                <Textarea
                  id="bannerdescription"
                  placeholder="Enter your Description"
                  mb={4}
                  name="bannerdescription"
                  value={item.bannerdescription}
                  onChange={handleInput}
                />
              </FormControl>
            </form>
          </Box>
          <Box
            backgroundColor={"#white"}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl isRequired>
                <FormLabel htmlFor="mission" color={"#add8e6"}>
                  Mission
                </FormLabel>
                <Textarea
                  id="mission"
                  placeholder="Enter your Description"
                  mb={4}
                  name="mission"
                  value={item.mission}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="vision" color={"#add8e6"}>
                  vision
                </FormLabel>
                <Textarea
                  id="vision"
                  placeholder="Enter your Description"
                  mb={4}
                  name="vision"
                  value={item.vision}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="goals" color={"#add8e6"}>
                  Goals
                </FormLabel>
                <Textarea
                  id="goals"
                  placeholder="Enter your Description"
                  mb={4}
                  name="goals"
                  value={item.goals}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="detailimages" color={"#add8e6"}>
                  Logo Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="logoimages"
                  type="file"
                  name="logoimages"
                  accept="image/*"
                  onChange={handleMultipleImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {item.logoimages &&
                    item.logoimages.map((image, index) => (
                      <Flex key={index} alignItems="center" position="relative">
                        <img
                          key={index}
                          src={`http://localhost:8080/aboutus/${image}`}
                          alt={`Image ${index}`}
                          style={{
                            width: "200px",
                           
                            objectFit: "cover",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                        />
                        <Button
                          leftIcon={<DeleteIcon />}
                          bgColor={"red.400"}
                          position="absolute"
                          size="sm"
                          top={0}
                          right={0}
                          zIndex={1}
                          _hover={{ bgColor: "red.500", color: "white" }}
                          color="white"
                          onClick={() => handleDBImgdelete(index)}
                        ></Button>
                      </Flex>
                    ))}

                  {selectedImages.map((image, index) => (
                    <Flex key={index} alignItems="center" position="relative">
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`selected image ${index}`}
                        style={{
                          width: "200px",
                          
                          objectFit: "cover",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <Button
                        leftIcon={<DeleteIcon />}
                        bgColor={"red.400"}
                        position="absolute"
                        size="sm"
                        top={0}
                        right={0}
                        zIndex={1}
                        _hover={{ bgColor: "red.500", color: "white" }}
                        color="white"
                        onClick={() => handleDeleteMultipleImage(index)}
                      ></Button>
                    </Flex>
                  ))}
                </Flex>
              </FormControl>
            </form>
          </Box>
        </Flex>
        <br />
        <center>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Button
              variant={"solid"}
              bgColor={"gray"}
              color="add8e6"
              _hover={{
                color: "black",
                bgColor: "#add8e6",
                border: "1px solid #add8e6",
              }}
              type="submit"
            >
              Edit All Items
            </Button>
          </form>
        </center>
      </Box>
    </>
  );
};

export default EditAboutus;
