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
    generalheading: "",
    generaltext: "",
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
        "http://localhost:8080/newsandevent/add/singleimage",
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
        "http://localhost:8080/newsandevent/add/multipleimages",
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
      let data = await fetch("http://localhost:8080/newsandevent/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      alert("News & Event Is Add Successfuly");
      setEventdata({
        generalheading: "",
        generaltext: "",
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
      Navigate("/admin/newsandevents/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Center h="auto">
        {" "}
        {/* This centers the form vertically and horizontally */}
        <Box
          p={4}
          boxShadow="md"
          borderRadius="lg"
          w="full"
          maxW="3xl"
          bg="white"
          mt={10}
          mb={8}
        >
          <form encType="multipart/form-data">
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="generalheading">Heading</FormLabel>
              <Input
                id="generalheading"
                type="text"
                placeholder="Enter your Heading"
                name="generalheading"
                value={eventdata.generalheading}
                onChange={handleInput}
                mb={4}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="generaltext">Description</FormLabel>
              <Textarea
                id="generaltext"
                placeholder="Enter your message"
                mb={4}
                name="generaltext"
                value={eventdata.generaltext}
                onChange={handleInput}
              />
            </FormControl>
            <Flex gap={4} mb={4}>
              <FormControl>
                <FormLabel htmlFor="cardimage">Image</FormLabel>
                <Input
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
                        width: "200px",
                        height: "100px",
                        margin: "5px",
                      }}
                    />
                    <Button
                      colorScheme="red"
                      size="sm"
                      position="absolute"
                      top={0}
                      right={120}
                      zIndex={1}
                      onClick={handleDeleteSingleImage}
                    >
                      <CloseIcon />
                    </Button>
                  </Flex>
                )}
              </FormControl>
            </Flex>

            <FormControl isRequired>
              <FormLabel htmlFor="cardheading">Card Heading</FormLabel>
              <Input
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
              <FormLabel htmlFor="cardtext">Card Description</FormLabel>
              <Textarea
                id="cardtext"
                placeholder="Enter your Description"
                mb={4}
                name="cardtext"
                value={eventdata.cardtext}
                onChange={handleInput}
              />
            </FormControl>
            <Flex gap={4} mb={4}>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={eventdata.date}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="place">Place</FormLabel>
                <Input
                  id="place"
                  type="text"
                  placeholder="Enter your place"
                  name="place"
                  value={eventdata.place}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel htmlFor="detailheading">Detail Heading</FormLabel>
                <Input
                  id="detailheading"
                  type="text"
                  placeholder="Enter your Heading"
                  name="detailheading"
                  value={eventdata.detailheading}
                  onChange={handleInput}
                />
              </FormControl>
            </Flex>

            <FormControl isRequired>
              <FormLabel htmlFor="detailtext">Detail Description</FormLabel>
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
              <FormLabel htmlFor="video">Video</FormLabel>
              <Input
                id="video"
                type="text"
                placeholder="Enter your video Link"
                mb={4}
                name="video"
                value={eventdata.video}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="detailimages">Activity Images</FormLabel>
              <Input
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
            <Button
              colorScheme="blue"
              w="full"
              onClick={() => {
                Promise.all([submitSingle(), submitMultiple()])
                  .then((res) => handleSubmit(res[0], res[1]))
                  .catch((err) => console.log(err));
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default AddFormNewsandEvents;
