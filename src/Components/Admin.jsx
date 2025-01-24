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
import React, { useEffect, useState } from "react";
import "../styles/Admin.css";

import { BiSolidUser, BiLogoGmail } from "react-icons/bi";
import {
  BsBriefcaseFill,
  BsCalendarEvent,
  BsCreditCard,
  BsDistributeVertical,
  BsNewspaper,
  BsShopWindow,
} from "react-icons/bs";

import {
  FaCertificate,
  FaFilePdf,
  FaMobileScreen,
  FaStore,
  FaTicketSimple,
  FaUser,
} from "react-icons/fa6";

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

import NewsAndEvents from "./NewsandEvents";
import AddFormNewsandEvents from "./AddNewsAndEvents";
import ViewNewsAndEvents from "./ViewNewsAndEvents";

import Contact from "./Contact";
import AddOutlet from "./AddOutlet";
import ViewOutlet from "./ViewOutlet";
import EditOutlet from "./EditOutlet";
import MyEditor from "./MyEditor";

import UpdateNewsAndEvents from "./EditNewsAndEvents";
import Pages from "./Pages";
import ViewAboutus from "./ViewAboutus";
import EditAboutus from "./EditAboutus";
import Certificates from "./Certificate";
import ViewCertificate from "./ViewCeritificate";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertificats";
import Contectdetails from "./ContectDetails";
import EditContectDetails from "./EditContectDetails";
import ViewNewsHeading from "./ViewNewsHeading";
import AddNewsHeading from "./AddNewsHeading";
import EditNewsHeading from "./EditNewsHeading";

import Blog from "./Blog";
import BlogCategory from "./BlogCategory";
import AddBlogCategory from "./AddBlogCategory";
import ViewBlogCategory from "./ViewBlogCategory";
import EditBlogCategory from "./EditBlogCategory";
import AddBlog from "./AddBlog";
import ViewBlog from "./ViewBlog";

import ViewHome from "./ViewHome";
import EditHome from "./EditHome";
import Testimonials from "./Testimonials";
import AddTestimonials from "./AddTestimonials";
import EditTestimonials from "./EditTestimonials";
import ViewTestimonials from "./ViewTestimonials";
import Ebrochure from "./Ebrochure";
import AddEbrochure from "./AddEbrochure";
import EditEbrochure from "./EditEbrochure";
import UpdateHomeBenefits from "./EditHomeBenefits";
import ViewHomeBanefits from "./ViewHomeBenefits";

import InquiryForm from "./InquiryForm";

