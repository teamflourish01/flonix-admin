import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import switchAudio from "../audio/light-switch.mp3";
import axios from "axios";
import EditPermalink from "./EditPermalink";
import generateSlug from "../util/generateSlug";

const EditBlog = () => {
  const url = process.env.REACT_APP_DEV_URL;
  const { slugname } = useParams();
  const [blog, setBlog] = useState({});
  const [category, setCategory] = useState([]);
  const [text1, setText1] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [first, setFirst] = useState("");
  const [firstUrl, setFirstUrl] = useState("");
  const [secondUrl, setSecondUrl] = useState("");
  const [second, setSecond] = useState("");
  const [text2, setText2] = useState("");
  const [third, setThird] = useState("");
  const [thirdUrl, setThirdUrl] = useState("");
  const [text3, setText3] = useState("");
  const [slug, setSlug] = useState("");

  let audio = new Audio(switchAudio);
  const toast = useToast();
  const navigate = useNavigate();

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

  const getBlogCategory = async () => {
    try {
      let data = await fetch(`${url}/blogcategory`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBlog = async () => {
    try {
      let data = await fetch(`${url}/blog/${slugname}`);
      data = await data.json();
      setBlog(data.data);
      setText1(data.data.text1);
      setText2(data.data.text2);
      setText3(data.data.text3);
      setSlug(data.data.slug);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

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

  const handleImageUrl = (x) => {
    x("");
  };
  // Img_alt- Text Logic

  const hanldebnnrImgText = (e) => {
    let dup = [...blog.bannerimg_alt];
    dup = e.target.value;
    setBlog({ ...blog, bannerimg_alt: dup });
  };

  const handleFstImgText = (e) => {
    let dup = [...blog.firstimg_alt];
    dup = e.target.value;
    setBlog({ ...blog, firstimg_alt: dup });
  };
  const handleSecImgText = (e) => {
    let dup = [...blog.secondimg_alt];
    dup = e.target.value;
    setBlog({ ...blog, secondimg_alt: dup });
  };
  const handleThrdImgText = (e) => {
    let dup = [...blog.thirdimg_alt];
    dup = e.target.value;
    setBlog({ ...blog, thirdimg_alt: dup });
  };

  const editData = async () => {
    let formData = new FormData();
    let dup = { ...blog };
    if (banner) {
      formData.append("banner", banner);
    }
    if (first) {
      formData.append("first", first);
    }
    if (second) {
      formData.append("second", second);
    }
    if (third) {
      formData.append("third", third);
    }
    if (text1) {
      dup.text1 = text1;
    }
    if (text2) {
      dup.text2 = text2;
    }
    if (text3) {
      dup.text3 = text3;
    }
    let newSlug = generateSlug(slug);
    dup.slug = newSlug;
    formData.append("dup", JSON.stringify(dup));
    try {
      let data = await axios.post(`${url}/blog/edit/${slugname}`, formData);
      console.log(data);
      if (data.data) {
        toast({
          title: "Blog Edited Successfully",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/blog");
      } else {
        toast({
          title: "Blog Not Edited ",
          description: data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Blog Not Edited ",
        description: error.request.response,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleImageDelete = (x, y) => {
    setBlog({ ...blog, [x]: "", [y]: "" });
  };

  useEffect(() => {
    getBlog();
    getBlogCategory();
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
            <FormLabel color={"#add8e6"}>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={blog.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </FormControl>
          <br />
          <EditPermalink slug={slug} setSlug={setSlug} folder={"blog"} />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Banner Image</FormLabel>
            {blog?.banner_image && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${url}/blog/${blog?.banner_image}`} />
                  <Input
                    value={blog.bannerimg_alt}
                    onChange={(event) => hanldebnnrImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() =>
                    handleImageDelete("banner_image", "bannerimg_alt")
                  }
                />
              </Flex>
            )}
            {bannerUrl && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${bannerUrl}`} />
                  <Input
                    value={blog.bannerimg_alt}
                    onChange={(event) => hanldebnnrImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageUrl(setBannerUrl)}
                />
              </Flex>
            )}
            <Input
              type="file"
              name="banner"
              onChange={(e) => handleImageChanger(e, setBanner, setBannerUrl)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Category</FormLabel>
            <select
              name="category"
              style={{
                width: "200px",
                padding: "10px",
                margin: "10px",
                border: "1px solid #add8e6",
                borderRadius: "20px",
              }}
              onChange={(e) => handleChange(e)}
            >
              <option value={blog?.category?._id}>
                {blog?.category?.name}
              </option>
              {category &&
                category.map((e) => <option value={e._id}>{e?.name}</option>)}
            </select>
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>First Image</FormLabel>
            {blog?.first_image && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${url}/blog/${blog?.first_image}`} />
                  <Input
                    value={blog.firstimg_alt}
                    onChange={(event) => handleFstImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageDelete("first_image","firstimg_alt")}
                />
              </Flex>
            )}
            {firstUrl && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${firstUrl}`} />
                  <Input
                    value={blog.firstimg_alt}
                    onChange={(event) => handleFstImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageUrl(setFirstUrl)}
                />
              </Flex>
            )}
            <Input
              type="file"
              name="first"
              onChange={(e) => handleImageChanger(e, setFirst, setFirstUrl)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
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
            <FormLabel color={"#add8e6"}>Toggle First Image</FormLabel>
            <Text>Note: ON Switch for Showing Image Before Text</Text>
            <div class="checkbox-wrapper-55">
              <label class="rocker rocker-small">
                <input
                  type="checkbox"
                  checked={blog?.first_toggle}
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
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Second Image</FormLabel>
            {blog?.second_image && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${url}/blog/${blog?.second_image}`} />
                  <Input
                    value={blog.secondimg_alt}
                    onChange={(event) => handleSecImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageDelete("second_image","secondimg_alt")}
                />
              </Flex>
            )}
            {secondUrl && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${secondUrl}`} />
                  <Input
                    value={blog.secondimg_alt}
                    onChange={(event) => handleSecImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageUrl(setSecondUrl)}
                />
              </Flex>
            )}
            <Input
              type="file"
              name="first"
              onChange={(e) => handleImageChanger(e, setSecond, setSecondUrl)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}> Second Text</FormLabel>
            <ReactQuill
              modules={module}
              theme="snow"
              value={text2}
              onChange={setText2}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Toggle Second Image</FormLabel>
            <Text>Note: ON Switch for Showing Image Before Text</Text>
            <div class="checkbox-wrapper-55">
              <label class="rocker rocker-small">
                <input
                  type="checkbox"
                  checked={blog?.second_toggle}
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
          <br />

          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Third Image</FormLabel>
            {blog?.third_image && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${url}/blog/${blog?.third_image}`} />
                  <Input
                    value={blog.thirdimg_alt}
                    onChange={(event) => handleThrdImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageDelete("third_image","thirdimg_alt")}
                />
              </Flex>
            )}
            {thirdUrl && (
              <Flex>
                <Box>
                  <Image w="200px" src={`${thirdUrl}`} />
                  <Input
                    value={blog.thirdimg_alt}
                    onChange={(event) => handleThrdImgText(event)}
                  />
                </Box>
                <MdDelete
                  color="red"
                  size={"30px"}
                  onClick={() => handleImageUrl(setThirdUrl)}
                />
              </Flex>
            )}
            <Input
              type="file"
              name="first"
              onChange={(e) => handleImageChanger(e, setThird, setThirdUrl)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
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
            <FormLabel color={"#add8e6"}>Third Second Image</FormLabel>
            <Text>Note: ON Switch for Showing Image Before Text</Text>
            <div class="checkbox-wrapper-55">
              <label class="rocker rocker-small">
                <input
                  type="checkbox"
                  checked={blog?.third_toggle}
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
          <br />
          <Button
            bgColor={"black"}
            color="#add8e6"
            _hover={{ bgColor: "#add8e6", color: "black" }}
            onClick={editData}
            isDisabled={!slug}
          >
            Edit Item
          </Button>
        </Box>
      </center>
    </Box>
  );
};

export default EditBlog;
