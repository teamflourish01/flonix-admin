import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const EditHome = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [bannerUrl, setbannerUrl] = useState([]);
  const [bImage, setbImage] = useState([]);
  const [trfUrl, settrfUrl] = useState([]);
  const [trfImage, settrfImage] = useState([]);
  const [trfText, settrfText] = useState([]);
  const [logoUrl, setlogoUrl] = useState([]);
  const [logoImg, setlogoImg] = useState([]);
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getHomebyID = async () => {
    try {
      const response = await fetch(`${url}/home/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHomebyID();
  }, [id]);

  // edit logic

  // 3 images handle section
  const handleBannerInputImage = (e) => {
    const file = e.target.files[0];
    console.log("select file", file);
    setbImage([...bImage, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setbannerUrl([...bannerUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteBannerImage = (index) => {
    const dup = [...bannerUrl];
    dup.splice(index, 1);
    setbannerUrl(dup);
  };
  const handledbbannerImage = (index) => {
    let dup = [...item.banner_images];
    dup.splice(index, 1);
    setItem({ ...item, banner_images: dup });
  };
  // Trust-factor-img handle section

  const handleTrustFactrImage = (e) => {
    const file = e.target.files[0];
    settrfImage([...trfImage, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        settrfUrl([...trfUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  const handleTfimgText = (e, i) => {
    let dup = [...item.trust_factor_text];
    dup[i] = e.target.value;
    setItem({ ...item, trust_factor_text: dup });
  };
  const handleTrFacText = (e, i) => {
    let trftext = [...trfText];
    trftext[i] = e.target.value;
    settrfText([...trfText]);
  };
  const handleDeleteTrustFactrImage = (i) => {
    const dup = [...trfImage];
    let dupUrl = [...trfUrl];
    let dupText = [...trfText];
    dupText.splice(i, 1);
    dup.splice(i, 1);
    dupUrl.splice(i, 1);
    settrfImage(dup);
    settrfUrl(dupUrl);
    settrfText(dupText);
  };

  const handleDeleteDBTrfImage = (index) => {
    let dup = [...item.trust_factor_images];
    dup.splice(index, 1);
    setItem({ ...item, trust_factor_images: dup });
  };

  // Logo-File-img handle section

  const handleLogoImage = (e) => {
    const file = e.target.files[0];
    setlogoImg([...logoImg, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setlogoUrl([...logoUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteLogoImage = (index) => {
    const dup = [...logoUrl];
    dup.splice(index, 1);
    setlogoUrl(dup);
  };

  const handleDeleteDBLogoIMG = (index) => {
    let dup = [...item.our_distributor_logo];
    dup.splice(index, 1);
    setItem({ ...item, our_distributor_logo: dup });
  };

  const handleAddFeature = () => {
    setItem({ ...item, about_points: [...item.about_points, ""] });
  };

  const handleKeyFeature = (e, i) => {
    let newFeature = [...item.about_points];
    newFeature[i] = e.target.value;
    setItem({ ...item, about_points: newFeature });
  };

  const handleremoveFeature = (i) => {
    let dup = [...item?.about_points];
    dup.splice(i, 1);
    setItem({ ...item, about_points: dup });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    let dup = { ...item };
    if (bImage.length > 0) {
      for (let x of bImage) {
        formData.append("banner_images", x);
      }
    }
    // trfacotr-image add logic
    if (trfImage.length > 0) {
      for (let x of trfImage) {
        formData.append("trust_factor_images", x);
      }
    }
    // Logo-image add logic
    if (logoImg.length > 0) {
      for (let x of logoImg) {
        formData.append("our_distributor_logo", x);
      }
    }

    formData.append("dup", JSON.stringify(dup));
    try {
      // formData.append("banner_heading", item.banner_heading);
      // formData.append("about_heading", item.about_heading);
      // formData.append("about_pera", item.about_pera);
      // formData.append("about_video", item.about_video);
      // formData.append("our_distributor_text", item.our_distributor_text);

      // for (let x of trfImg) {
      //   formData.append("trust_factor_images", x);
      // }
      // for (let x of logoImg) {
      //   formData.append("our_distributor_logo", x);
      // }
      // console.log("FormData:", formData);
      const response = await axios.put(`${url}/home/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("data Update Successfuly");
        Navigate("/admin/page/");
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
            backgroundColor={"#white"}
            w={["100%", "100%", "100%", "100%", "100%"]}
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            padding={"20px"}
            borderRadius={"20px"}
          >
            <form encType="multipart/form-data">
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="banner_heading" color={"#add8e6"}>
                  Heading
                </FormLabel>
                <Input
                  id="banner_heading"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="banner_heading"
                  value={item.banner_heading}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="banner_images" color={"#add8e6"}>
                  Banner Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="banner_images"
                  type="file"
                  name="banner_images"
                  accept="image/*"
                  onChange={handleBannerInputImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {bannerUrl &&
                    bannerUrl?.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image src={e} width="200px" />
                        <Button
                          leftIcon={<DeleteIcon />}
                          bgColor={"red.400"}
                          position="absolute"
                          size="sm"
                          top={0}
                          right={1}
                          zIndex={1}
                          _hover={{ bgColor: "red.500", color: "white" }}
                          color="white"
                          onClick={() => handleDeleteBannerImage(i)}
                        ></Button>
                      </Flex>
                    ))}
                  {item?.banner_images &&
                    item.banner_images.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image
                          src={`${url}/home/${e}`}
                          style={{
                            width: "200px",
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
                          right={1}
                          zIndex={1}
                          _hover={{ bgColor: "red.500", color: "white" }}
                          color="white"
                          onClick={() => handledbbannerImage(i)}
                        ></Button>
                      </Flex>
                    ))}
                </Flex>
              </FormControl>

              <FormControl isRequired mb={4}>
                <FormLabel htmlFor="about_heading" color={"#add8e6"}>
                  About Heading
                </FormLabel>
                <Input
                  variant="flushed"
                  id="about_heading"
                  type="text"
                  placeholder="Enter your Heading"
                  mb={4}
                  name="about_heading"
                  value={item?.about_heading}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="about_pera" color={"#add8e6"}>
                  About Description
                </FormLabel>
                <Textarea
                  id="about_pera"
                  placeholder="Enter your Description"
                  mb={4}
                  name="about_pera"
                  value={item?.about_pera}
                  onChange={handleInput}
                />
              </FormControl>
              <br />
              <FormControl isRequired>
                <Flex justifyContent={"space-between"}>
                  <FormLabel color={"#add8e6"}>About Key Features</FormLabel>
                  <Button onClick={handleAddFeature}>+</Button>
                </Flex>
                {item?.about_points?.map((e, i) => {
                  return (
                    <Flex gap={"20px"} mt={"10px"}>
                      <Input
                        key={i}
                        value={e}
                        onChange={(event) => handleKeyFeature(event, i)}
                      />
                      <Button onClick={() => handleremoveFeature(i)}>-</Button>
                    </Flex>
                  );
                })}
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
                <FormLabel htmlFor="about_video" color={"#add8e6"}>
                  About Video
                </FormLabel>
                <Input
                  id="about_video"
                  type="text"
                  placeholder="Enter your place"
                  variant="flushed"
                  mb={4}
                  name="about_video"
                  value={item?.about_video}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="trust_factor_images" color={"#add8e6"}>
                  Trust Factor Images
                </FormLabel>
                <Input
                  variant="flushed"
                  id="trust_factor_images"
                  type="file"
                  name="trust_factor_images"
                  accept="image/*"
                  onChange={handleTrustFactrImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {trfUrl &&
                    trfUrl?.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image src={e} w={"200px"} />
                        <Input
                          value={trfText[i]}
                          onChange={(event) => handleTrFacText(event, i)}
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
                          onClick={() => handleDeleteTrustFactrImage(i)}
                        ></Button>
                      </Flex>
                    ))}
                  {item?.trust_factor_images &&
                    item.trust_factor_images.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image src={`${url}/home/${e}`} w={"200px"} />
                        <Input
                          value={item.trust_factor_text[i]}
                          onChange={(event) => handleTfimgText(event, i)}
                        />
                        <Button
                          leftIcon={<DeleteIcon />}
                          bgColor={"red.400"}
                          position="absolute"
                          size="sm"
                          top={0}
                          right={1}
                          zIndex={1}
                          _hover={{ bgColor: "red.500", color: "white" }}
                          color="white"
                          onClick={() => handleDeleteDBTrfImage(i)}
                        ></Button>
                      </Flex>
                    ))}
                </Flex>
              </FormControl>

              <br />
              <FormControl isRequired>
                <FormLabel htmlFor="our_distributor_text" color={"#add8e6"}>
                  Distributor Description
                </FormLabel>
                <Textarea
                  id="our_distributor_text"
                  placeholder="Enter your Description"
                  mb={4}
                  name="our_distributor_text"
                  value={item?.our_distributor_text}
                  onChange={handleInput}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="our_distributor_logo" color={"#add8e6"}>
                  Distributor Logo
                </FormLabel>
                <Input
                  variant="flushed"
                  id="our_distributor_logo"
                  type="file"
                  name="our_distributor_logo"
                  accept="image/*"
                  onChange={handleLogoImage}
                  mb={4}
                  multiple
                />
                <Flex wrap="wrap">
                  {logoUrl &&
                    logoUrl?.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image src={e} width="200px" />
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
                          onClick={() => handleDeleteLogoImage(i)}
                        ></Button>
                      </Flex>
                    ))}
                  {item?.our_distributor_logo &&
                    item.our_distributor_logo.map((e, i) => (
                      <Flex key={i} alignItems="center" position="relative">
                        <Image
                          src={`${url}/home/${e}`}
                          style={{
                            width: "200px",
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
                          right={1}
                          zIndex={1}
                          _hover={{ bgColor: "red.500", color: "white" }}
                          color="white"
                          onClick={() => handleDeleteDBLogoIMG(i)}
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
              Save
            </Button>
          </form>
        </center>
      </Box>
    </>
  );
};

export default EditHome;
