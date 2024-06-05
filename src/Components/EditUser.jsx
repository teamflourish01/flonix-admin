import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditUser = () => {
  const {id} =useParams()
  const [user,setUser]=useState({})
  const url=process.env.REACT_APP_DEV_URL
  const { isOpen, onOpen, onClose } = useDisclosure();


  const getData=async()=>{
    try {
      let data=await fetch(`${url}/user/${id}`)
      data=await data.json()
      setUser(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange=(e)=>{
    let {name,value}=e.target
    
  }

  const handleUpdate=()=>{

  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <Flex justifyContent={"center"} p="4">
    <Box
      w={["100%", "75%", "50%", "40%", "40%"]}
      borderRadius={"20px"}
      mt={"5%"}
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      padding={"10px"}
    >
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          required
          w={["xs", "xs", "xs", "sm", "sm"]}
          type="text"
          name="name"
          value={user?.name}
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          required
          w={["xs", "xs", "xs", "sm", "sm"]}
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <Text textAlign={"end"} _hover={{cursor:"pointer"}} color={"blue.500"} fontSize={"large"} onClick={onOpen}>
        Change Password
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                required
                w={["xs", "xs", "xs", "sm", "sm"]}
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Text>Leave It For No Change</Text>
              <Input
                required
                w={["xs", "xs", "xs", "sm", "sm"]}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updatePassword}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FormLabel>Profile Pic</FormLabel>
      <Box w="150px"    border={"1px dashed gray"  } >
        {dataUrl?<Image w="150px" height={"150px"} src={dataUrl}/>:userData.image=="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"?<Image w="150px" height={"150px"} src={userData.image}/>:!user.image?<Image w="150px" height={"150px"} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"/>:<Image w="150px" height={"150px"} src={`${url}/user/`+user.image}/>}
      </Box>
      <br />
      <Box >
        <form  encType="multipart/form-data">
          <input required type="file" name="profile" id="filepicker" onChange={(e)=>handleFileChanger(e)} />
        </form>
      </Box>
        <Text><span style={{fontWeight:"bold"}}>Note:</span>Upload Only 200pxX200px photo and less than 500KB size</Text>
      <br />
      <Button onClick={handleUpdate}>Save</Button>
    </Box>
  </Flex>
  )
}

export default EditUser