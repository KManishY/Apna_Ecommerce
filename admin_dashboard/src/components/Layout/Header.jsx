import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Badge,
  Button,
  VStack,
  Heading
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiSettings, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";

const Header = ({ onOpen, onLogout }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={5}
      boxShadow="sm"
    >
      <Flex alignItems="center" justifyContent="space-between">
        {/* Left Side - Menu Button & Title */}
        <HStack spacing={4}>
          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
            size="md"
            borderRadius="lg"
          />
          
          <VStack align="start" spacing={0}>
            <Heading size="md" color={textColor}>
              Admin Dashboard
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Manage your e-commerce platform
            </Text>
          </VStack>
        </HStack>

        {/* Right Side - Notifications & User Menu */}
        <HStack spacing={4}>
          {/* Notifications */}
          <IconButton
            variant="ghost"
            aria-label="notifications"
            icon={
              <Box position="relative">
                <FiBell size={20} />
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="red"
                  borderRadius="full"
                  fontSize="xs"
                  minW="18px"
                  h="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  3
                </Badge>
              </Box>
            }
            size="md"
            borderRadius="lg"
            _hover={{ bg: "gray.100" }}
          />

          {/* Settings */}
          <IconButton
            variant="ghost"
            aria-label="settings"
            icon={<FiSettings />}
            size="md"
            borderRadius="lg"
            _hover={{ bg: "gray.100" }}
          />

          {/* User Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<FiChevronDown />}
              leftIcon={
                <Avatar
                  size="sm"
                  src="https://i.ibb.co/W5bWybN/profile-pic.jpg"
                  name="Admin User"
                />
              }
              borderRadius="lg"
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.200" }}
            >
              <VStack align="start" spacing={0} display={{ base: "none", md: "flex" }}>
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  Manish Kumar
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Administrator
                </Text>
              </VStack>
            </MenuButton>
            
            <MenuList>
              <MenuItem icon={<FiUser />}>
                Profile Settings
              </MenuItem>
              <MenuItem icon={<FiSettings />}>
                Account Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem 
                icon={<FiLogOut />} 
                color="red.500"
                onClick={onLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
