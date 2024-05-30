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

const UpdateNewsAndEvents = () => {
  const { Id } = useParams();
  const [item, setItem] = useState([]);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");
  const [selectedDetail, setselectedDetail] = useState("");
  const [detailImg, setDetailImg] = useState({});
  const [detImgsUrl, setdetImgsUrl] = useState([]);
  const [detImgs, setdetImgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const fetchEventAndNewsById = async () => {
    try {
      const response = await fetch(`${url}/newsandevent/${Id}`);
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
    setSingleImg(file);

    // Display selected Img
    const imageUrl = URL.createObjectURL(file);
    setselectSingImg(imageUrl);
  };
  const handleDeleteSingleImage = () => {
    setSingleImg("");
    setselectSingImg("");
  };
  // image_alt Text logic

  const hancardText = (e) => {
    let dup = [...item.cardimg_alt];
    dup = e.target.value;
    setItem({ ...item, cardimg_alt: dup });
  };

  const handleDetImgText = (e) => {
    let dup = [...item.detailimg_alt];
    dup = e.target.value;
    setItem({ ...item, detailimg_alt: dup });
  };
  // Detail Image logic
  const handleDetailImgChange = (e) => {
    let file = e.target.files[0];
    setDetailImg(file);

    //display
    const imageUrlselect = URL.createObjectURL(file);
    setselectedDetail(imageUrlselect);
  };

  const handleDeleteDetailImg = () => {
    setDetailImg({});
    setselectedDetail("");
  };

  //Multiple Image
  const handleMultipleImage = (e) => {
    const file = e.target.files[0];
    setdetImgs([...detImgs, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setdetImgsUrl([...detImgsUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteMultipleImage = (index) => {
    // const dup = [...detImgsUrl];
    // dup.splice(index, 1);
    // setdetImgsUrl(dup);

    setdetImgsUrl(detImgsUrl.filter((_, i) => i !== index));
    setdetImgs(detImgs.filter((_, i) => i !== index));
  };
  const handleDBImgdelete = (index) => {
    let dup = [...item.detailimages];
    dup.splice(index, 1);
    setItem({ ...item, detailimages: dup });
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
      formData.append("cardimage", singleImg);
    }
    if (detailImg) {
      formData.append("detailimage", detailImg);
    }
    if (detImgs.length > 0) {
      for (let x of detImgs) {
        formData.append("detailimages", x);
      }
    }
    formData.append("dup", JSON.stringify(dup));
    try {
      const response = await axios.put(
        `${url}/newsandevent/edit/${Id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Data Update Successfuly",
          description: response.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/newsandevents/");
      } else {
        toast({
          title: "Data Not Added ",
          description: response.msg,
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
      <Box p="4">
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
              <FormControl>
                <FormLabel htmlFor="cardimage" color={"#add8e6"}>
                  Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="cardimage"
                  type="file"
                  name="cardimage"
                  accept="image/*"
                  onChange={handleSingleImage}
                  mb={4}
                />
              </FormControl>
              <FormControl>
                {selctSinImg && (
                  <Flex>
                    <Box>
                      <Image src={selctSinImg} width="200px" />

                      <Input
                        value={item.cardimg_alt}
                        onChange={(event) => hancardText(event)}
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      size={"30px"}
                      cursor="pointer"
                      onClick={handleDeleteSingleImage}
                    />
                  </Flex>
                )}
              </FormControl>
              {!selctSinImg && item.cardimage && (
                <FormControl mr={4}>
                  <img
                    src={`${url}/newsAndevents/${item.cardimage}`}
                    alt="selected img"
                    style={{
                      width: "200px",

                      margin: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <Input
                    value={item.cardimg_alt}
                    onChange={(event) => hancardText(event)}
                  />
                </FormControl>
              )}
              <br />
              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="cardheading" color={"#add8e6"}>
                  Card Heading
                </FormLabel>
                <Input
                  variant="flushed"
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
                <FormLabel htmlFor="cardtext" color={"#add8e6"}>
                  Card Description
                </FormLabel>
                <Textarea
                  id="cardtext"
                  placeholder="Enter your Description"
                  mb={4}
                  name="cardtext"
                  value={item.cardtext}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="detailimage" color={"#add8e6"}>
                  Details Page Single Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="detailimage"
                  type="file"
                  name="detailimage"
                  accept="image/*"
                  onChange={handleDetailImgChange}
                  mb={4}
                />
              </FormControl>
              <FormControl>
                {selectedDetail && (
                  <Flex>
                    <Box>
                      <Image src={selectedDetail} width="200px" />
                      <Input
                        value={item.detailimg_alt}
                        onChange={(event) => handleDetImgText(event)}
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      size={"30px"}
                      cursor="pointer"
                      onClick={handleDeleteDetailImg}
                    />
                  </Flex>
                )}
              </FormControl>
              {!selectedDetail && item.detailimage && (
                <FormControl mr={4}>
                  <img
                    src={`${url}/newsAndevents/${item.detailimage}`}
                    alt="selected img"
                    style={{
                      width: "200px",

                      margin: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <Input
                    value={item.detailimg_alt}
                    onChange={(event) => handleDetImgText(event)}
                  />
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
              <FormControl isRequired>
                <FormLabel htmlFor="date" color={"#add8e6"}>
                  Date
                </FormLabel>
                <Input
                  variant="flushed"
                  id="date"
                  type="date"
                  name="date"
                  mb={4}
                  value={item.date}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="place" color={"#add8e6"}>
                  Place
                </FormLabel>
                <Input
                  id="place"
                  type="text"
                  placeholder="Enter your place"
                  variant="flushed"
                  mb={4}
                  name="place"
                  value={item.place}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="detailtext" color={"#add8e6"}>
                  Detail Description
                </FormLabel>
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
                <FormLabel htmlFor="detailheading" color={"#add8e6"}>
                  Detail Heading
                </FormLabel>
                <Input
                  variant="flushed"
                  id="detailheading"
                  type="text"
                  // placeholder="Enter your Heading"
                  mb={4}
                  name="detailheading"
                  value={item.detailheading}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="video" color={"#add8e6"}>
                  Video
                </FormLabel>
                <Input
                  variant="flushed"
                  id="video"
                  type="text"
                  // placeholder="Enter your video Link"
                  mb={4}
                  name="video"
                  value={item.video}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="detailimages" color={"#add8e6"}>
                  Activity Images
                </FormLabel>
                <Input
                  variant="flushed"
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
                    item.detailimages.map((e, i) => (
                      <Flex key={i} position="relative">
                        <Image
                          key={i}
                          src={`${url}/newsAndevents/${e}`}
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
                          onClick={() => handleDBImgdelete(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "0",
                            marginTop: "-15px",
                            marginRight: "-8px",
                          }}
                        />
                      </Flex>
                    ))}

                  {detImgsUrl &&
                    detImgsUrl.map((e, i) => (
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
                          onClick={() => handleDeleteMultipleImage(i)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "0",
                            marginTop: "-15px",
                            marginRight: "-8px",
                          }}
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

export default UpdateNewsAndEvents;
