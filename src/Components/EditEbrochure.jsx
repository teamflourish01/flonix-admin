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

const EditEbrochure = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getEbrochureById = async () => {
    try {
      const response = await fetch(`${url}/ebrochure/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEbrochureById();
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

  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("filename", item.filename);

      if (singleImg) {
        formData.append("doc", singleImg);
      }
      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/ebrochure/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("data Update Successfuly");
        Navigate("/admin/ebrochure/");
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Flex
            justifyContent={"space-around"}
            gap="40px"
            flexDirection={["column", "column", "column", "row", "row"]}
          >
            <Box
              backgroundColor={"#F2F5F7"}
              w={["100%", "100%", "100%", "100%", "50%"]}
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
                      alt="selected PDF"
                      style={{
                        width: "200px",
                        height: "150px",
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
              {!selctSinImg && item.doc && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/ebrochure/${item.doc}`}
                      alt={item.doc}
                      style={{
                        width: "200px",

                        margin: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  </Flex>
                </FormControl>
              )}
              <br />
              <center>
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
              </center>
            </Box>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default EditEbrochure;
