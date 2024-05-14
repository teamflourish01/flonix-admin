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

const EditCertificate = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getAboutusById = async () => {
    try {
      const response = await fetch(`${url}/certificate/${id}`);
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

  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("imgdescription", item.imgdescription);

      if (singleImg) {
        formData.append("image", singleImg);
      }
      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/certificate/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("data Update Successfuly");
        Navigate("/admin/certificate/");
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
              <FormControl isRequired>
                <FormLabel htmlFor="imgdescription" color={"#add8e6"}>
                  Certificate Description
                </FormLabel>
                <Textarea
                  id="imgdescription"
                  placeholder="Enter your message"
                  mb={4}
                  name="imgdescription"
                  value={item.imgdescription}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="image" color={"#add8e6"}>
                  Certificate
                </FormLabel>
                <Input
                  variant="flushed"
                  id="image"
                  type="file"
                  name="image"
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
              {!selctSinImg && item.image && (
                <FormControl mr={4}>
                  <Flex alignItems="center" position="relative">
                    <img
                      src={`${url}/certificates/${item.image}`}
                      alt="selected img"
                      style={{
                        width: "200px",
                        height: "150px",
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
              </center>
            </Box>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default EditCertificate;
