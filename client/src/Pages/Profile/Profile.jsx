import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Button,
  IconButton,
  useColorModeValue,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  Flex,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiEye,
  FiShoppingCart,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign
} from 'react-icons/fi';
import { 
  getWishlist 
} from '../../Redux/WishlistReducer/action';
import { 
  getCartData,
  postCartData 
} from '../../Redux/AppReducer/action';
import { 
  getOrders 
} from '../../Redux/OrderReducer/action';
import { 
  getAddresses 
} from '../../Redux/AddressReducer/action';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Redux state
  const { user, isAuth } = useSelector((state) => state.AuthReducer);
  const { wishlistItems, wishlistCount, loading: wishlistLoading } = useSelector((state) => state.wishlistReducer);
  const { cart: cartItems, isLoading: cartLoading } = useSelector((state) => state.getCartReducer);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orderReducer);
  const { addresses, loading: addressesLoading } = useSelector((state) => state.addressReducer);

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    if (isAuth && user?.email) {
      // Fetch all user data
      dispatch(getWishlist());
      dispatch(getCartData());
      dispatch(getOrders());
      dispatch(getAddresses());
    }
  }, [dispatch, isAuth, user?.email]);


  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  // Calculate statistics
  const totalSpent = orders?.reduce((sum, order) => sum + (parseInt(order.totalAmount) || 0), 0) || 0;
  const averageOrderValue = orders?.length > 0 ? totalSpent / orders.length : 0;
  const lastOrderDate = orders?.length > 0 ? new Date(orders[0].createdAt).toLocaleDateString() : 'No orders yet';

  // Handle cart data - ensure it's an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  // Wishlist categories
  const wishlistCategories = [...new Set(wishlistItems?.map(item => item.product?.prod_cat).filter(Boolean))] || [];
  const wishlistValue = wishlistItems?.reduce((sum, item) => sum + (parseInt(item.product?.prod_price) || 0), 0) || 0;

  // Handle order details modal
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  // Handle add to cart from wishlist
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

  if (!isAuth) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      {/* Profile Header */}
      <Box mb={8} bg={cardBg} borderRadius="lg" boxShadow="md" p={6}>
          <HStack spacing={6}>
            <Box
              w="80px"
              h="80px"
              borderRadius="full"
              bg="blue.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="2xl"
              fontWeight="bold"
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Box>
            <VStack align="start" spacing={2}>
              <Heading size="lg">{user?.name || 'User'}</Heading>
              <Text color={textColor}>{user?.email}</Text>
              <HStack spacing={4}>
                <Badge colorScheme="green" variant="subtle">
                  Member since {new Date().getFullYear()}
                </Badge>
                <Badge colorScheme="blue" variant="subtle">
                  Verified
                </Badge>
              </HStack>
            </VStack>
          </HStack>
      </Box>

      {/* Quick Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
        <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={6}>
          <Stat>
            <StatLabel>Total Orders</StatLabel>
            <StatNumber>{orders?.length || 0}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Last order: {lastOrderDate}
            </StatHelpText>
          </Stat>
        </Box>

        <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={6}>
          <Stat>
            <StatLabel>Total Spent</StatLabel>
            <StatNumber>₹{totalSpent.toLocaleString()}</StatNumber>
            <StatHelpText>
              Avg: ₹{Math.round(averageOrderValue).toLocaleString()}
            </StatHelpText>
          </Stat>
        </Box>

        <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={6}>
          <Stat>
            <StatLabel>Wishlist Items</StatLabel>
            <StatNumber>{wishlistCount || 0}</StatNumber>
            <StatHelpText>
              Value: ₹{wishlistValue.toLocaleString()}
            </StatHelpText>
          </Stat>
        </Box>

        <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={6}>
          <Stat>
            <StatLabel>Cart Items</StatLabel>
            <StatNumber>{safeCartItems?.length || 0}</StatNumber>
            <StatHelpText>
              Ready to checkout
            </StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Recent Orders</Tab>
          <Tab>Wishlist</Tab>
          <Tab>Addresses</Tab>
          <Tab>Account Settings</Tab>
        </TabList>

        <TabPanels>
          {/* Recent Orders Tab */}
          <TabPanel px={0}>
            <Box bg={cardBg} borderRadius="lg" boxShadow="md">
              <Box p={6} borderBottom="1px" borderColor={borderColor}>
                <Heading size="md">Recent Orders</Heading>
              </Box>
              <Box p={6}>
                {ordersLoading ? (
                  <Center py={8}>
                    <Spinner size="lg" />
                  </Center>
                ) : orders?.length > 0 ? (
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Order ID</Th>
                          <Th>Date</Th>
                          <Th>Amount</Th>
                          <Th>Status</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orders.slice(0, 5).map((order) => (
                          <Tr key={order._id}>
                            <Td>#{order.orderId}</Td>
                            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                            <Td>₹{order.totalAmount?.toLocaleString()}</Td>
                            <Td>
                              <Badge 
                                colorScheme={
                                  order.status === 'completed' ? 'green' :
                                  order.status === 'pending' ? 'yellow' :
                                  order.status === 'shipped' ? 'blue' : 'red'
                                }
                              >
                                {order.status}
                              </Badge>
                            </Td>
                            <Td>
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<FiEye />}
                                onClick={() => handleOrderClick(order)}
                              >
                                View
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    No orders found. Start shopping to see your orders here.
                  </Alert>
                )}
              </Box>
            </Box>
          </TabPanel>

          {/* Wishlist Tab */}
          <TabPanel px={0}>
            <Box bg={cardBg} borderRadius="lg" boxShadow="md">
              <Box p={6} borderBottom="1px" borderColor={borderColor}>
                <Heading size="md">Your Wishlist</Heading>
                <Text color={textColor}>
                  {wishlistCount || 0} items • Categories: {wishlistCategories.join(', ')}
                </Text>
              </Box>
              <Box p={6}>
                {wishlistLoading ? (
                  <Center py={8}>
                    <Spinner size="lg" />
                  </Center>
                ) : wishlistItems?.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {wishlistItems.slice(0, 6).map((item) => (
                      <Box key={item._id} border="1px" borderColor={borderColor} borderRadius="lg" p={4}>
                          <VStack align="start" spacing={3}>
                            <Image
                              src={item.product?.prod_image}
                              alt={item.product?.prod_name}
                              w="100%"
                              h="200px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                            <VStack align="start" spacing={1} w="100%">
                              <Text fontWeight="semibold" noOfLines={2}>
                                {item.product?.prod_name}
                              </Text>
                              <Text color="blue.500" fontWeight="bold">
                                ₹{item.product?.prod_price?.toLocaleString()}
                              </Text>
                              <Badge colorScheme="blue" variant="subtle">
                                {item.product?.prod_cat}
                              </Badge>
                            </VStack>
                            <HStack w="100%" justify="space-between">
                              <Button
                                size="sm"
                                colorScheme="blue"
                                leftIcon={<FiShoppingCart />}
                                onClick={() => handleAddToCart(item.product)}
                              >
                                Add to Cart
                              </Button>
                              <IconButton
                                size="sm"
                                colorScheme="red"
                                variant="outline"
                                icon={<FiTrash2 />}
                                aria-label="Remove from wishlist"
                              />
                            </HStack>
                          </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    Your wishlist is empty. Add some items to see them here.
                  </Alert>
                )}
              </Box>
            </Box>
          </TabPanel>

          {/* Addresses Tab */}
          <TabPanel px={0}>
            <Box bg={cardBg} borderRadius="lg" boxShadow="md">
              <Box p={6} borderBottom="1px" borderColor={borderColor}>
                <HStack justify="space-between">
                  <Heading size="md">Saved Addresses</Heading>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    leftIcon={<FiPlus />}
                    onClick={() => navigate('/checkout')}
                  >
                    Add Address
                  </Button>
                </HStack>
              </Box>
              <Box p={6}>
                {addressesLoading ? (
                  <Center py={8}>
                    <Spinner size="lg" />
                  </Center>
                ) : addresses?.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {addresses.map((address) => (
                      <Box key={address._id} border="1px" borderColor={borderColor} borderRadius="lg" p={4} position="relative">
                          <VStack align="start" spacing={2}>
                            <HStack justify="space-between" w="100%">
                              <Text fontWeight="semibold">{address.fullName}</Text>
                              {address.isDefault && (
                                <Badge colorScheme="green" size="sm">Default</Badge>
                              )}
                            </HStack>
                            <Text>{address.addressLine1}</Text>
                            {address.addressLine2 && <Text>{address.addressLine2}</Text>}
                            <Text>{address.city}, {address.state} - {address.pincode}</Text>
                            <Text>Phone: {address.phoneNumber}</Text>
                            <HStack spacing={2} pt={2}>
                              <Button size="sm" variant="outline" leftIcon={<FiEdit />}>
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" colorScheme="red" leftIcon={<FiTrash2 />}>
                                Delete
                              </Button>
                            </HStack>
                          </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    No addresses saved. Add an address to get started.
                  </Alert>
                )}
              </Box>
            </Box>
          </TabPanel>

          {/* Account Settings Tab */}
          <TabPanel px={0}>
            <Box bg={cardBg} borderRadius="lg" boxShadow="md">
              <Box p={6} borderBottom="1px" borderColor={borderColor}>
                <Heading size="md">Account Settings</Heading>
              </Box>
              <Box p={6}>
                <VStack spacing={6} align="start">
                  <Box w="100%">
                    <Text fontWeight="semibold" mb={2}>Personal Information</Text>
                    <HStack justify="space-between" w="100%">
                      <VStack align="start" spacing={1}>
                        <Text>Name: {user?.name}</Text>
                        <Text>Email: {user?.email}</Text>
                      </VStack>
                      <Button size="sm" variant="outline" leftIcon={<FiEdit />}>
                        Edit
                      </Button>
                    </HStack>
                  </Box>
                  
                  <Divider />
                  
                  <Box w="100%">
                    <Text fontWeight="semibold" mb={2}>Security</Text>
                    <VStack align="start" spacing={2}>
                      <Button size="sm" variant="outline" leftIcon={<FiEdit />}>
                        Change Password
                      </Button>
                      <Button size="sm" variant="outline" leftIcon={<FiUser />}>
                        Two-Factor Authentication
                      </Button>
                    </VStack>
                  </Box>
                  
                  <Divider />
                  
                  <Box w="100%">
                    <Text fontWeight="semibold" mb={2}>Preferences</Text>
                    <VStack align="start" spacing={2}>
                      <Text>Email Notifications: Enabled</Text>
                      <Text>SMS Notifications: Disabled</Text>
                      <Text>Newsletter: Subscribed</Text>
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedOrder && (
              <VStack spacing={4} align="start">
                <HStack justify="space-between" w="100%">
                  <Text fontWeight="semibold">Order ID: #{selectedOrder.orderId}</Text>
                  <Badge colorScheme="green">{selectedOrder.status}</Badge>
                </HStack>
                <Text>Date: {new Date(selectedOrder.createdAt).toLocaleString()}</Text>
                <Text>Total: ₹{parseInt(selectedOrder.totalAmount || 0).toLocaleString()}</Text>
                
                <Divider />
                
                <Text fontWeight="semibold">Items:</Text>
                {selectedOrder.items?.map((item, index) => (
                  <HStack key={index} w="100%" justify="space-between">
                    <Text>{item.productName} x {item.quantity}</Text>
                    <Text>₹{item.price * item.quantity}</Text>
                  </HStack>
                ))}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Profile;
