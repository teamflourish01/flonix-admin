import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const UpdateNewsAndEvents = () => {
  const { Id } = useParams();
  const [item, setItem] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");

  const fetchEventAndNewsById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/newsandevent/${Id}`);
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
    let reader = new FileReader();
    reader.onloadend = () => {
      setSingleImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleImage = (e) => {
    const files = e.target.files;
    const selectedImagesArry = Array.from(files);
    setSelectedImages((prevImages) => [...prevImages, ...selectedImagesArry]);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("generalheading", item.generalheading);
      formData.append("generaltext", item.generaltext);
      formData.append("cardheading", item.cardheading);
      formData.append("date", item.date);
      formData.append("place", item.place);
      formData.append("cardtext", item.cardtext);
      formData.append("detailheading", item.detailheading);
      formData.append("detailtext", item.detailtext);
      formData.append("video", item.video);
      formData.append("cardimage", singleImg);
      for (let x of selectedImages) {
        formData.append("detailimages", x);
      }
      const response = await fetch(
        `http://localhost:8080/newsandevent/edit/${Id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      alert("data Update Successfuly");
    } catch (error) {
      console.error("Update faild", error);
    }
  };

  return (
    <>
      {item && (
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
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="generalheading">Heading</FormLabel>
                <Input
                  id="generalheading"
                  type="text"
                  placeholder="Enter your Heading"
                  name="generalheading"
                  onChange={handleInput}
                  value={item.generalheading}
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
                  value={item.generaltext}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cardimage">Images</FormLabel>
                <Input
                  id="cardimage"
                  type="file"
                  name="cardimage"
                  accept="image/*"
                  onChange={handleSingleImage}
                  mb={4}
                />

                <img
                  src={`http://localhost:8080/newsAndevents/${item.cardimage}`}
                  alt="selected img"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "5px",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="cardheading">Card Heading</FormLabel>
                <Input
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
                <FormLabel htmlFor="cardtext">Card Description</FormLabel>
                <Textarea
                  id="cardtext"
                  placeholder="Enter your Description"
                  mb={4}
                  name="cardtext"
                  value={item.cardtext}
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
                    value={item.date}
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
                    value={item.place}
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
                    value={item.detailheading}
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
                  value={item.detailtext}
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
                  value={item.video}
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
                  onChange={handleMultipleImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {item.detailimages &&
                    item.detailimages.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8080/newsAndevents/${image}`}
                        alt={`Image ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                      />
                    ))}
                </Flex>
              </FormControl>
              <Button type="submit" colorScheme="blue" w="full">
                Edit Data
              </Button>
            </form>
          </Box>
        </Center>
      )}
    </>
  );
};

export default UpdateNewsAndEvents;
