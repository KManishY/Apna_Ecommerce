import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useColorModeValue,
  Collapse,
  useDisclosure,
  Button,
  Divider,
  Heading
} from "@chakra-ui/react";
import {
  FiHome,
  FiPackage,
  FiPlus,
  FiUsers,
  FiShoppingCart,
  FiChevronDown,
  FiChevronRight,
  FiTrendingUp,
  FiShoppingBag,
  FiBarChart
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import NavItem from "./NavItem";

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const { isOpen: isStatsOpen, onToggle: onStatsToggle } = useDisclosure();
  
  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const navigationItems = [
    {
      name: "Dashboard",
      icon: FiHome,
      path: "/",
      badge: null
    },
    {
      name: "Products",
      icon: FiPackage,
      path: "/products",
      badge: null,
      children: [
        {
          name: "All Products",
          icon: FiPackage,
          path: "/products",
          badge: "24"
        },
        {
          name: "Add Product",
          icon: FiPlus,
          path: "/addProduct",
          badge: null
        }
      ]
    },
    {
      name: "Orders",
      icon: FiShoppingCart,
      path: "/order",
      badge: "12"
    },
    {
      name: "Users",
      icon: FiUsers,
      path: "/user",
      badge: "156"
    },
    {
      name: "Analytics",
      icon: FiBarChart,
      path: "/analytics",
      badge: null
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      h="100vh"
      bg={bgColor}
      borderRight="1px solid"
      borderColor={borderColor}
      w="280px"
      position="relative"
    >
      {/* Logo Section */}
      <Box p={6} borderBottom="1px solid" borderColor={borderColor}>
        <HStack spacing={3}>
          <Box
            w="40px"
            h="40px"
            bgGradient="linear(to-br, blue.500, purple.500)"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiShoppingBag} color="white" boxSize={5} />
          </Box>
          <VStack align="start" spacing={0}>
            <Heading size="sm" color={textColor}>
              Apna Ecommerce
            </Heading>
            <Text fontSize="xs" color="gray.500">
              Admin Panel
            </Text>
          </VStack>
        </HStack>
      </Box>

      {/* Navigation */}
      <Box p={4}>
        <VStack spacing={2} align="stretch">
          {navigationItems.map((item) => (
            <Box key={item.name}>
              {item.children ? (
                <Box>
                  <Button
                    variant="ghost"
                    size="sm"
                    w="full"
                    justifyContent="space-between"
                    onClick={onStatsToggle}
                    bg={isStatsOpen ? hoverBg : "transparent"}
                    _hover={{ bg: hoverBg }}
                    borderRadius="lg"
                    h="40px"
                    px={3}
                  >
                    <HStack spacing={3}>
                      <Icon as={item.icon} boxSize={4} color={textColor} />
                      <Text fontSize="sm" color={textColor}>
                        {item.name}
                      </Text>
                    </HStack>
                    <Icon
                      as={isStatsOpen ? FiChevronDown : FiChevronRight}
                      boxSize={4}
                      color="gray.500"
                    />
                  </Button>
                  
                  <Collapse in={isStatsOpen} animateOpacity>
                    <VStack spacing={1} align="stretch" mt={2} ml={4}>
                      {item.children.map((child) => (
                        <Link key={child.name} to={child.path} onClick={onClose}>
                          <NavItem
                            icon={child.icon}
                            title={child.name}
                            isActive={isActive(child.path)}
                            badge={child.badge}
                            isChild={true}
                          />
                        </Link>
                      ))}
                    </VStack>
                  </Collapse>
                </Box>
              ) : (
                <Link to={item.path} onClick={onClose}>
                  <NavItem
                    icon={item.icon}
                    title={item.name}
                    isActive={isActive(item.path)}
                    badge={item.badge}
                  />
                </Link>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Quick Stats */}
      <Box position="absolute" bottom={0} left={0} right={0} p={4}>
        <Divider mb={4} />
        <VStack spacing={3} align="stretch">
          <Text fontSize="xs" fontWeight="semibold" color="gray.500" textTransform="uppercase">
            Quick Stats
          </Text>
          
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Icon as={FiTrendingUp} color="green.500" boxSize={4} />
              <Text fontSize="sm" color={textColor}>
                Revenue
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="green.500">
              ₹2.4M
            </Text>
          </HStack>
          
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Icon as={FiShoppingCart} color="blue.500" boxSize={4} />
              <Text fontSize="sm" color={textColor}>
                Orders
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="blue.500">
              1,234
            </Text>
          </HStack>
          
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Icon as={FiUsers} color="purple.500" boxSize={4} />
              <Text fontSize="sm" color={textColor}>
                Users
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="purple.500">
              5,678
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
