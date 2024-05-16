import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import switchAudio from "../audio/light-switch.mp3";
import "../styles/checkbox.css";
import axios from "axios";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    name: "",
    banner_image: "",
    first_image: "",
    first_toggle: false,
    text1: "",
    text2: "",
    second_image: "",
    second_toggle: false,
    text3: "",
    third_image: "",
    third_toggle: false,
    category: "",
  });

  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");

  const [bannerUrl, setBannerUrl] = useState("");

  const [firstUrl, setFirstUrl] = useState("");
  const [secondUrl, setSecondUrl] = useState("");
  const [thirdUrl, setThirdUrl] = useState("");

  const url = process.env.REACT_APP_DEV_URL;
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  let audio = new Audio(switchAudio);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "formula"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  //                    get Dagta

  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/blogcategory`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //                  handle changes

  const handleImageChanger = (e, img, url) => {
    let file = e.target.files[0];
    img(file);
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        url(reader.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleImageLocal = (img, url) => {
    img("");
    url("");
  };

  //                  upload data

  const handleSave = async() => {
    let formData=new FormData()
    let dup = { ...blog };
    if (text1) {
      dup.text1 = text1;
    }
    if (text2) {
      dup.text2 = text2;
    }
    if (text3) {
      dup.text3 = text3;
    }
    if (banner) {
     formData.append("banner",banner)
    }
    if (first) {
      formData.append("first",first)
    }
    if (second) {
      formData.append("second",second)
    }
    if(third){
      formData.append("third",third)
    }
    setBlog(dup);
    console.log(dup);
    formData.append("dup",JSON.stringify(dup))
    try {
      let data=await axios.post(`${url}/blog/add`,formData)
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Box p="4">
      <Flex
        justifyContent={"space-around"}
        gap="40px"
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <Box
          backgroundColor={"#F2F5F7"}
          w={["100%", "100%", "100%", "100%", "90%"]}
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
              value={blog.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Category</FormLabel>
            <select
              style={{
                width: "200px",
                padding: "10px",
                margin: "10px",
                border: "1px solid #add8e6",
                borderRadius: "20px",
              }}
              onChange={(e) => {
                setBlog({ ...blog, category: e.target.value });
              }}
            >
              <option>Select</option>
              {category &&
                category.map((e) => (
                  <option key={e?._id} value={e?._id}>
                    {e?.name}
                  </option>
                ))}
            </select>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Banner Image</FormLabel>
            {bannerUrl && (
              <Flex>
                <Image h="200px" src={bannerUrl} alt="banner" />
                <MdDelete
                  color="red"
                  cursor={"pointer"}
                  size={"30px"}
                  onClick={() => handleImageLocal(setBanner, setBannerUrl)}
                />
              </Flex>
            )}
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="banner"
                onChange={(e) => handleImageChanger(e, setBanner, setBannerUrl)}
              />
            </form>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Toggle First Image</FormLabel>
            <Text>Note: ON Switch for Showing Image Before Text</Text>
            <div class="checkbox-wrapper-55">
              <label class="rocker rocker-small">
                <input
                  type="checkbox"
                  onChange={() => {
                    audio.play();
                    setBlog({ ...blog, first_toggle: !blog.first_toggle });
                  }}
                  // checked={getCheck(blog.first_toggle)}
                />
                <span class="switch-left">Yes</span>
                <span class="switch-right">No</span>
              </label>
            </div>
          </FormControl>

          <FormControl>
            <FormLabel color={"#add8e6"}>First Text</FormLabel>
            <ReactQuill
              modules={module}
              theme="snow"
              value={text1}
              onChange={setText1}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>First Image</FormLabel>
            {firstUrl && (
              <Flex>
                <Image src={firstUrl} h="200px" />
                <MdDelete
                  color="red"
                  cursor={"pointer"}
                  size={"30px"}
                  onClick={() => handleImageLocal(setFirst, setFirstUrl)}
                />
              </Flex>
            )}
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="first"
                onChange={(e) => handleImageChanger(e, setFirst, setFirstUrl)}
              />
            </form>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Toggle Second Image</FormLabel>
            <Text>Note: ON Switch for Showing Image Before Text</Text>
            <div class="checkbox-wrapper-55">
              <label class="rocker rocker-small">
                <input
                  type="checkbox"
                  onChange={() => {
                    audio.play();
                    setBlog({ ...blog, second_toggle: !blog.second_toggle });
                  }}
                  // checked={getCheck(blog.first_toggle)}
                />
                <span class="switch-left">Yes</span>
                <span class="switch-right">No</span>
              </label>
            </div>
          </FormControl>
          <FormControl>
            <FormLabel color={"#add8e6"}>Second Text</FormLabel>
            <ReactQuill
              modules={module}
              theme="snow"
              value={text2}
              onChange={setText2}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Second Image</FormLabel>
            {secondUrl && (
              <Flex>
                <Image src={secondUrl} h="200px" />
                <MdDelete
                  color="red"
                  cursor={"pointer"}
                  size={"30px"}
                  onClick={() => handleImageLocal(setSecond, setSecondUrl)}
                />
              </Flex>
            )}
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="second"
                onChange={(e) => handleImageChanger(e, setSecond, setSecondUrl)}
              />
            </form>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Toggle Third Image</FormLabel>
            <Text>Note: ON Switch for Showing Image Before Text</Text>
            <div class="checkbox-wrapper-55">
              <label class="rocker rocker-small">
                <input
                  type="checkbox"
                  onChange={() => {
                    audio.play();
                    setBlog({ ...blog, third_toggle: !blog.third_toggle });
                  }}
                  // checked={getCheck(blog.first_toggle)}
                />
                <span class="switch-left">Yes</span>
                <span class="switch-right">No</span>
              </label>
            </div>
          </FormControl>
          <FormControl>
            <FormLabel color={"#add8e6"}>Third Text</FormLabel>
            <ReactQuill
              modules={module}
              theme="snow"
              value={text3}
              onChange={setText3}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Third Image</FormLabel>
            {thirdUrl && (
              <Flex>
                <Image src={thirdUrl} h="200px" />
                <MdDelete
                  color="red"
                  cursor={"pointer"}
                  size={"30px"}
                  onClick={() => handleImageLocal(setThird, setThirdUrl)}
                />
              </Flex>
            )}
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="third"
                onChange={(e) => handleImageChanger(e, setThird, setThirdUrl)}
              />
            </form>
          </FormControl>
          <br />
        </Box>
      </Flex>
      <br />
      <center>
        <Button
          variant={"solid"}
          bgColor={"#161616"}
          color="#add8e6"
          _hover={{
            color: "black",
            bgColor: "#add8e6",
            border: "1px solid #add8e6",
          }}
          onClick={handleSave}
          isDisabled={!blog.name}
        >
          Save
        </Button>
      </center>
    </Box>
  );
};

export default AddBlog;