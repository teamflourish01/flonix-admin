import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPermalink from "./EditPermalink";
import getSlug from "speakingurl";
import generateSlug from "../util/generateSlug";

const EditBlogCategory = () => {
  const { slugname } = useParams();
  const [category, setCategory] = useState({});
  const url = process.env.REACT_APP_DEV_URL;
  const toast = useToast();
  const navigate = useNavigate();
  const [slug,setSlug]=useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/blogcategory/${slugname}`);
      data = await data.json();
      setCategory(data.data[0]);
      setSlug(data.data[0].slug)
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async () => {
    // debugger
    let dup=generateSlug(slug)
    try {
      let data = await fetch(`${url}/blogcategory/edit/${slugname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...category,slug:dup}),
      });
      data = await data.json();
      // console.log(data);
      if (data.data) {
        toast({
          title: "Category Updated",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid Response",
          description: data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
      navigate("/admin/blogcategory");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Box p="4">
      <center>
        <Box
          width={"50%"}
          padding="20px"
          border={"1px solid #add8e6"}
          borderRadius={"20px"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
          }
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={category?.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <EditPermalink slug={slug} folder={"blogcategory"} setSlug={setSlug} />
          <Button
            bgColor={"black"}
            color="#add8e6"
            _hover={{ bgColor: "#add8e6", color: "black" }}
            onClick={editData}
          >
            Edit Item
          </Button>
        </Box>
      </center>
    </Box>
  );
};

export default EditBlogCategory;
