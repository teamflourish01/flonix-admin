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

const ViewNewsAndEvents = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const fetchEventAndNewsById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/newsandevent/${id}`);
      const data = await response.json();
      setItem(data.DataById);
      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEventAndNewsById();
  }, [id]);
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
            <FormControl>
              <FormLabel htmlFor="generalheading">Heading</FormLabel>
              <Input
                id="generalheading"
                type="text"
                placeholder="Enter your Heading"
                name="generalheading"
                value={item.generalheading}
                mb={4}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="generaltext">Description</FormLabel>
              <Textarea
                id="generaltext"
                placeholder="Enter your message"
                mb={4}
                name="generaltext"
                value={item.generaltext}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="detailimages">Images</FormLabel>
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

            <FormControl>
              <FormLabel htmlFor="cardheading">Card Heading</FormLabel>
              <Input
                id="cardheading"
                type="text"
                placeholder="Enter your Heading"
                mb={4}
                name="cardheading"
                value={item.cardheading}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cardtext">Card Description</FormLabel>
              <Textarea
                id="cardtext"
                placeholder="Enter your Description"
                mb={4}
                name="cardtext"
                value={item.cardtext}
                readOnly
              />
            </FormControl>
            <Flex gap={4} mb={4}>
              <FormControl flex="1">
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  id="date"
                  type="text"
                  name="date"
                  value={item.date}
                  readOnly
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel htmlFor="place">Place</FormLabel>
                <Input
                  id="place"
                  type="text"
                  placeholder="Enter your place"
                  name="place"
                  value={item.place}
                  readOnly
                />
              </FormControl>
              <FormControl flex="1">
                <FormLabel htmlFor="detailheading">Detail Heading</FormLabel>
                <Input
                  id="detailheading"
                  type="text"
                  placeholder="Enter your Heading"
                  name="detailheading"
                  value={item.detailheading}
                  readOnly
                />
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel htmlFor="detailtext">Detail Description</FormLabel>
              <Textarea
                id="detailtext"
                placeholder="Enter your Description"
                mb={4}
                name="detailtext"
                value={item.detailtext}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="video">Video</FormLabel>
              <Input
                id="video"
                type="text"
                placeholder="Enter your video Link"
                mb={4}
                name="video"
                value={item.video}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="detailimages">Activity Images</FormLabel>
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
          </form>
        </Box>
      </Center>
    </>
  );
};

export default ViewNewsAndEvents;
