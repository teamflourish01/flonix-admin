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
  Hide,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const EditContectDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    email: "",
    whatsapplink: "",
    fblink: "",
    instalink: "",
    ytlink: "",
    officeaddress: "",
    addresslink: "",
    officenumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const getContectById = async () => {
    try {
      const response = await fetch(`${url}/contect/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContectById();
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
      const response = await fetch(`${url}/contect/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast({
          title: "Data Added Successfuly",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/contectdetails/");
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
      <br />
      <Box p="4" marginLeft="25px">
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
                <FormLabel htmlFor="email" color={"#add8e6"}>
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="email"
                  value={item.email}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="whatsapplink" color={"#add8e6"}>
                  WhatsApp
                </FormLabel>
                <Input
                  id="whatsapplink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Link"
                  name="whatsapplink"
                  value={item.whatsapplink}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="fblink" color={"#add8e6"}>
                  FaceBook
                </FormLabel>
                <Input
                  id="fblink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="fblink"
                  value={item.fblink}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="instalink" color={"#add8e6"}>
                  Instagram
                </FormLabel>
                <Input
                  id="instalink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="instalink"
                  value={item.instalink}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
            </Box>
            <Box
              backgroundColor={"lightwhite"}
              w={["100%", "100%", "100%", "100%", "50%"]}
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              padding={"20px"}
              borderRadius={"20px"}
            >
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="ytlink" color={"#add8e6"}>
                  YouTube
                </FormLabel>
                <Input
                  id="ytlink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="ytlink"
                  value={item.ytlink}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>

              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="officenumber" color={"#add8e6"}>
                  Office Number
                </FormLabel>
                <Input
                  id="officenumber"
                  type="number"
                  variant={"flushed"}
                  placeholder="Enter your contect-Number"
                  name="officenumber"
                  value={item.officenumber}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="addresslink" color={"#add8e6"}>
                  Address Link
                </FormLabel>
                <Input
                  id="addresslink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="addresslink"
                  value={item.addresslink}
                  onChange={handleInput}
                  mb={4}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="officeaddress" color={"#add8e6"}>
                  Office Address
                </FormLabel>
                <Textarea
                  id="officeaddress"
                  placeholder="Enter your Address"
                  mb={4}
                  name="officeaddress"
                  value={item.officeaddress}
                  onChange={handleInput}
                  maxLength={200}
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

export default EditContectDetails;
