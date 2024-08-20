import React, { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import generateSlug from "../util/generateSlug";
import EditPermalink from "./EditPermalink";

const AddFormNewsandEvents = () => {
  const [eventdata, setEventdata] = useState({
    cardimage: "",
    cardimg_alt: "",
    cardheading: "",
    date: "",
    place: "",
    cardtext: "",
    detailheading: "",
    detailtext: "",
    video: "",
    detailimage: "",
    detailimg_alt: "",
    detailimages: [],
    slug: "",
    meta_title: "",
    meta_description: "",
  });
  const [selectedImages, setSelectedImages] = useState("");
  const [image, setImage] = useState({});
  const [selectedDetail, setselectedDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [detailImg, setDetailImg] = useState({});

  const [varImage, setVarImage] = useState([]);
  const Navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const url = process.env.REACT_APP_DEV_URL;

  const formData = new FormData();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setEventdata({ ...eventdata, [name]: value });
  };

  const handleSingleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
      // selected image Display
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages(imageUrl);
    } else {
      setImage({});
      setSelectedImages("");
    }
  };
  const handleDeleteSingleImage = () => {
    setImage({});
    setSelectedImages("");
  };
  //cardImg_Text Logic
  const handleImgText = (event) => {
    let cardImgText = [...eventdata.cardimg_alt];
    cardImgText = event.target.value;
    setEventdata({ ...eventdata, cardimg_alt: cardImgText });
  };

  const handleDetImgText = (event) => {
    let detImgText = [...eventdata.detailimg_alt];
    detImgText = event.target.value;
    setEventdata({ ...eventdata, detailimg_alt: detImgText });
  };
  // Detail Single Image Logic
  const handleDetailImgChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setDetailImg(file);

      //display
      const imageUrlselect = URL.createObjectURL(file);
      setselectedDetail(imageUrlselect);
    } else {
      setDetailImg({});
      setselectedDetail("");
    }
  };

  const handleDeleteDetailImg = () => {
    setDetailImg({});
    setselectedDetail("");
  };

  // Multiple IMg logic
  const handleImagesChange = (e) => {
    // const file = e.target.files[0];
    // setVarImage([...varImage, file]);

    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files); // Convert FileList to an array
      setVarImage([...varImage, ...newImages]);
    }
  };
  const handleDeleteMultipleImage = (index) => {
    const updatedImages = [...varImage];
    updatedImages.splice(index, 1);
    setVarImage(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dup = { ...eventdata };
    const formData = new FormData();
    if (!slug) {
      toast({
        title: "Item Not Edited ",
        description: "Permalink is Required",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);

    formData.append("cardimage", image);
    formData.append("detailimage", detailImg);
    varImage.forEach((file) => formData.append("detailimages", file));

    Object.keys(eventdata).forEach((key) => {
      if (key !== "detailimages") {
        formData.append(key, eventdata[key]);
      }
    });
    let newSlug = generateSlug(slug);
    dup.slug = newSlug;
    setEventdata(dup);

    formData.append("dup", JSON.stringify(dup));

    try {
      let res = await axios.post(`${url}/newsandevent/addnew`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // let data = await res.json();
      if (res.status === 201) {
        toast({
          title: "Data Added Successfuly",
          description: res.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        setEventdata({
          cardimage: "",
          cardheading: "",
          date: "",
          place: "",
          cardtext: "",
          detailheading: "",
          detailtext: "",
          video: "",
          detailimages: "",
        });

        Navigate("/admin/newsandevents/");
      } else {
        toast({
          title: "Data Not Add X ",
          description: res.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
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

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEventdata({ ...eventdata, [name]: value });
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
            backgroundColor={"white"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl isRequired>
                <FormLabel htmlFor="meta_title" color={"#add8e6"}>
                  Meta Title
                </FormLabel>
                <Input
                  id="meta_title"
                  type="text"
                  placeholder="Enter your Title"
                  variant="flushed"
                  mb={4}
                  name="meta_title"
                  value={eventdata.meta_title}
                  onChange={handleInput}
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
                  value={eventdata.meta_description}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl isRequired mb={1}>
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
                  value={eventdata.cardheading}
                  onChange={(e) => {
                    handleChange(e);
                    setSlug(generateSlug(e.target.value));
                  }}
                  maxLength={80}
                />
              </FormControl>
              <EditPermalink
                slug={slug}
                folder={"newsandevent"}
                setSlug={setSlug}
              />
              <br />
              <FormControl isRequired>
                <FormLabel htmlFor="cardimage" color={"#add8e6"}>
                  Card Image
                </FormLabel>
                <Input
                  variant="flushed"
                  id="cardimage"
                  type="file"
                  name="cardimage"
                  accept="image/*"
                  onChange={handleSingleImageChange}
                  mb={1}
                />
              </FormControl>
              <Text mb={5}>
                <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                Should Be Upto 420x252px size will allow Only
              </Text>
              <FormControl>
                {selectedImages && (
                  <Flex>
                    <Box>
                      <Image src={selectedImages} width="200px" />
                      <Input
                        value={eventdata.cardimg_alt}
                        onChange={(event) => handleImgText(event)}
                        placeholder="Add IMG ALT Text"
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={handleDeleteSingleImage}
                    />
                  </Flex>
                )}
              </FormControl>
              <br />

              <FormControl isRequired>
                <FormLabel htmlFor="cardtext" color={"#add8e6"}>
                  Card Description
                </FormLabel>
                <Textarea
                  id="cardtext"
                  placeholder="Enter your Description"
                  mb={4}
                  name="cardtext"
                  value={eventdata.cardtext}
                  onChange={handleInput}
                  maxLength={750}
                />
              </FormControl>
            </form>
          </Box>
          <Box
            backgroundColor={"white"}
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
                  value={eventdata.date}
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
                  value={eventdata.place}
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
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 1320x517px size will allow Only
                </Text>
              </FormControl>
              <FormControl>
                {selectedDetail && (
                  <Flex>
                    <Box>
                      <Image src={selectedDetail} width="200px" />
                      <Input
                        value={eventdata.detailimg_alt}
                        onChange={(event) => handleDetImgText(event)}
                        placeholder="Add IMG ALT Text"
                      />
                    </Box>

                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={handleDeleteDetailImg}
                    />
                  </Flex>
                )}
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel htmlFor="detailtext" color={"#add8e6"}>
                  Detail Description
                </FormLabel>
                <Textarea
                  id="detailtext"
                  placeholder="Enter your Description"
                  mb={4}
                  name="detailtext"
                  value={eventdata.detailtext}
                  onChange={handleInput}
                  maxLength={750}
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
                  value={eventdata.detailheading}
                  onChange={handleInput}
                  maxLength={160}
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
                  value={eventdata.video}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="detailimages" color={"#add8e6"}>
                  Activity Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="detailimages"
                  type="file"
                  name="detailimages"
                  accept="image/*"
                  onChange={handleImagesChange}
                  mb={1}
                />
                <Text mb={5}>
                  <span style={{ fontWeight: "bold" }}>Note</span>:File Size
                  Should Be Upto 420x313px size will allow Only
                </Text>
              </FormControl>
              {/* Display selected images for multiple upload */}
              <Flex wrap="wrap">
                {varImage.map((image, index) => (
                  <Flex key={index} position="relative">
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`selected image ${index}`}
                      style={{
                        width: "200px",

                        objectFit: "cover",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <MdDelete
                      size={"40px"}
                      color="red"
                      cursor="pointer"
                      onClick={() => handleDeleteMultipleImage(index)}
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
            </form>
          </Box>
        </Flex>
        <br />
        <center>
          <Button
            variant={"solid"}
            bgColor={"black"}
            color="#add8e6"
            _hover={{
              color: "black",
              bgColor: "#add8e6",
              border: "1px solid #add8e6",
            }}
            onClick={handleSubmit}
            isLoading={isLoading}
            spinner={<Spinner color="blue.500" />}
          >
            Add New
          </Button>
        </center>
      </Box>
    </>
  );
};

export default AddFormNewsandEvents;
