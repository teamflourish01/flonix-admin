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

const EditHomeBanner = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getHomeBannerById = async () => {
    try {
      const response = await fetch(`${url}/homebanner/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHomeBannerById();
  }, [id]);

  // edit logic

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
      const response = await fetch(`${url}/homebanner/delete/${id}/${index}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getHomeBannerById();
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
      formData.append("bannerlable", item.bannerlable);

      for (let x of selectedImages) {
        formData.append("bannerimages", x);
      }

      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/homebanner/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("data Update Successfuly");
        Navigate("/admin/page");
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
            backgroundColor={"#F2F5F7"}
            w={["100%", "100%", "100%", "100%", "50%"]}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="bannerlable" color={"#add8e6"}>
                  Banner Lable
                </FormLabel>
                <Input
                  variant="flushed"
                  id="bannerlable"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="bannerlable"
                  value={item.bannerlable}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="bannerimages" color={"#add8e6"}>
                  Banner Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="bannerimages"
                  type="file"
                  name="bannerimages"
                  accept="image/*"
                  onChange={handleMultipleImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {item.bannerimages &&
                    item.bannerimages.map((image, index) => (
                      <Flex key={index} alignItems="center" position="relative">
                        <img
                          key={index}
                          src={`http://localhost:8080/homebanner/${image}`}
                          alt={`Image ${index}`}
                          style={{
                            width: "150px",
                            height: "150px",
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
                          width: "150px",
                          height: "150px",
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
          </form>
        </center>
      </Box>
    </>
  );
};

export default EditHomeBanner;
