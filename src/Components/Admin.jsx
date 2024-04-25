import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  MenuItem,
  Text,
  transition,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "../styles/Admin.css";

import { BiSolidUser, BiLogoGmail } from "react-icons/bi";
import {
  BsBriefcaseFill,
  BsDistributeVertical,
  BsShopWindow,
} from "react-icons/bs";

import { FaStore, FaUser } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { GrCatalog } from "react-icons/gr";
import { TiThMenu } from "react-icons/ti";
import { TbCategory } from "react-icons/tb";
import { MdContactPage } from "react-icons/md";
import logo from "../images/logo.svg";
import mainlogo from "../images/mainlogo.svg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Category from "./Category";
import AddCategory from "./AddCategory";
import ViewCategory from "./ViewCategory";
import EditCategory from "./EditCategory";
import Product from "./Product";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";

const Admin = () => {
  const sidebar = useDisclosure();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const NavItem = (props) => {
    const { icon, children, isActive, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        width={hovered ? "60" : "20"}
        margin={0}
        // onClick={() => sidebar.isOpen()}
        transition="width .15s ease"
        // onMouseEnter={() => setHovered(true)}
        // onMouseLeave={() => setHovered(false)}
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: "#ADD8E6",
            }}
            as={icon}
          />
        )}
        {hovered && children}
      </Flex>
    );
  };
  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={"#ADD8E6"}
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      transition="all 5s ease-in-out"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        // sidebar.onClose()
      }}
      {...props}
    >
      <Flex justifyContent={"center"} mt={"20px"} mb={"20px"}>
        <Image
          src={hovered ? mainlogo : logo}
          width={hovered ? "150px" : "50px"}
          _hover={{ cursor: "pointer" }}
          //   onClick={() => navigate("/admin")}
        />
      </Flex>

      <Flex px="4" py="0" align="center">
        {/* <Text
          fontSize="2xl"
          ml="2"
          mb={2}
          mt={2}
          color="black"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        ></Text> */}
      </Flex>
      <Box w="100%" border={"1px solid white"}></Box>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="black"
        aria-label="Main Navigation"
      >
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={BsBriefcaseFill}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin");
          }}
        >
          Dashboard
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={TbCategory}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/category");
          }}
        >
          Category
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaUser}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/user");
          }}
        >
          Users
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={BsShopWindow}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/product");
          }}
        >
          Products
        </NavItem>
        {/* <NavItem icon={HiCode} onClick={integrations.onToggle}>
                Integrations
                <Icon
                  as={MdKeyboardArrowRight}
                  ml="auto"
                  transform={integrations.isOpen && "rotate(90deg)"}
                />
              </NavItem>
              <Collapse in={integrations.isOpen}>
                <NavItem pl="12" py="2">
                  Shopify
                </NavItem>
                <NavItem pl="12" py="2">
                  Slack
                </NavItem>
                <NavItem pl="12" py="2">
                  Zapier
                </NavItem>
              </Collapse> */}
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={MdContactPage}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/page");
          }}
        >
          Pages
        </NavItem>
        {/* <NavItem icon={BiLogoBlogger} onClick={()=>navigate("/admin/blog")}>Blogs</NavItem> */}
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={BiLogoGmail}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/inquiry");
          }}
        >
          Inquiry
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={GiModernCity}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/city");
          }}
        >
          City
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaStore}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/outlet");
          }}
        >
          Outlets
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={BsDistributeVertical}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/distributor");
          }}
        >
          Distributors
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={TiThMenu}
          onClick={() => {
            sidebar.onClose();
            // navigate("/admin/menu");
          }}
        >
          Menu
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={GrCatalog}
          onClick={() => {
            sidebar.onClose();
          }}
        >
          catalogue
        </NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box
      // as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "block",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        // border={"1px solid red"}
        // ml={{
        //   base: 0,
        //   sm:10,
        //   md: 20,
        //   lg:30,
        //   // xl:100
        // }}
        ml={hovered ? "15.5%" : "5%"}
        transition=".3s ease"
      >
        {/* <Flex
          as="header"
          align="center"
          justify="flex-end"
          px="4"
          bg="#ADD8E6"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="72px"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            // icon={<FiMenu />}
            size="sm"
          />
          <Flex align="center"></Flex>
        </Flex> */}
        <Box as="main">
          {/* Add content here, remove div below  */}
          {/* <AllRoutes/> */}
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route path="/admin/category/:categoryid" element={<ViewCategory />} />
            <Route path="/admin/category/edit/:categoryid" element={<EditCategory />} />
            <Route path="/admin/product" element={<Product/>} />
            <Route path="/admin/product/add" element={<AddProduct/>} />
            <Route path="/admin/product/:id" element={<ViewProduct/>}/>
            <Route path="/admin/product/edit/:id" element={<EditProduct/>}/>
          </Routes>
          <Box rounded="md" h="" />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
