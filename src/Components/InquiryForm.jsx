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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token =
      "EAAVXY2LxPugBO3kZCU9rZAGLVy5ZCA1C5XO1jN2tMIZA6gLnvoaa38ZAOTyiKWOHkwygPlglZCDOxVUOWouYjQzIrkcdyB5W4ccfjQG1LLH1YuEeU0hw4ySWyjLNmszXjrDQ8IBdBXMk7mKhGZBQiZBoFDbTy74bmkx26vl8LNeA5r8rsaickFMn4h41xRqUYS3tme9Sp1x45NUi2saZCeVWl";
    const phoneNumberId = "305990135939726";
    const recipientPhone = "917575043888";

    const messageData = {
      messaging_product: "whatsapp",
      to: recipientPhone,
      type: "text",
      template: {
        name: "your_template_name",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: formData.name },
              { type: "text", text: formData.email },
              { type: "text", text: formData.message },
            ],
          },
        ],
      },
    };

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
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
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="name" color={"#add8e6"}>
              Name
            </FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              mb={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email" color={"#add8e6"}>
              Message
            </FormLabel>

            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Button
            type="submit"
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
        </form>
      </Box>
    </Center>
  );
};

export default InquiryForm;
