import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditOutlet = () => {
  const [outlet, setOutlet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const url = process.env.REACT_APP_DEV_URL;
  const toast=useToast()
  const navigate=useNavigate()
  const handleUpdate = async() => {
    try {
        setIsLoading(true)
        let res=await fetch(`${url}/outlet/edit/${id}`,{
            method: 'POST',
            body: JSON.stringify(outlet),
            headers:{
                "Content-Type": "application/json"
            }
        })
        let data=await res.json()
        setIsLoading(false)
        if(res.ok){
            toast({
                title: "Outlet updated successfully",
                description: data.msg,
                status: "success",
                position: "top",
                duration: 7000,
                isClosable: true,
            });
            navigate("/admin/contact")
        }else{
            toast({
                title: "Outlet Not Edited",
                description: data.msg,
                status: "error",
                position: "top",
                duration: 7000,
                isClosable: true,
              });
        }
    } catch (error) {
        console.log(error);
    }
  };

  const handleChange = (e) => {
    let {name,value}=e.target
    setOutlet({...outlet,[name]:value})
  };
  const getOutlet = async() => {
    try {
        let data=await fetch(`${url}/outlet/${id}`)
        data=await data.json()
        setOutlet(data.data)
    } catch (error) {
        console.log(error);
    }
  };
  useEffect(()=>{
    getOutlet()
  },[])
  return (
    <Box>
      <Box p="40px">
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="name"
              value={outlet?.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Textarea
              variant="flushed"
              name="address"
              value={outlet?.address}
              onChange={(e) => handleChange(e)}
              maxLength={"250"}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Address Link</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="address_url"
              value={outlet?.address_url}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Mobile</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="mobile"
              value={outlet?.mobile}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
        </Box>
      </Box>
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
          leftIcon={isLoading && <Spinner color="blue.500" />}
          onClick={() => handleUpdate()}
        >
          Save
        </Button>
      </center>
    </Box>
  );
};

export default EditOutlet;
