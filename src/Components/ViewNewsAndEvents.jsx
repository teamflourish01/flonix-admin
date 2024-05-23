import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Flex,
  Text,
  Textarea,
  Image,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

const ViewNewsAndEvents = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;

  const fetchEventAndNewsById = async () => {
    try {
      const response = await fetch(`${url}/newsandevent/${id}`);
      const data = await response.json();
      setItem(data.DataById);
      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEventAndNewsById();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${url}/newsandevent/${id}`, {
        method: "DELETE",
      });
      toast({
        title: "Data Delete Successfuly",
        description: res.msg,
        status: "success",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      navigate("/admin/newsandevents");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box textAlign={"left"} p="5">
        <Flex gap="20px">
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            View News & Events Details
          </Text>
          <Button
            borderRadius={"20px"}
            color={"#add8e6"}
            bgColor={"black"}
            _hover={{ color: "black", bgColor: "#add8e6" }}
            leftIcon={<BiEditAlt />}
            onClick={() => navigate(`/admin/newsandevents/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            borderRadius={"20px"}
            color={"#add8e6"}
            bgColor={"black"}
            _hover={{ color: "black", bgColor: "#add8e6" }}
            leftIcon={<RiDeleteBin6Line />}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </Flex>
        <br />
        <br />

        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Image
        </Text>
        <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
          <Image
            src={`${url}/newsAndevents/${item.cardimage}`}
            style={{
              width: "200px",

              margin: "5px",
              marginLeft: "25px",
            }}
          />
        </SimpleGrid>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Card Hading
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
          _readOnly
        >
          {item?.cardheading}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Card Description
        </Text>
        <Textarea
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          value={item?.cardtext}
          fontSize={"medium"}
          _readOnly
        />
        <br />
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Detail Page Single Image
        </Text>
        <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
          <Image
            src={`${url}/newsAndevents/${item?.detailimage}`}
            style={{
              width: "200px",

              margin: "5px",
              marginLeft: "25px",
            }}
          />
        </SimpleGrid>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Date
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item?.date}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Place
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item?.place}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Details Hading
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item?.detailheading}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Detail Description
        </Text>
        <Textarea
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          value={item?.detailtext}
          fontSize={"medium"}
        />
        <br />
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Vidio
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item?.video}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Activity Images
        </Text>
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="50%">
          {item?.detailimages &&
            item?.detailimages.map((e, index) => (
              <Box key={index} marginRight="7px">
                <Image
                  src={`${url}/newsAndevents/${e}`}
                  style={{
                    width: "200px",

                    margin: "5px",
                  }}
                />
              </Box>
            ))}
        </Box>
        <br />
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Created at
        </Text>
        {item?.createdAt && (
          <Box
            padding="10px 20px"
            width="50%"
            bgColor={"#eef1f4"}
            fontSize={"medium"}
          >
            {new Date(item.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </Box>
        )}
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Updated at
        </Text>
        {item?.modifiedAt && (
          <Box
            padding="10px 20px"
            width="50%"
            bgColor={"#eef1f4"}
            fontSize={"medium"}
          >
            {new Date(item.modifiedAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </Box>
        )}

        <br />
      </Box>
    </>
  );
};

export default ViewNewsAndEvents;
