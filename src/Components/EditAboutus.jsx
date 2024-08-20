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
  Image,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { MdDelete } from "react-icons/md";

const EditAboutus = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [logoUrl, setlogoUrl] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
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
  // Logo Images
  const handleMultipleImage = (e) => {
    const file = e.target.files[0];
    setSelectedImages([...selectedImages, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setlogoUrl([...logoUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteMultipleImage = (index) => {
    setlogoUrl(logoUrl.filter((_, i) => i !== index));
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };
  const handleDBImgdelete = async (index) => {
    let dup = [...item.logoimages];
    dup.splice(index, 1);
    setItem({ ...item, logoimages: dup });
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
    if (singleImg) {
      formData.append("banner", singleImg);
    }
    if (selectedImages.length > 0) {
      for (let x of selectedImages) {
        formData.append("logoimages", x);
      }
    }
    formData.append("dup", JSON.stringify(dup));
    try {
      const response = await axios.put(`${url}/aboutus/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        <Flex
          justifyContent={"space-around"}
          gap="35px"
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
                <FormLabel htmlFor="meta_title" color={"#add8e6"}>
                  Meta Title
                </FormLabel>
                <Input
                  id="meta_title"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="meta_title"
                  value={item.meta_title}
                  onChange={handleInput}
                  mb={2}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="meta_description" color={"#add8e6"}>
                  Meta Description
                </FormLabel>
                <Textarea
                  id="meta_description"
                  placeholder="Enter your Description"
                  mb={4}
                  name="meta_description"
                  value={item.meta_description}
                  onChange={handleInput}
                />
              </FormControl>

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
                  maxLength={160}
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
                  maxLength={750}
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
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 1320x693px size will allow Only
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
                        marginBottom: "10px",
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
              {!selctSinImg && item.banner && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/aboutus/${item.banner}`}
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
                  maxLength={160}
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
                  maxLength={750}
                />
              </FormControl>
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
                  maxLength={345}
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
                  maxLength={345}
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
                  maxLength={345}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="logoimages" color={"#add8e6"}>
                  Logo Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="logoimages"
                  type="file"
                  name="logoimages"
                  accept="image/*"
                  onChange={handleMultipleImage}
                  mb={1}
                  multiple
                />
                <Text mb={6}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 242x105px size will allow Only
                </Text>
                <Flex wrap="wrap">
                  {item.logoimages &&
                    item.logoimages.map((e, i) => (
                      <Flex key={i} position="relative">
                        <Image
                          key={i}
                          src={`${url}/aboutus/${e}`}
                          alt={`Image ${i}`}
                          style={{
                            width: "200px",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                        />
                        <MdDelete
                          size={"40px"}
                          color="red"
                          cursor="pointer"
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "0",
                            marginTop: "-15px",
                            marginRight: "-8px",
                          }}
                          onClick={() => handleDBImgdelete(i)}
                        />
                      </Flex>
                    ))}

                  {logoUrl.map((e, i) => (
                    <Flex key={i} position="relative">
                      <Image
                        src={e}
                        style={{
                          width: "200px",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <MdDelete
                        size={"40px"}
                        color="red"
                        cursor="pointer"
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "0",
                          marginTop: "-15px",
                          marginRight: "-8px",
                        }}
                        onClick={() => handleDeleteMultipleImage(i)}
                      />
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

export default EditAboutus;
