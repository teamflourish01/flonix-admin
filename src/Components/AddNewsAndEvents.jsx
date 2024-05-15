import React, { useState } from "react";
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
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddFormNewsandEvents = () => {
  const [eventdata, setEventdata] = useState({
    // generalheading: "",
    // generaltext: "",
    cardimage: "",
    cardheading: "",
    date: "",
    place: "",
    cardtext: "",
    detailheading: "",
    detailtext: "",
    video: "",
    detailimages: [],
  });
  const [selectedImages, setSelectedImages] = useState("");
  const [image, setImage] = useState({});
  const [varImage, setVarImage] = useState([]);
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const formData = new FormData();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setEventdata({ ...eventdata, [name]: value });
  };

  const handleSingleImageChange = (e) => {
    let file = e.target.files[0];
    setImage(file);
    // selected image Display
    const imageUrl = URL.createObjectURL(file);
    setSelectedImages(imageUrl);
  };
  const handleDeleteSingleImage = () => {
    setImage({});
    setSelectedImages("");
  };
  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    setVarImage([...varImage, file]);
  };
  const handleDeleteMultipleImage = (index) => {
    const updatedImages = [...varImage];
    updatedImages.splice(index, 1);
    setVarImage(updatedImages);
  };

  const submitSingle = async () => {
    console.log("image", image);
    formData.append("cardimage", image);
    try {
      let data = await axios.post(
        `${url}/newsandevent/add/singleimage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data, "single");
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const submitMultiple = async () => {
    console.log("varImage", varImage);
    let formData = new FormData();
    for (let x of varImage) {
      formData.append("detailimages", x);
    }
    try {
      let data = await axios.post(
        `${url}/newsandevent/add/multipleimages`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(data.data, "multi");
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (imageArr, varArr) => {
    console.log(imageArr, varArr);
    let dup = { ...eventdata };
    if (imageArr) {
      dup.cardimage = imageArr;
    }
    if (varArr?.length) {
      dup.detailimages = varArr;
    }

    try {
      let data = await fetch(`${url}/newsandevent/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      alert("News & Event Is Add Successfuly");
      setEventdata({
        // generalheading: "",
        // generaltext: "",
        cardimage: "",
        cardheading: "",
        date: "",
        place: "",
        cardtext: "",
        detailheading: "",
        detailtext: "",
        video: "",
        detailimages: "",
      });
      setSelectedImages("");
      setVarImage([]);
      Navigate("/admin/newsandevents/");
    } catch (error) {
      console.log(error);
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
            backgroundColor={"white"}
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
                  value={eventdata.generalheading}
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
                  value={eventdata.generaltext}
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
                  value={eventdata.cardheading}
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
                  value={eventdata.cardtext}
                  onChange={handleInput}
                />
              </FormControl>
            </form>
          </Box>
          <Box
            backgroundColor={"white"}
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
                  value={eventdata.date}
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
                  value={eventdata.place}
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
                  value={eventdata.detailtext}
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
                  value={eventdata.detailheading}
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
                  value={eventdata.video}
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
                  onChange={handleImagesChange}
                  mb={4}
                  multiple
                />
              </FormControl>
              {/* Display selected images for multiple upload */}
              <Flex wrap="wrap">
                {varImage.map((image, index) => (
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
                      colorScheme="red"
                      size="sm"
                      position="absolute"
                      top={0}
                      right={0}
                      zIndex={1}
                      onClick={() => handleDeleteMultipleImage(index)}
                    >
                      <CloseIcon />
                    </Button>
                  </Flex>
                ))}
              </Flex>
            </form>
          </Box>
        </Flex>
        <br />
        <center>
          <Button
            variant={"solid"}
            bgColor={"black"}
            color="#add8e6"
            _hover={{
              color: "black",
              bgColor: "#add8e6",
              border: "1px solid #add8e6",
            }}
            onClick={() => {
              Promise.all([submitSingle(), submitMultiple()])
                .then((res) => handleSubmit(res[0], res[1]))
                .catch((err) => console.log(err));
            }}
          >
            Add New
          </Button>
        </center>
      </Box>
    </>
  );
};

export default AddFormNewsandEvents;
