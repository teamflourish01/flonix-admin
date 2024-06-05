import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const InquiryForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/send", {
        name,
        email,
        message,
      });
      alert(response.data);
    } catch (error) {
      console.error("There was an error sending the message!", error);
      alert("Failed to send message.");
    }
  };

  return (
    <Center>
      <Box
        backgroundColor={"white"}
        w={["100%", "100%", "100%", "50%", "50%"]}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
        marginTop={"50px"}
      >
        <FormControl>
          <FormLabel htmlFor="name" color={"#add8e6"}>
            Name
          </FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email" color={"#add8e6"}>
            Email
          </FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="message" color={"#add8e6"}>
            Message
          </FormLabel>

          <Textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </FormControl>

        <Button
          onClick={handleSubmit}
          variant={"solid"}
          bgColor={"black"}
          color="#add8e6"
          marginTop={"20px"}
          _hover={{
            color: "black",
            bgColor: "#add8e6",
            border: "1px solid #add8e6",
          }}
        >
          Send Inquiry
        </Button>
      </Box>
    </Center>
  );
};

export default InquiryForm;