import EditBlog from "./EditBlog";
import OurProduct from "./OurProduct";
import TopProducts from "./TopProducts";
import Login from "./Login";
import User from "./User";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import Inquiry from "./Inquiry";
import ViewInquiry from "./ViewInquiry";

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
            onClick={() => navigate("/admin")}
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
            navigate("/admin/user");
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
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={BsNewspaper}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/newsandevents");
          }}
        >
          News & Eventes
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaCertificate}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/certificate");
          }}
        >
          Certificates
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaMobileScreen}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/contectdetails");
          }}
        >
          Contect Details
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaUser}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/testimonials");
          }}
        >
          Testimonials
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaFilePdf}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/ebrochure");
          }}
        >
          E-Brochure
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
            navigate("/admin/page");
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
            navigate("/admin/inquiry");
          }}
        >
          Inquiry
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={GiModernCity}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/blog");
          }}
        >
          Blogs
        </NavItem>
        <NavItem
          _hover={{ bgColor: "black", color: "#ADD8E6" }}
          icon={FaStore}
          onClick={() => {
            sidebar.onClose();
            navigate("/admin/contact");
          }}
        >
          Contact
        </NavItem>
       
       
       
      </Flex>
    </Box>
  );
  useEffect(()=>{
    setTimeout(()=>{
      localStorage.removeItem("token")
    },3*60*60*1000)
  },[])
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
            {/* <Route path="/" element={<Login/>}/> */}

            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/user" element={<User />} />
            <Route path="/category/:slugname" element={<ViewCategory />} />
            <Route path="/category/edit/:slugname" element={<EditCategory />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/:slugname" element={<ViewProduct />} />
            <Route path="/product/edit/:slugname" element={<EditProduct />} />
            <Route path="/newsandevents" element={<NewsAndEvents />} />
            <Route
              path="/newsandevents/add"
              element={<AddFormNewsandEvents />}
            />
            <Route
              path="/newsandevents/:slug"
              element={<ViewNewsAndEvents />}
            />
            <Route
              path="/newsandevents/edit/:slugname"
              element={<UpdateNewsAndEvents />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/outlet/add" element={<AddOutlet />} />
            <Route path="/outlet/:id" element={<ViewOutlet />} />
            <Route path="/outlet/edit/:id" element={<EditOutlet />} />
            <Route path="/editor" element={<MyEditor />} />

            <Route path="/category/:categoryid" element={<ViewCategory />} />
            <Route
              path="/category/edit/:categoryid"
              element={<EditCategory />}
            />
            <Route path="/product" element={<Product />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/:id" element={<ViewProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route path="/newsandevents" element={<NewsAndEvents />} />
            <Route
              path="/newsandevents/add"
              element={<AddFormNewsandEvents />}
            />
            <Route path="/newsandevents/:id" element={<ViewNewsAndEvents />} />
            <Route
              path="/newsandevents/edit/:Id"
              element={<UpdateNewsAndEvents />}
            />
            <Route path="/newsheading/add" element={<AddNewsHeading />} />
            <Route path="/newsheading/:id" element={<ViewNewsHeading />} />
            <Route path="/newsheading/edit/:id" element={<EditNewsHeading />} />

            <Route path="/page" element={<Pages />} />
            <Route path="/aboutus" element={<ViewAboutus />} />
            <Route path="/aboutus/edit/:id" element={<EditAboutus />} />
            <Route path="/certificate" element={<Certificates />} />
            <Route path="/certificate/:id" element={<ViewCertificate />} />
            <Route path="/certificate/add" element={<AddCertificate />} />
            <Route path="/certificate/edit/:id" element={<EditCertificate />} />
            <Route path="/contectdetails" element={<Contectdetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogcategory" element={<BlogCategory />} />
            <Route path="/blogcategory/add" element={<AddBlogCategory />} />
            <Route
              path="/blogcategory/:slugname"
              element={<ViewBlogCategory />}
            />
            <Route
              path="/blogcategory/edit/:slugname"
              element={<EditBlogCategory />}
            />
            <Route path="/blog/add" element={<AddBlog />} />
            <Route path="/blog/:slugname" element={<ViewBlog />} />
            <Route
              path="/contectdetails/edit/:id"
              element={<EditContectDetails />}
            />
            <Route path="/home/:id" element={<ViewHome />} />
            <Route path="/home/edit/:id" element={<EditHome />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonials/add" element={<AddTestimonials />} />
            <Route path="/testimonials/:id" element={<ViewTestimonials />} />
            <Route
              path="/testimonials/edit/:id"
              element={<EditTestimonials />}
            />
            <Route path="/ebrochure" element={<Ebrochure />} />
            <Route path="/ebrochure/add" element={<AddEbrochure />} />

            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/:id" element={<ViewUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />

            <Route path="/ebrochure/:edit/:id" element={<EditEbrochure />} />
            <Route
              path="/robenefits/:edit/:id"
              element={<UpdateHomeBenefits />}
            />
            <Route path="/robenefits/:id" element={<ViewHomeBanefits />} />

            <Route path="/inquiryform" element={<InquiryForm />} />

            <Route path="/blog/edit/:slugname" element={<EditBlog />} />
            <Route path="/page/ourproduct" element={<OurProduct />} />
            <Route path="/page/topproduct" element={<TopProducts />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/inquiry/:id" element={<ViewInquiry />} />
          </Routes>
          <Box rounded="md" h="" />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
