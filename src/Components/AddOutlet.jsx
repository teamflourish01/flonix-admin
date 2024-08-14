import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddOutlet = () => {
  const [outlet, setOutlet] = useState({
    name: "",
    address: "",
    address_url: "",
    mobile: "",
  });
  const url=process.env.REACT_APP_DEV_URL

  const [isLoading, setIsLoading] = useState(false);
  const toast=useToast()
  const navigate=useNavigate()

  const handleChange = (e) => {
    let { name, value } = e.target;
    setOutlet({ ...outlet, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
        let res=await fetch(`${url}/outlet/add`,{
            method: 'POST',
            body: JSON.stringify(outlet),
            headers:{
                "Content-Type": "application/json"
            }
        })
        let data=await res.json()
        console.log(data);
    setIsLoading(false)
        if(res.ok){
            toast({
                title: "Outlet Added",
                description: data.msg,
                status: "success",
                position: "top",
                duration: 7000,
                isClosable: true,
              });
              navigate("/admin/contact")
        }else{
            toast({
                title: "Outlet Not Added ",
                description: data.msg,
                status: "error",
                position: "top",
                duration: 7000,
                isClosable: true,
              });
        }

    } catch (error) {
        toast({
            title: "Outlet Not Added ",
            description: error.message,
            status: "error",
            position: "top",
            duration: 7000,
            isClosable: true,
          });
    }
  };
  return (
    <Box p="4">
      <Box>
        <Box
          backgroundColor={"white"}
          w={["100%", "100%", "100%", "100%", "100%"]}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Name</FormLabel>
            <Input
              required
              variant={"flushed"}
              type="text"
              name="name"
              value={outlet.name}
              onChange={(e) => handleChange(e)}
              maxLength={80}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Address</FormLabel>
            <Textarea
              variant="flushed"
              name="address"
              value={outlet.address}
              onChange={(e) => handleChange(e)}
              maxLength={150}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Address Link</FormLabel>
            <Input
              required
              variant={"flushed"}
              type="text"
              name="address_url"
              value={outlet.address_url}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Mobile</FormLabel>
            <Input
              required
              variant={"flushed"}
              type="text"
              name="mobile"
              value={outlet.mobile}
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
          bgColor={"black"}
          color="#add8e6"
          _hover={{
            color: "black",
            bgColor: "#add8e6",
            border: "1px solid #add8e6",
          }}
          leftIcon={isLoading && <Spinner color="blue.500" />}
          // onClick={() => submitFile().then((res) => handleAdd(res))}
          onClick={() => handleSubmit()}
          isDisabled={!outlet.name}
        >
          Add New
        </Button>
      </center>
    </Box>
  );
};

export default AddOutlet;
