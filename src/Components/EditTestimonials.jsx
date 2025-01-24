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
  Spinner,
  useToast,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { MdDelete } from "react-icons/md";

const EditTestimonials = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getTestimonialsById = async () => {
    try {
      const response = await fetch(`${url}/testimonials/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestimonialsById();
  }, [id]);

  // edit logic
  const handleSingleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setSingleImg(file);

      // Display selected Img
      const imageUrl = URL.createObjectURL(file);
      setselectSingImg(imageUrl);
    } else {
      setSingleImg("");
      setselectSingImg("");
    }
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
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", item.name);
      formData.append("designation", item.designation);
      formData.append("text", item.text);

      if (singleImg) {
        formData.append("image", singleImg);
      }
      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/testimonials/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Data Added Successfuly",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/testimonials/");
      } else {
        toast({
          title: "Data Not Added ",
          description: response.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Update faild", error);
      toast({
        title: "Error",
        description: error.response?.data?.msg || "An error occurred.",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
                  maxLength={40}
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
                  placeholder="Enter your Designation"
                  mb={4}
                  name="designation"
                  value={item.designation}
                  onChange={handleInput}
                  maxLength={55}
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
                  maxLength={300}
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
                  onChange={handleSingleImage}
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 125x143px size will allow Only
                </Text>
              </FormControl>
              <FormControl>
                {selctSinImg && (
                  <Flex>
                    <img
                      src={selctSinImg}
                      alt="selected img"
                      style={{
                        width: "200px",

                        margin: "5px",
                      }}
                    />
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={handleDeleteSingleImage}
                    />
                  </Flex>
                )}
              </FormControl>
              {!selctSinImg && item.image && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/testimonials/${item.image}`}
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
                  isLoading={isLoading}
                  spinner={<Spinner color="blue.500" />}
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

export default EditTestimonials;
