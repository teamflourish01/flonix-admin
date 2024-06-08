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
import { useNavigate, useParams } from "react-router-dom";
import EditPermalink from "./EditPermalink";
import generateSlug from "../util/generateSlug";

const EditProduct = () => {
  const { slugname } = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [spec, setSpec] = useState({});
  const [newParameter, setNewParameter] = useState("");
  const [newValue, setNewValue] = useState("");
  const [dataUrl, setDataUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [markUrl, setMarkUrl] = useState([]);
  const [mark, setMark] = useState([]);
  const [markText, setMarkText] = useState([]);
  const [imgText, setImgText] = useState([]);
  const [detail, setDetail] = useState({});
  const [detailParameter, setDetailParameter] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [feature, setFeature] = useState({});
  const [featureParameter, setFeatureParameter] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [slug,setSlug]=useState("")

  const url = process.env.REACT_APP_DEV_URL;

  //                         getting data

  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/category`);
      data = await data.json();
      console.log(data.data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      let data = await fetch(`${url}/product/${slugname}`);
      data = await data.json();
      console.log(data);
      setProduct(data.data);
      setSpec(data.data?.specification);
      setDetail(data.data?.details);
      setFeature(data.data?.performance);
      setSlug(data.data?.slug)
    } catch (error) {
      console.log(error);
    }
  };

  //                    handle changer

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
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleValueChange = (parameter, value) => {
    setSpec((prevData) => ({
      ...prevData,
      [parameter]: value,
    }));
  };

  const handleImageLocal = (index) => {
    // let dup = [...image];
    // let dupUrl = [...dataUrl];
    // let dupText = [...imgText];
    // dupText.splice(i, 1);
    // dup.splice(i, 1);
    // dupUrl.splice(i, 1);
    // setImage(dup);
    // setDataUrl(dupUrl);
    // setImgText(dupText);

    // //remove image_Alt
    // let dupProductAlt = [...product.image_alt];
    // dupProductAlt.splice(i, 1);
    // setProduct({ ...product, image_alt: dupProductAlt });

    setImage((prev) => prev.filter((_, i) => i !== index));
    setDataUrl((prev) => prev.filter((_, i) => i !== index));
    setImgText((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImage = (index) => {
    let dup = [...product.image];
    dup.splice(index, 1);

    // Remove imag_alt
    let dupProductAlt = [...product.image_alt];
    dupProductAlt.splice(index, 1);
    setProduct({ ...product, image: dup, image_alt: dupProductAlt });
  };

  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    console.log(file);
    // setImage(file);
    setImage([...image, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // setDataUrl(reader.result);
        setDataUrl([...dataUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleMarkText = (e, i) => {
    // let markText = [...product.mark_text];
    // markText[i] = e.target.value;
    // setProduct({ ...product, mark_text: markText });
    let marktext = [...markText];
    marktext[i] = e.target.value;
    setMarkText([...marktext]);
  };
  const handleImgText = (e, i) => {
    let imagetext = [...imgText];
    imagetext[i] = e.target.value;
    setImgText([...imagetext]);
  };
  const handleMarkLocal = (i) => {
    let dup = [...mark];
    let dupUrl = [...markUrl];
    let dupText = [...markText];
    dupText.splice(i, 1);
    dup.splice(i, 1);
    dupUrl.splice(i, 1);
    setMark(dup);
    setMarkUrl(dupUrl);
    setMarkText(dupText);
  };

  const handleMarkChanger = (e) => {
    let file = e.target.files[0];
    setMark([...mark, file]);
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

  const handleremoveFeature = (i) => {
    let dup = [...product?.key_features];
    dup.splice(i, 1);
    setProduct({ ...product, key_features: dup });
  };

  const handleMarkTextData = (e, i) => {
    let dup = [...product.mark_text];
    dup[i] = e.target.value;
    setProduct({ ...product, mark_text: dup });
  };
  const handleImgTextData = (e, i) => {
    let dup = [...product.image_alt];
    dup[i] = e.target.value;
    setProduct({ ...product, image_alt: dup });
  };
  const handleMark = (i) => {
    let dup = [...product.mark];
    dup.splice(i, 1);
    setProduct({ ...product, mark: dup });
  };

  const handleDetailChange = (parameter, value) => {
    setDetail((prevData) => ({
      ...prevData,
      [parameter]: value,
    }));
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

  const addFeatureEntry = () => {
    if (featureParameter && featureValue) {
      setFeature((prev) => ({
        ...prev,
        [featureParameter]: featureValue,
      }));
    }
  };

  const handleFeatureChange = (parameter, value) => {
    setFeature((prevData) => ({
      ...prevData,
      [parameter]: value,
    }));
  };

  //                                      send data

  const handleUpdate = async () => {
    let formData = new FormData();
    let dup = { ...product };
    if (image.length > 0) {
      // dup.image=[...dup.image,...image]
      for (let x of image) {
        formData.append("product", x);
      }
    }
    if (mark.length > 0) {
      // dup.mark=[...dup.mark,...mark]
      for (let x of mark) {
        formData.append("marks", x);
      }
    }
    if (markText.length > 0) {
      dup.mark_text = [...dup.mark_text, ...markText];
    }
    if (imgText.length > 0) {
      dup.image_alt = [...dup.image_alt, ...imgText];
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
    let newSlug=generateSlug(slug)
    dup.slug=newSlug
    console.log(dup, "dup");
    formData.append("dup", JSON.stringify(dup));
    try {
      let data = await axios.post(`${url}/product/edit/${slugname}`, formData);
      console.log(data);
      if (data.status == 200) {
        toast({
          title: "Product Edited Successfully",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/product");
      } else {
        toast({
          title: "Product Not Edited ",
          description: data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Product Not Edited ",
        description: error.message,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  return (
    <Box>
      <Flex justifyContent={"space-around"} gap="40px">
        <Box
          backgroundColor={"white"}
          w="700px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Meta Title</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="meta_title"
              value={product.meta_title}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Meta Description</FormLabel>
            <Textarea
              variant="flushed"
              name="meta_description"
              value={product.meta_description}
              onChange={(e) => handleChange(e)}
              maxLength={"250"}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <EditPermalink slug={slug} setSlug={setSlug} folder={"product"} />
          <FormControl>
            <FormLabel>Category</FormLabel>
            <select
              style={{
                width: "200px",
                padding: "10px",
                margin: "10px",
                border: "1px solid #add8e6",
                borderRadius: "20px",
              }}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option value={product.category?._id}>
                {product.category?.name}
              </option>
              {category &&
                category.map((e) => <option value={e?._id}>{e.name}</option>)}
            </select>
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              variant="flushed"
              name="description"
              value={product.description}
              onChange={(e) => handleChange(e)}
              maxLength={"250"}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <Flex justifyContent={"space-between"}>
              <FormLabel color={"#add8e6"}>Key Features</FormLabel>
              <Button onClick={handleAddFeature}>+</Button>
            </Flex>
            {product?.key_features?.map((e, i) => {
              return (
                <Flex gap={"20px"} mt={"10px"}>
                  <Input
                    key={i}
                    value={e}
                    onChange={(event) => handleKeyFeature(event, i)}
                  />
                  <Button onClick={() => handleremoveFeature(i)}>-</Button>
                </Flex>
              );
            })}
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel color={"#add8e6"}>Testing </FormLabel>
            {product?.mark &&
              product.mark.map((e, i) => {
                return (
                  <Flex key={i}>
                    <Box>
                      <Image src={`${url}/product/${e}`} w={"200px"} />
                      <Input
                        value={product.mark_text[i]}
                        onChange={(event) => handleMarkTextData(event, i)}
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      cursor={"pointer"}
                      size={"30px"}
                      onClick={() => handleMark(i)}
                    />
                  </Flex>
                );
              })}
            {markUrl &&
              markUrl.map((e, i) => {
                return (
                  <Flex key={i}>
                    <Box>
                      <Image src={e} w={"200px"} />
                      <Input
                        value={markText[i]}
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
                name="marks"
                onChange={(e) => handleMarkChanger(e)}
              />
            </form>
          </FormControl>
          <br />
          <Text fontWeight={"bold "}>Specifications</Text>
          <br />
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
                <Th>Add New</Th>
                <Th>Add New</Th>
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
          <Box></Box>
        </Box>
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Product Image</FormLabel>
            {dataUrl &&
              dataUrl?.map((e, i) => {
                return (
                  <>
                    <Flex key={i}>
                      <Box>
                        <Image src={e} width="200px" />
                        <Input
                          value={imgText[i]}
                          onChange={(event) => handleImgText(event, i)}
                        />
                      </Box>
                      <MdDelete
                        color="red"
                        size={"30px"}
                        onClick={() => handleImageLocal(i)}
                      />
                    </Flex>
                  </>
                );
              })}
            {product?.image &&
              product.image.map((e, i) => {
                return (
                  <>
                    <Flex gap="20px">
                      <Box>
                        <Image width="200px" src={`${url}/product/${e}`} />
                        <Input
                          value={product.image_alt[i]}
                          onChange={(event) => handleImgTextData(event, i)}
                        />
                      </Box>
                      <MdDelete
                        color="red"
                        cursor="pointer"
                        size={"30px"}
                        onClick={() => handleImage(i)}
                      />
                    </Flex>
                  </>
                );
              })}
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="product"
                onChange={(e) => handleFileChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
              Be Less than 500KB and 500x500px size will allow Only
            </Text>
          </FormControl>
          <br />
          <Text fontWeight={"bold "}>Product Details</Text>
          <br />
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
                <Th>Add New</Th>
                <Th>Add New</Th>
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
          <br />
          <Text fontWeight={"bold "}>Performance Feature</Text>
          <br />
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
                          let dup = { ...feature };
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
                <Th>Add New</Th>
                <Th>Add New</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Input
                    type="text"
                    placeholder="New Parameter"
                    value={featureParameter}
                    onChange={(e) => setFeatureParameter(e.target.value)}
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
          leftIcon={isLoading && <Spinner color="blue.500" />}
          onClick={() => handleUpdate()}
        >
          Save
        </Button>
      </center>
    </Box>
  );
};

export default EditProduct;
