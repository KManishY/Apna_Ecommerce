import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Icon,
  useColorModeValue,
  Container,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider
} from "@chakra-ui/react";
import {
  GiShoppingCart
} from "react-icons/gi";
import {
  FiUser,
  FiLogOut,
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiHome,
  FiPackage
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../Redux/AppReducer/action.js";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let { cart } = useSelector((state) => state.getCartReducer);
  if (cart === "Please Login") {
    cart = "";
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  // Color scheme
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");


  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon, isActive }) => (
    <Link to={to}>
      <Button
        variant="ghost"
        size="lg"
        leftIcon={<Icon as={icon} />}
        color="white"
        bgGradient="linear(to-r, blue.500, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, blue.600, purple.600)",
          transform: "translateY(-2px)"
        }}
        _active={{
          transform: "scale(0.95)"
        }}
        transition="all 0.2s ease"
        borderRadius="xl"
        fontWeight="semibold"
        boxShadow="md"
      >
        {children}
      </Button>
    </Link>
  );

  const CartButton = () => (
    <Link to="/cart">
      <Button
        variant="ghost"
        size="lg"
        position="relative"
        leftIcon={<Icon as={GiShoppingCart} boxSize="5" />}
        color="white"
        bgGradient="linear(to-r, blue.500, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, blue.600, purple.600)",
          transform: "translateY(-2px)"
        }}
        _active={{
          transform: "scale(0.95)"
        }}
        transition="all 0.2s ease"
        borderRadius="xl"
        fontWeight="semibold"
        boxShadow="md"
      >
        Cart
        {cart && cart.length > 0 && (
          <Badge
            position="absolute"
            top="-2"
            right="-2"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
            minW="20px"
            h="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="md"
          >
            {cart.length}
          </Badge>
        )}
      </Button>
    </Link>
  );

  const UserMenu = () => (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size="lg"
        leftIcon={<Avatar size="sm" name={user} bgGradient="linear(to-r, blue.400, purple.500)" />}
        rightIcon={<Icon as={FiUser} />}
        color="white"
        bg="transparent"
        _hover={{
          bg: "transparent",
          transform: "translateY(-2px)"
        }}
        _active={{
          transform: "scale(0.95)"
        }}
        transition="all 0.2s ease"
        borderRadius="xl"
        fontWeight="semibold"
        boxShadow="none"
      >
        {user}
      </MenuButton>
      <MenuList
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        boxShadow="xl"
        py="2"
      >
        <MenuItem
          icon={<Icon as={FiUser} />}
          bg="transparent !important"
          _active={{ bg: "transparent !important" }}
          _focus={{ bg: "transparent !important" }}
          borderRadius="md"
          mx="2"
          onClick={() => navigate('/profile')}
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<Icon as={FiHeart} />}
          bg="transparent !important"
          _active={{ bg: "transparent !important" }}
          _focus={{ bg: "transparent !important" }}
          borderRadius="md"
          mx="2"
          onClick={() => navigate('/wishlist')}
        >
          Wishlist
        </MenuItem>
        <MenuItem
          icon={<Icon as={FiShoppingBag} />}
          bg="transparent !important"
          _active={{ bg: "transparent !important" }}
          _focus={{ bg: "transparent !important" }}
          borderRadius="md"
          mx="2"
          onClick={() => navigate('/orders')}
        >
          Orders
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<Icon as={FiLogOut} />}
          color="red.500"
          bg="transparent !important"
          _active={{ bg: "transparent !important" }}
          _focus={{ bg: "transparent !important" }}
          borderRadius="md"
          mx="2"
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );

  const LoginButton = () => (
    <Link to="/login">
      <Button
        size="lg"
        bgGradient="linear(to-r, blue.500, purple.500)"
        color="white"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          filter: "brightness(1.1)"
        }}
        _active={{
          transform: "scale(0.95)"
        }}
        transition="all 0.2s ease"
        borderRadius="xl"
        fontWeight="bold"
        px="8"
        leftIcon={<Icon as={FiUser} />}
      >
        Login
      </Button>
    </Link>
  );

  const MobileMenu = () => (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerCloseButton />
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor={borderColor}
          bgGradient="linear(to-r, blue.500, purple.500)"
          color="white"
        >
          <Flex align="center" gap="3">
            <Avatar size="sm" name="Apna Ecommerce" bg="white" color="blue.500" />
            <Text fontWeight="bold">Apna Ecommerce</Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody py="6">
          <VStack spacing="4" align="stretch">
            <NavLink to="/" icon={FiHome} isActive={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/product" icon={FiPackage} isActive={isActive("/product")}>
              Products
            </NavLink>
            <CartButton />
            {token ? (
              <>
                <Divider />
                <UserMenu />
              </>
            ) : (
              <LoginButton />
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Box
      bg="rgba(255, 255, 255, 0.95)"
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="sm"
      backdropFilter="blur(10px)"
    >
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <Flex
          h="16"
          alignItems="center"
          justifyContent="space-between"
          gap="4"
        >
          {/* Logo */}
          <Link to="/">
            <Flex align="center" gap="3" _hover={{ transform: "scale(1.05)" }} transition="transform 0.2s ease">
              <Box
                p="2"
                borderRadius="xl"
                bgGradient="linear(to-r, blue.500, purple.500)"
                color="white"
                boxShadow="lg"
              >
                <Icon as={GiShoppingCart} boxSize="6" />
              </Box>
              <Heading size="md" bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">
                Apna Ecommerce
              </Heading>
            </Flex>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing="2" display={{ base: "none", md: "flex" }}>
            <NavLink to="/" icon={FiHome} isActive={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/product" icon={FiPackage} isActive={isActive("/product")}>
              Products
            </NavLink>
            <CartButton />
          </HStack>

          {/* User Actions */}
          <HStack spacing="3" display={{ base: "none", md: "flex" }}>
            {token ? <UserMenu /> : <LoginButton />}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            icon={<Icon as={FiMenu} />}
            variant="ghost"
            size="lg"
            aria-label="Open menu"
            borderRadius="xl"
            _hover={{ bg: "gray.100" }}
          />
        </Flex>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu />
    </Box>
  );
};

export default Navbar;
