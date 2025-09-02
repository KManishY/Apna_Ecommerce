import React from "react";
import {
  Box,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "./Header";

const AdminLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  
  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const sidebarBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Mobile Sidebar */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Admin Dashboard
          </DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", lg: "block" }}
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w="280px"
        bg={sidebarBg}
        borderRight="1px solid"
        borderColor={borderColor}
        zIndex={10}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        ml={{ base: 0, lg: "280px" }}
        minH="100vh"
        transition="margin-left 0.3s ease"
      >
        {/* Header */}
        <Header onOpen={onOpen} onLogout={handleLogout} />

        {/* Page Content */}
        <Box p={{ base: 4, md: 6, lg: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
