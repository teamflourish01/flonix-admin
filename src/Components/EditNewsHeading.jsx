import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const EditNewsHeading = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    heading: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getNewsHeadingById = async () => {
    try {
      const response = await fetch(`${url}/newsheading/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewsHeadingById();
  }, [id]);

  // edit logic

  const handleInput = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/newsheading/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast({
          title: "Data Edit Successfuly",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/page/");
      } else {
        toast({
          title: "Data Not Update ",
          description: data.msg,
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
      <br />
      <Box p="4">
        <form onSubmit={handleSubmit}>
          <Flex
            justifyContent={"space-around"}
            gap="20px"
            flexDirection={["column", "column", "column", "row", "row"]}
          >
            <Box
              backgroundColor={"lightwhite"}
              w={["100%", "100%", "100%", "100%", "50%"]}
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              padding={"20px"}
              borderRadius={"20px"}
            >
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="heading" color={"#add8e6"}>
                  News Heading
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
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description" color={"#add8e6"}>
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter your Description"
                  mb={4}
                  name="description"
                  value={item.description}
                  onChange={handleInput}
                />
              </FormControl>
            </Box>
          </Flex>
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
        </form>
      </Box>
    </>
  );
};

export default EditNewsHeading;
