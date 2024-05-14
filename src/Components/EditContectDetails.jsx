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
} from "@chakra-ui/react";

const EditContectDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    email: "",
    twiterlink: "",
    fblink: "",
    instalink: "",
    ytlink: "",
    pinterestlink: "",
    officeaddress: "",
    addresslink: "",
    officenumber: "",
  });

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

    try {
      const response = await fetch(`${url}/contect/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.status === 200) {
        alert("Data Update Successfuly");
        Navigate("/admin/contectdetails/");
      } else {
        throw new Error("Faild to update Data");
      }
    } catch (error) {
      console.error("Update faild", error);
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
                <FormLabel htmlFor="twiterlink" color={"#add8e6"}>
                  Twiter
                </FormLabel>
                <Input
                  id="twiterlink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="twiterlink"
                  value={item.twiterlink}
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
                <FormLabel htmlFor="pinterestlink" color={"#add8e6"}>
                  Pinterest
                </FormLabel>
                <Input
                  id="pinterestlink"
                  type="text"
                  variant={"flushed"}
                  placeholder="Enter your Heading"
                  name="pinterestlink"
                  value={item.pinterestlink}
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
                  type="text"
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
                <Textarea
                  id="addresslink"
                  placeholder="Enter your Address Link"
                  mb={4}
                  name="addresslink"
                  value={item.addresslink}
                  onChange={handleInput}
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
                />
              </FormControl>
            </Box>
          </Flex>
          <br />
          <center>
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
              Update All Items
            </Button>
          </center>
        </form>
      </Box>
    </>
  );
};

export default EditContectDetails;
