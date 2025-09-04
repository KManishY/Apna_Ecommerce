import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Button,
  useColorModeValue,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Grid,
  Image,
  IconButton,
  useToast,
  Flex,
  Icon
} from '@chakra-ui/react';
import { 
  FiHeart, 
  FiTrash2, 
  FiShoppingCart, 
  FiPackage,
  FiArrowLeft,
  FiStar
} from 'react-icons/fi';
import { 
  getWishlist, 
  removeFromWishlist, 
  clearWishlist,
  addToWishlist 
} from '../../Redux/WishlistReducer/action';
import { postCartData } from '../../Redux/AppReducer/action';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { wishlistItems, wishlistCount, loading, error } = useSelector((state) => state.wishlistReducer);
  const { user } = useSelector((state) => state.AuthReducer);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    if (user?.email) {
      dispatch(getWishlist());
    }
  }, [dispatch, user?.email]);

  const handleRemoveFromWishlist = async (productId, productName) => {
    try {
      await dispatch(removeFromWishlist(productId));
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const cartData = {
        data: product
      };
      
      await dispatch(postCartData(cartData));
      toast({
        title: "Added to cart",
        description: `${product.prod_name} has been added to your cart`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClearWishlist = async () => {
    try {
      await dispatch(clearWishlist());
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear wishlist",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (loading) {
    return (
      <Center h="50vh">
        <VStack spacing="4">
          <Spinner size="xl" color="blue.500" />
          <Text>Loading your wishlist...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py="8">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <Container maxW="container.xl" py="8">
        <VStack spacing="6" align="stretch">
          <HStack>
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={() => navigate(-1)}
              borderRadius="lg"
            >
              Back
            </Button>
          </HStack>
          
          <Center h="50vh">
            <VStack spacing="4">
              <Icon as={FiHeart} boxSize="16" color="gray.400" />
              <Heading size="lg" color="gray.500">Your wishlist is empty</Heading>
              <Text color={textColor}>You haven't added any products to your wishlist yet.</Text>
              <Button colorScheme="blue" onClick={() => navigate('/product')}>
                Start Shopping
              </Button>
            </VStack>
          </Center>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py="8">
      <VStack spacing="6" align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center" wrap="wrap">
          <HStack spacing="4">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={() => navigate(-1)}
              borderRadius="lg"
            >
              Back
            </Button>
            <Box>
              <Heading size="lg" mb="2">
                <Icon as={FiHeart} mr="3" color="red.500" />
                My Wishlist ({wishlistCount} items)
              </Heading>
              <Text color={textColor}>
                Products you've saved for later
              </Text>
            </Box>
          </HStack>
          
          {wishlistCount > 0 && (
            <Button
              colorScheme="red"
              variant="outline"
              leftIcon={<FiTrash2 />}
              onClick={handleClearWishlist}
              borderRadius="lg"
            >
              Clear All
            </Button>
          )}
        </Flex>

        {/* Wishlist Items */}
        <Grid 
          templateColumns={{ 
            base: "1fr", 
            md: "repeat(2, 1fr)", 
            lg: "repeat(3, 1fr)", 
            xl: "repeat(4, 1fr)" 
          }} 
          gap={6}
        >
          {wishlistItems.map((item) => (
            <Box
              key={item._id}
              bg={bgColor}
              border="1px"
              borderColor={borderColor}
              borderRadius="lg"
              overflow="hidden"
              shadow="sm"
              _hover={{
                shadow: "md",
                transform: "translateY(-2px)",
                transition: "all 0.3s ease"
              }}
              transition="all 0.3s ease"
            >
              {/* Product Image */}
              <Box position="relative" h="200px" overflow="hidden">
                <Image
                  src={item.product.prod_image}
                  alt={item.product.prod_name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="transform 0.3s ease"
                />
                
                {/* Remove from wishlist button */}
                <IconButton
                  position="absolute"
                  top="2"
                  right="2"
                  icon={<FiTrash2 />}
                  size="sm"
                  colorScheme="red"
                  variant="solid"
                  aria-label="Remove from wishlist"
                  onClick={() => handleRemoveFromWishlist(item.productId, item.product.prod_name)}
                  opacity="0.8"
                  _hover={{ opacity: "1" }}
                />

                {/* Discount badge */}
                {item.product.prod_discount > 0 && (
                  <Badge
                    position="absolute"
                    top="2"
                    left="2"
                    colorScheme="red"
                    borderRadius="full"
                    px="2"
                    py="1"
                  >
                    {item.product.prod_discount}% OFF
                  </Badge>
                )}
              </Box>

              {/* Product Details */}
              <Box p="4">
                <VStack align="stretch" spacing="3">
                  <Box>
                    <Text
                      fontSize="md"
                      fontWeight="semibold"
                      color={textColor}
                      noOfLines={2}
                      mb="1"
                    >
                      {item.product.prod_name}
                    </Text>
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {item.product.prod_cat}
                    </Badge>
                  </Box>

                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing="0">
                      <Text fontSize="sm" color="gray.500">
                        Price
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="green.500">
                        {formatPrice(item.product.prod_price)}
                      </Text>
                    </VStack>
                    <VStack align="end" spacing="0">
                      <Text fontSize="sm" color="gray.500">
                        Rating
                      </Text>
                      <HStack spacing="1">
                        <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                          {item.product.prod_rating}
                        </Text>
                        <Icon as={FiStar} color="yellow.400" />
                      </HStack>
                    </VStack>
                  </HStack>

                  {/* Action Buttons */}
                  <HStack spacing="2">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      leftIcon={<FiShoppingCart />}
                      onClick={() => handleAddToCart(item.product)}
                      flex="1"
                      borderRadius="lg"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => navigate(`/singleProduct/${item.productId}`)}
                      flex="1"
                      borderRadius="lg"
                    >
                      View Details
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Wishlist;
