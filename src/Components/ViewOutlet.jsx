import { Box, Button, Flex, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'

const ViewOutlet = () => {
    const [outlet,setOutlet]=useState({})
    const navigate=useNavigate()
    const {id}=useParams()
    const toast=useToast()
    const url=process.env.REACT_APP_DEV_URL

    const handleDelete=async()=>{
        try {
            let data=await fetch(`${url}/outlet/delete/${id}`,{
                method: 'DELETE',
            })
            data=await data.json()
            toast({
                title: "Outlet Deleted",
                description: data.msg,
                status: "success",
                position: "top",
                duration: 7000,
                isClosable: true,
              });
              navigate("/admin/contact")
        } catch (error) {
            console.log(error);
        }
    }

    const getOutlet=async()=>{
        try {
            let data=await fetch(`${url}/outlet/${id}`)
            data=await data.json()
            console.log(data);
            setOutlet(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getOutlet()
    },[])
  return (
    <Box textAlign={"left"} p="4">
    <Flex gap="20px">
      <Text fontSize={"xl"} fontWeight={"semibold"}>
        View Product Details
      </Text>
      <Button
        borderRadius={"20px"}
        color={"#add8e6"}
        bgColor={"black"}
        _hover={{ color: "black", bgColor: "#add8e6" }}
        leftIcon={<BiEditAlt />}
        onClick={() => navigate(`/admin/outlet/edit/${id}`)}
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
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Name
    </Text>
    <Box
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      fontSize={"medium"}
    >
      {outlet?.name}
    </Box>
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Address
    </Text>
    <Textarea
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      value={outlet?.address}
      fontSize={"medium"}
    />
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Address Link
    </Text>
    <Box
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      fontSize={"medium"}
    >
      {outlet?.address_url}
    </Box>
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Mobile
    </Text>
    <Box
      padding="10px 20px"
      width="50%"
      bgColor={"#eef1f4"}
      fontSize={"medium"}
    >
      {outlet?.mobile}
    </Box>
    <br />
    
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Created at
    </Text>
    {outlet?.createdAt && (
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {new Date(outlet.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </Box>
    )}
    <br />
    <Text fontWeight={"semibold"} fontSize={"xl"}>
      Updated at
    </Text>
    {outlet?.modifiedAt && (
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {new Date(outlet.modifiedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}
      </Box>
    )}
  </Box>
  )
}

export default ViewOutlet