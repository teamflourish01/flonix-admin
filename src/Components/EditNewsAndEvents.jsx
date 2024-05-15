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

const UpdateNewsAndEvents = () => {
  const { Id } = useParams();
  const [item, setItem] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const fetchEventAndNewsById = async () => {
    try {
      const response = await fetch(`${url}/newsandevent/${Id}`);
      const data = await response.json();
      setItem(data.DataById);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEventAndNewsById();
  }, [Id]);

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
        `${url}/newsandevent/deleteimg/${Id}/${index}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        fetchEventAndNewsById();
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
      // formData.append("generalheading", item.generalheading);
      // formData.append("generaltext", item.generaltext);
      formData.append("cardheading", item.cardheading);
      formData.append("date", item.date);
      formData.append("place", item.place);
      formData.append("cardtext", item.cardtext);
      formData.append("detailheading", item.detailheading);
      formData.append("detailtext", item.detailtext);
      formData.append("video", item.video);
      for (let x of selectedImages) {
        formData.append("detailimages", x);
      }
      if (singleImg) {
        formData.append("cardimage", singleImg);
      }
      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/newsandevent/edit/${Id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("data Update Successfuly");
        Navigate("/admin/newsandevents/");
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
              {/* <FormControl mb={4} isRequired>
                <FormLabel htmlFor="generalheading" color={"#add8e6"}>
                  Heading
                </FormLabel>
                <Input
                  id="generalheading"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="generalheading"
                  value={item.generalheading}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="generaltext" color={"#add8e6"}>
                  Description
                </FormLabel>
                <Textarea
                  id="generaltext"
                  placeholder="Enter your message"
                  mb={4}
                  name="generaltext"
                  value={item.generaltext}
                  onChange={handleInput}
                />
              </FormControl> */}

              <FormControl>
                <FormLabel htmlFor="cardimage" color={"#add8e6"}>
                  Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="cardimage"
                  type="file"
                  name="cardimage"
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
                        height: "150px",
                        margin: "5px",
                        // marginLeft: "150px",
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
              {!selctSinImg && item.cardimage && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/newsAndevents/${item.cardimage}`}
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
                <FormLabel htmlFor="cardheading" color={"#add8e6"}>
                  Card Heading
                </FormLabel>
                <Input
                  variant="flushed"
                  id="cardheading"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="cardheading"
                  value={item.cardheading}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="cardtext" color={"#add8e6"}>
                  Card Description
                </FormLabel>
                <Textarea
                  id="cardtext"
                  placeholder="Enter your Description"
                  mb={4}
                  name="cardtext"
                  value={item.cardtext}
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
                <FormLabel htmlFor="date" color={"#add8e6"}>
                  Date
                </FormLabel>
                <Input
                  variant="flushed"
                  id="date"
                  type="date"
                  name="date"
                  mb={4}
                  value={item.date}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="place" color={"#add8e6"}>
                  Place
                </FormLabel>
                <Input
                  id="place"
                  type="text"
                  placeholder="Enter your place"
                  variant="flushed"
                  mb={4}
                  name="place"
                  value={item.place}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="detailtext" color={"#add8e6"}>
                  Detail Description
                </FormLabel>
                <Textarea
                  id="detailtext"
                  placeholder="Enter your Description"
                  mb={4}
                  name="detailtext"
                  value={item.detailtext}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="detailheading" color={"#add8e6"}>
                  Detail Heading
                </FormLabel>
                <Input
                  variant="flushed"
                  id="detailheading"
                  type="text"
                  // placeholder="Enter your Heading"
                  mb={4}
                  name="detailheading"
                  value={item.detailheading}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="video" color={"#add8e6"}>
                  Video
                </FormLabel>
                <Input
                  variant="flushed"
                  id="video"
                  type="text"
                  // placeholder="Enter your video Link"
                  mb={4}
                  name="video"
                  value={item.video}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="detailimages" color={"#add8e6"}>
                  Activity Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="detailimages"
                  type="file"
                  name="detailimages"
                  accept="image/*"
                  onChange={handleMultipleImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {item.detailimages &&
                    item.detailimages.map((image, index) => (
                      <Flex key={index} alignItems="center" position="relative">
                        <img
                          key={index}
                          src={`${url}/newsAndevents/${image}`}
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
                          width: "100px",
                          height: "100px",
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
              bgColor={"#161616"}
              color="white"
              _hover={{
                color: "black",
                bgColor: "white",
                border: "1px solid #161616",
              }}
              type="submit"
            >
              Save
            </Button>
          </form>
        </center>
      </Box>
    </>
  );
};

export default UpdateNewsAndEvents;
