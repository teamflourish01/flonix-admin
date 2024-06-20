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
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { MdDelete } from "react-icons/md";

const EditCertificate = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();

  const url = process.env.REACT_APP_DEV_URL;

  const getCertificateById = async () => {
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
    getCertificateById();
  }, [id]);

  // edit logic
  const handleSingleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setSingleImg(file);

      // Display selected Img
      const imageUrl = URL.createObjectURL(file);
      setselectSingImg(imageUrl);
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
        toast({
          title: "Certificate Edited Successfully",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/certificate/");
      } else {
        throw new Error("Faild to update Data");
      }
    } catch (error) {
      console.error("Update faild", error);
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

              <FormControl isRequired>
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
                  <Flex>
                    <img
                      src={selctSinImg}
                      alt="selected img"
                      style={{
                        width: "200px",
                        height: "150px",
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
                <FormControl mr={4}  >
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

export default EditCertificate;
