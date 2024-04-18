import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useLayoutEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const [category,setCategory]=useState([])
    const [flag,setFlag]=useState(false)
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)    
    const navigate=useNavigate()
    const url=process.env.REACT_APP_DEV_URL
    const handleSearch=()=>{
        
    }

    const getCategory=async()=>{
      try {
        // console.log(url);
        let res=await fetch(`${url}/category`)
        res=await res.json()
        console.log(res);
        setCategory(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    useLayoutEffect(()=>{
      getCategory()
    },[])

  return (
    <Box p="4">
    <Flex gap={5} justifyContent={"space-between"}>
        <Button leftIcon={<AddIcon/>} variant={"ghost"} bgColor={"black"}  _hover={{color:"black",bgColor:"#add8e6"}} color="#add8e6" border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/category/add")}>
            Add New
        </Button>
        <Box>
        <span>Search:</span><Input color={"black"}  onBlur={()=>setFlag(true)} w="150px" onChange={(e)=>setSearch(e.target.value)}  value={search} onKeyUp={handleSearch} />
        </Box>
        {/* <Button border={"1px solid #cfcccc"} rightIcon={<DeleteIcon/>}>
            Bulk Delete
        </Button> */}
    </Flex>
    <br/>
    <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
<Table variant='simple'  >
<TableCaption borderTop={"1px solid #161616"} bgColor={"#add8e6"} color={"black"} >There Are {count} Category</TableCaption>
<Thead bgColor={"black"}>
  <Tr  >
    <Th  color={"#add8e6"}>#</Th>
    <Th color={"#add8e6"}>Name</Th>
    <Th color={"#add8e6"}>Order</Th>
    <Th color={"#add8e6"} >Action</Th>
  </Tr>
</Thead>
<Tbody>
{category?.map((e,i)=>{
    return <Tr key={e._id} >
        <Td> {i+1} </Td>
        <Td>{e?.name}</Td>
        <Td>{e?.order}</Td>
        <Td>  
            <ButtonGroup>
            <Button leftIcon={<ViewIcon/>} bgColor={"black"} _hover={{bgColor:"#add8e6",color:"black"}} variant="solid" color="#add8e6" onClick={()=>navigate(`/admin/category/${e._id}`)}>View</Button>
            <Button leftIcon={<BiEditAlt/>} border="1px solid #add8e6" variant={"outline"}  _hover={{bgColor:"#add8e6",color:"black"}}  onClick={()=>navigate(`/admin/category/edit/${e._id}`)}>Edit</Button>
            {/* <DeleteBtn handleDelete={()=>handleDelete(e._id)}/> */}
            </ButtonGroup>
        </Td>
    </Tr>
})}
</Tbody>
</Table>
</TableContainer>
<br />
<Flex justifyContent={"center"}>
{flag&&<div>
      <Button  border="1px solid #add8e6" bgColor={"black"} isDisabled={page===1} onClick={()=>setPage(page-1)}><BsArrowLeft color='#add8e6'/></Button>
      <Button>{page}</Button>
      <Button variant={"outline"} border="1px solid #add8e6" bgColor={"black"} isDisabled={page>=(count/12)} onClick={()=>setPage(page+1)}><BsArrowRight color='#add8e6'/></Button>
    </div>
    }
</Flex>
</Box>
  )
}

export default Category
