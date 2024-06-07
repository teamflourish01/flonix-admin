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
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { MdDelete } from "react-icons/md";

const UpdateHomeBenefits = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [firstImg, setfirstImg] = useState("");
  const [selctFstImg, setselectFstImg] = useState("");
  const [secndImg, setsecndImg] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedSecnd, setselectedSecnd] = useState("");

  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getSingleData = async () => {
    try {
      const response = await fetch(`${url}/robenefits/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleData();
  }, [id]);

  // edit logic
  const handleSingleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setfirstImg(file);

      // Display selected Img
      const imageUrl = URL.createObjectURL(file);
      setselectFstImg(imageUrl);
    } else {
      setfirstImg("");
      setselectFstImg("");
    }
  };
  const handleDeleteSingleImage = () => {
    setfirstImg("");
    setselectFstImg("");
  };
  // Detail Image logic
  const handleDetailImgChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setsecndImg(file);

      //display
      const imageUrlselect = URL.createObjectURL(file);
      setselectedSecnd(imageUrlselect);
    } else {
      setsecndImg({});
      setselectedSecnd("");
    }
  };

  const handleDeleteDetailImg = () => {
    setsecndImg({});
    setselectedSecnd("");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    setIsLoading(true);
    let dup = { ...item };
    if (firstImg) {
      formData.append("first_image", firstImg);
    }
    if (secndImg) {
      formData.append("seconed_image", secndImg);
    }

    formData.append("dup", JSON.stringify(dup));
    try {
      const response = await axios.put(
        `${url}/robenefits/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Data Edit Successfuly",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/page/");
      } else {
        toast({
          title: "Data Not Update ",
          description: response.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Update faild", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box p="4" marginLeft="25px">
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
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="main_heading" color={"#add8e6"}>
                  Main Heading
                </FormLabel>
                <Input
                  id="main_heading"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="main_heading"
                  value={item.main_heading}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="left_heading1" color={"#add8e6"}>
                  Left First Heading
                </FormLabel>
                <Input
                  id="left_heading1"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="left_heading1"
                  value={item.left_heading1}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="left_text1" color={"#add8e6"}>
                  Left First Text
                </FormLabel>
                <Textarea
                  id="left_text1"
                  placeholder="Enter your message"
                  mb={4}
                  name="left_text1"
                  value={item.left_text1}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="left_heading2" color={"#add8e6"}>
                  Left Secoend Heading
                </FormLabel>
                <Input
                  id="left_heading2"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="left_heading2"
                  value={item.left_heading2}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="left_text2" color={"#add8e6"}>
                  Left Seconed Text
                </FormLabel>
                <Textarea
                  id="left_text2"
                  placeholder="Enter your message"
                  mb={4}
                  name="left_text2"
                  value={item.left_text2}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="right_heading1" color={"#add8e6"}>
                  Right First Heading
                </FormLabel>
                <Input
                  id="right_heading1"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="right_heading1"
                  value={item.right_heading1}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="right_text1" color={"#add8e6"}>
                  Right First Text
                </FormLabel>
                <Textarea
                  id="right_text1"
                  placeholder="Enter your message"
                  mb={4}
                  name="right_text1"
                  value={item.right_text1}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="right_heading2" color={"#add8e6"}>
                  Right Seconed Heading
                </FormLabel>
                <Input
                  id="right_heading2"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="right_heading2"
                  value={item.right_heading2}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="right_text2" color={"#add8e6"}>
                  Right Secoend Text
                </FormLabel>
                <Textarea
                  id="right_text2"
                  placeholder="Enter your message"
                  mb={4}
                  name="right_text2"
                  value={item.right_text2}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="first_image" color={"#add8e6"}>
                  First Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="first_image"
                  type="file"
                  name="first_image"
                  accept="image/*"
                  onChange={handleSingleImage}
                  mb={4}
                />
              </FormControl>
              <FormControl>
                {selctFstImg && (
                  <Flex position="relative">
                    <img
                      src={selctFstImg}
                      alt="selected img"
                      style={{
                        width: "200px",

                        margin: "5px",
                        // marginLeft: "150px",
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
              {!selctFstImg && item.first_image && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/robenefits/${item.first_image}`}
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
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="bottom_heading1" color={"#add8e6"}>
                  Bottom First Heading
                </FormLabel>
                <Input
                  id="bottom_heading1"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="bottom_heading1"
                  value={item.bottom_heading1}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="bottom_text1" color={"#add8e6"}>
                  Bottom First Text
                </FormLabel>
                <Textarea
                  id="bottom_text1"
                  placeholder="Enter your message"
                  mb={4}
                  name="bottom_text1"
                  value={item.bottom_text1}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="bottom_heading2" color={"#add8e6"}>
                  Bottom Secoend Heading
                </FormLabel>
                <Input
                  id="bottom_heading2"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="bottom_heading2"
                  value={item.bottom_heading2}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="bottom_text2" color={"#add8e6"}>
                  Bottom Secoend Text
                </FormLabel>
                <Textarea
                  id="bottom_text2"
                  placeholder="Enter your message"
                  mb={4}
                  name="bottom_text2"
                  value={item.bottom_text2}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="bottom_heading3" color={"#add8e6"}>
                  Bottom Thired Heading
                </FormLabel>
                <Input
                  id="bottom_heading3"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="bottom_heading3"
                  value={item.bottom_heading3}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="bottom_text3" color={"#add8e6"}>
                  Bottom Thired Text
                </FormLabel>
                <Textarea
                  id="bottom_text3"
                  placeholder="Enter your message"
                  mb={4}
                  name="bottom_text3"
                  value={item.bottom_text3}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl mb={0} isRequired>
                <FormLabel htmlFor="bottom_heading4" color={"#add8e6"}>
                  Bottom Four Heading
                </FormLabel>
                <Input
                  id="bottom_heading4"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="bottom_heading4"
                  value={item.bottom_heading4}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="bottom_text4" color={"#add8e6"}>
                  Bottom Four Text
                </FormLabel>
                <Textarea
                  id="bottom_text4"
                  placeholder="Enter your message"
                  mb={4}
                  name="bottom_text4"
                  value={item.bottom_text4}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="seconed_image" color={"#add8e6"}>
                  Secoend Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="seconed_image"
                  type="file"
                  name="seconed_image"
                  accept="image/*"
                  onChange={handleDetailImgChange}
                  mb={4}
                />
              </FormControl>
              <FormControl>
                {selectedSecnd && (
                  <Flex position="relative">
                    <img
                      src={selectedSecnd}
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
                      onClick={handleDeleteDetailImg}
                    />
                  </Flex>
                )}
              </FormControl>
              {!selectedSecnd && item.seconed_image && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/robenefits/${item.seconed_image}`}
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
              isLoading={isLoading}
              spinner={<Spinner color="blue.500" />}
            >
              Save
            </Button>
          </form>
        </center>
      </Box>
    </>
  );
};

export default UpdateHomeBenefits;
