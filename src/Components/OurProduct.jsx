import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import switchAudio from "../audio/light-switch.mp3";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OurProduct = () => {
  const url = process.env.REACT_APP_DEV_URL;
  const [product, setProduct] = useState([]);
  const [ourProduct, setOurProduct] = useState([]);
  const [home, setHome] = useState({});
  let audio = new Audio(switchAudio);
  const toast=useToast()
  const navigate=useNavigate()

  const handleSubmit = async () => {
    try {
      if(ourProduct.length<3){
        toast({
          title: "Our Product Not Added ",
          description: `Set Min 3 Products Instead of ${ourProduct.length} `,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        return
      }
      let dup={...home,our_products:ourProduct}
      let formData=new FormData()
      formData.append("dup",JSON.stringify(dup))
      let data = await axios.put(`${url}/home/edit/${home?._id}`,formData);
      navigate("/admin/page")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHome = async () => {
    try {
      let data = await fetch(`${url}/home`);
      data = await data.json();
      console.log(data.data[0], "home");
      setOurProduct(data.data[0].our_products);
      setHome(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

const getProduct = async () => {
    try {
    let data = await fetch(`${url}/category`);
    data = await data.json();
    setProduct(data.data);
    console.log(data.data);
    } catch (error) {
    console.log(error);
    }
};

const handleCheck = useCallback((id) => {
    let index = ourProduct.findIndex((e) => e === id);
    if (index > -1) {
    return true;
    } else {
    return false;
    }
},[ourProduct])

  const handleChange = (id) => {
    let dup = [...ourProduct];
    let index = dup.findIndex((e)=>e===id)
    if (index > -1) {
      dup.splice(index, 1);
      if(dup.length<3){
        toast({
          title: "Our Product Not Added ",
          description: `${dup.length} product is not sufficient`,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }else{
        toast({
          title: "Our Product Removed ",
          description: `${dup.length} product is sufficient`,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } else {
      dup.push(id);
      if(dup.length<3){
        toast({
          title: "Our Product Not Added ",
          description: `${dup.length} product is not sufficient`,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }else{
        toast({
          title: "Our Product Added ",
          description: `${dup.length} product is sufficient`,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    }
    setOurProduct(dup);
  };
  useEffect(() => {
    getProduct();
    getHome();
  }, []);
  return (
    <Box p="4">
      <Box
        backgroundColor={"#white"}
        w={["100%", "100%", "100%", "100%", "100%"]}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
        textAlign={"left"}
      >
        <FormControl>
          <FormLabel>Our Products</FormLabel>
          {product.map((e) => {
            return (
              <>
                <Heading>{e.name}</Heading>
                <SimpleGrid columns={2}>
                  {e?.products.map((element) => {
                    return (
                      <Flex alignItems={"center"}>
                        <div class="checkbox-wrapper-55">
                          <label class="rocker rocker-small">
                            <input
                              type="checkbox"
                              checked={handleCheck(element._id)}
                              onChange={() => {
                                audio.play();
                                handleChange(element._id);
                              }}
                              // checked={getCheck(blog.first_toggle)}
                            />
                            <span class="switch-left">Yes</span>
                            <span class="switch-right">No</span>
                          </label>
                        </div>
                        <Text>{element?.name}</Text>
                      </Flex>
                    );
                  })}
                </SimpleGrid>
              </>
            );
          })}
        </FormControl>
      </Box>
      <br />
      <center>
        <form>
          <Button
            variant={"solid"}
            bgColor={"#161616"}
            color="white"
            _hover={{
              color: "black",
              bgColor: "white",
              border: "1px solid #161616",
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </form>
      </center>
    </Box>
  );
};

export default OurProduct;
