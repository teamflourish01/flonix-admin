import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const AddProduct = () => {
  const url = process.env.REACT_APP_DEV_URL;
  const [category, setCategory] = useState([]);
  const [imageurl, setImageurl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const toast = useToast();
  const [markImage, setMarkImage] = useState([]);
  const [markUrl, setMarkUrl] = useState([]);
  const [newParameter, setNewParameter] = useState("");
  const [newValue, setNewValue] = useState("");
  const [feature, setFeature] = useState({});
  const [featureParam, setFeatureParam] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const [detail, setDetail] = useState({});
  const [detailParameter, setDetailParameter] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    image: [],
    image_alt:[],
    key_features: [],
    mark: [],
    mark_text: [],
    specification: {},
    details: {},
    performance: {},
  });

  const [spec, setSpec] = useState({});
  let formData = new FormData();
  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/category`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFeatureEntry = () => {
    if (featureParam && featureValue) {
      setFeature((prev) => ({
        ...prev,
        [featureParam]: featureValue,
      }));
      setFeatureParam("");
      setFeatureValue("");
    }
  };

  const handleFeatureChange = (parameter, value) => {
    setFeature((prev) => ({ ...prev, [parameter]: value }));
  };

  const addDetailEntry = () => {
    if (detailParameter && detailValue) {
      setDetail((prevData) => ({
        ...prevData,
        [detailParameter]: detailValue,
      }));
      setDetailParameter("");
      setDetailValue("");
    }
  };

  const handleDetailChange = (parameter, value) => {
    setDetail((prev) => ({ ...prev, [parameter]: value }));
  };

  const handleValueChange = (parameter, value) => {
    setSpec((prevData) => ({
      ...prevData,
      [parameter]: value,
    }));
  };

  const addNewEntry = () => {
    if (newParameter && newValue) {
      setSpec((prevData) => ({
        ...prevData,
        [newParameter]: newValue,
      }));
      setNewParameter("");
      setNewValue("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleMarkText = (event, i) => {
    let markText = [...product.mark_text];
    markText[i] = event.target.value;
    setProduct({ ...product, mark_text: markText });
  };
  const handleImgText = (event, i) => {
    let imgText = [...product.image_alt];
    imgText[i] = event.target.value;
    setProduct({ ...product, image_alt: imgText });
  };
  const handleImageLocal = (i) => {
    console.log(i);
    let dup = [...imageurl];
    dup.splice(i, 1);
    setImageurl(dup);
    let dupImage = [...image];
    dupImage.splice(i, 1);
    setImage(dupImage);

    let dupText = [...product.image_alt];
    dupText.splice(i, 1);
    setProduct({ ...product, image_alt: dupText });
  };

  const handleImageChanger = (e) => {
    let file = e.target.files[0];
    setImage([...image, file]);
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setImageurl([...imageurl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const submitMark = async () => {
    let formData = new FormData();
    if (markUrl.length <= 0) {
      return;
    }
    for (let x of markImage) {
      formData.append("product", x);
    }
    try {
      let data = await axios.post(`${url}/product/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const submitFile = async () => {
    if (imageurl.length <= 0) {
      return;
    }
    for (let x of image) {
      formData.append("product", x);
    }
    try {
      let data = await axios.post(`${url}/product/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkLocal = (i) => {
    console.log(i);
    let dup = [...markUrl];
    dup.splice(i, 1);
    setMarkUrl(dup);
    let dupImage = [...markImage];
    dupImage.splice(i, 1);
    setMarkImage(dupImage);

    let dupText = [...product.mark_text];
    dupText.splice(i, 1);
    setProduct({ ...product, mark_text: dupText });
  };

  const handleMarkChanger = (e) => {
    let file = e.target.files[0];
    setMarkImage([...markImage, file]);
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setMarkUrl([...markUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleAddFeature = () => {
    setProduct({ ...product, key_features: [...product.key_features, ""] });
  };

  const handleKeyFeature = (e, i) => {
    let newFeature = [...product.key_features];
    newFeature[i] = e.target.value;
    setProduct({ ...product, key_features: newFeature });
  };

  const handleAdd = async (imageArr, markArr) => {
    let dup = { ...product };

    if (imageArr?.length > 0) {
      dup.image = imageArr;
    }
    if (markArr?.length > 0) {
      dup.mark = markArr;
    }
    if (spec) {
      dup.specification = spec;
    }
    if (detail) {
      dup.details = detail;
    }
    if (feature) {
      dup.performance = feature;
    }
    try {
      let res = await fetch(`${url}/product/add`, {
        method: "POST",
        body: JSON.stringify(dup),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(res.ok);
      if (res.ok) {
        toast({
          title: "Product Added",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Product Not Added ",
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
              value={product.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          {/* <FormControl isRequired>
          <FormLabel color={"#add8e6"}> Caption</FormLabel>
          <Input
            required
            variant={"flushed"}
            type="text"
            name="caption"
            value={product.caption}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <br /> */}
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
                setProduct({ ...product, category: e.target.value });
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
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Description</FormLabel>
            <Textarea
              variant="flushed"
              name="description"
              value={product.description}
              onChange={(e) => handleChange(e)}
              maxLength={850}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <Flex justifyContent={"space-between"}>
              <FormLabel color={"#add8e6"}>Key Features</FormLabel>
              <Button onClick={handleAddFeature}>+</Button>
            </Flex>
            {product.key_features.map((e, i) => {
              return (
                <Input
                  key={i}
                  value={e}
                  onChange={(event) => handleKeyFeature(event, i)}
                />
              );
            })}
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Testing </FormLabel>
            {markUrl &&
              markUrl.map((e, i) => {
                return (
                  <Flex key={i}>
                    <Box>
                      <Image src={e} w={"200px"} />
                      <Input
                        value={product.mark_text[i]}
                        onChange={(event) => handleMarkText(event, i)}
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={() => handleMarkLocal(i)}
                    />
                  </Flex>
                );
              })}
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="product"
                onChange={(e) => handleMarkChanger(e)}
              />
            </form>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Specification</FormLabel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Parameter</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {spec &&
                  Object.entries(spec).map(([parameter, value], index) => (
                    <Tr key={parameter}>
                      <Td>
                        <Input type="text" value={parameter} />
                      </Td>
                      <Td>
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(parameter, e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            let dup = { ...spec };
                            delete dup[parameter];
                            setSpec(dup);
                          }}
                        >
                          <IoIosRemove size="25px" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>New Add</Th>
                  <Th>New Add</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input
                      type="text"
                      placeholder="New Parameter"
                      value={newParameter}
                      onChange={(e) => setNewParameter(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="text"
                      placeholder="New Value"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Button onClick={addNewEntry}>
                      <GrFormAdd size="25px" />
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </FormControl>
        </Box>
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          w={["100%", "100%", "100%", "100%", "100%"]}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Product Images</FormLabel>
            {imageurl &&
              imageurl.map((e, i) => {
                return (
                  <div key={i}>
                    <Flex gap="20px">
                      <Box>
                        <Image src={e} width="200px" />
                        <Input
                          value={product.image_alt[i]}
                          onChange={(event) => handleImgText(event, i)}
                          placeholder="Add IMG ALT Text"
                        />
                        <br />
                      </Box>
                      <MdDelete
                        color="red"
                        cursor={"pointer"}
                        size={"30px"}
                        onClick={() => handleImageLocal(i)}
                      />
                    </Flex>
                  </div>
                );
              })}
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="product"
                onChange={(e) => handleImageChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
              Be Less than 500KB and 200x200px size will allow Only
            </Text>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Product Details</FormLabel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Parameter</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {detail &&
                  Object.entries(detail).map(([parameter, value], index) => (
                    <Tr key={parameter}>
                      <Td>
                        <Input type="text" value={parameter} />
                      </Td>
                      <Td>
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleDetailChange(parameter, e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            let dup = { ...detail };
                            delete dup[parameter];
                            setDetail(dup);
                          }}
                        >
                          <IoIosRemove size="25px" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>New Add</Th>
                  <Th>New Add</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input
                      type="text"
                      placeholder="New Parameter"
                      value={detailParameter}
                      onChange={(e) => setDetailParameter(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="text"
                      placeholder="New Value"
                      value={detailValue}
                      onChange={(e) => setDetailValue(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Button onClick={addDetailEntry}>
                      <GrFormAdd size="25px" />
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel color={"#add8e6"}>Performance Features</FormLabel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Parameter</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {feature &&
                  Object.entries(feature).map(([parameter, value], index) => (
                    <Tr key={parameter}>
                      <Td>
                        <Input type="text" value={parameter} />
                      </Td>
                      <Td>
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleFeatureChange(parameter, e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            let dup = { ...detail };
                            delete dup[parameter];
                            setFeature(dup);
                          }}
                        >
                          <IoIosRemove size="25px" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Table>
              <Thead>
                <Tr>
                  <Th>New Add</Th>
                  <Th>New Add</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input
                      type="text"
                      placeholder="New Parameter"
                      value={featureParam}
                      onChange={(e) => setFeatureParam(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="text"
                      placeholder="New Value"
                      value={featureValue}
                      onChange={(e) => setFeatureValue(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Button onClick={addFeatureEntry}>
                      <GrFormAdd size="25px" />
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </FormControl>
        </Box>
      </Flex>
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
          onClick={() => {
            Promise.all([submitFile(), submitMark()])
              .then((res) => handleAdd(res[0], res[1]))
              .catch((err) => console.log(err));
          }}
          isDisabled={!product.name}
        >
          Add New
        </Button>
      </center>
    </Box>
  );
};

export default AddProduct;
