import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

import { BiEditAlt } from "react-icons/bi";

const ViewAboutus = () => {
  const [item, setItem] = useState([]);
  const url = process.env.REACT_APP_DEV_URL;

  const navigate = useNavigate();

  const getAboutus = async () => {
    try {
      const response = await fetch(`${url}/aboutus`);
      const data = await response.json();
      console.log(data);
      setItem(data.data);

      console.log("UseState Data", item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAboutus();
  }, []);

  return (
    <>
      <Box textAlign={"left"} p="5">
        <Flex gap="20px">
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            View About Us
          </Text>
          <Button
            borderRadius={"20px"}
            color={"#add8e6"}
            bgColor={"black"}
            _hover={{ color: "black", bgColor: "#add8e6" }}
            leftIcon={<BiEditAlt />}
            onClick={() =>
              navigate(`/admin/aboutus/edit/${item.length > 0 && item[0]._id}`)
            }
          >
            Edit
          </Button>
        </Flex>
        <br />
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Heading
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
          _readOnly
        >
          {item.length > 0 && item[0].heading}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Description
        </Text>
        <Textarea
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          value={item.length > 0 && item[0].description}
          fontSize={"medium"}
          _readOnly
        />
        <br />
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Banner Image
        </Text>
        <br />
        <SimpleGrid columns={[1, 1, 1, 2, 2]} rowGap={"9"}>
          <Image
            src={`http://localhost:8080/aboutus/${
              item.length > 0 && item[0].banner
            }`}
            style={{
              width: "150px",
              height: "100px",
              margin: "5px",
              marginLeft: "25px",
            }}
          />
        </SimpleGrid>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Banner Heading
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
          _readOnly
        >
          {item.length > 0 && item[0].bannerheading}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Banner Description
        </Text>
        <Textarea
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          value={item.length > 0 && item[0].bannerdescription}
          fontSize={"medium"}
          _readOnly
        />
        <br />
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Mission
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item.length > 0 && item[0].mission}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Vision
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item.length > 0 && item[0].vision}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Goals
        </Text>
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {item.length > 0 && item[0].goals}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Logo Images
        </Text>
        <br />
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="50%">
          {item.length > 0 &&
            item[0].logoimages.map((e, index) => (
              <Box key={index} marginRight="7px">
                <Image
                  src={`http://localhost:8080/aboutus/${e}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "5px",
                  }}
                />
              </Box>
            ))}
        </Box>
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Created at
        </Text>
        {item.length > 0 && item[0].createdAt && (
          <Box
            padding="10px 20px"
            width="50%"
            bgColor={"#eef1f4"}
            fontSize={"medium"}
          >
            {new Date(item[0].createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </Box>
        )}
        <br />
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Updated at
        </Text>
        {item.length > 0 && item[0].modifiedAt && (
          <Box
            padding="10px 20px"
            width="50%"
            bgColor={"#eef1f4"}
            fontSize={"medium"}
          >
            {new Date(item[0].modifiedAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </Box>
        )}
      </Box>
    </>
  );
};

export default ViewAboutus;
