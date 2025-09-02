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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Icon,
  useToast
} from '@chakra-ui/react';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { getOrders } from '../../Redux/OrderReducer/action';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { orders, loading, error } = useSelector((state) => state.orderReducer);
  const { user } = useSelector((state) => state.authReducer);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    if (user?.email) {
      dispatch(getOrders());
    }
  }, [dispatch, user?.email]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'yellow';
      case 'confirmed':
        return 'blue';
      case 'shipped':
        return 'purple';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return FiClock;
      case 'confirmed':
        return FiCheckCircle;
      case 'shipped':
        return FiTruck;
      case 'delivered':
        return FiPackage;
      case 'cancelled':
        return FiXCircle;
      default:
        return FiClock;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <Text>Loading your orders...</Text>
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

  if (!orders || orders.length === 0) {
    return (
      <Container maxW="container.xl" py="8">
        <Center h="50vh">
          <VStack spacing="4">
            <Icon as={FiPackage} boxSize="16" color="gray.400" />
            <Heading size="lg" color="gray.500">No Orders Found</Heading>
            <Text color={textColor}>You haven't placed any orders yet.</Text>
            <Button colorScheme="blue" onClick={() => navigate('/product')}>
              Start Shopping
            </Button>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py="8">
      <VStack spacing="6" align="stretch">
        <Box>
          <Heading size="lg" mb="2">My Orders</Heading>
          <Text color={textColor}>
            Track and manage your orders
          </Text>
        </Box>

        <VStack spacing="4" align="stretch">
          {orders.map((order) => (
            <Box
              key={order._id}
              bg={bgColor}
              border="1px"
              borderColor={borderColor}
              borderRadius="lg"
              p="6"
              shadow="sm"
            >
              <VStack spacing="4" align="stretch">
                {/* Order Header */}
                <Flex justify="space-between" align="center" wrap="wrap">
                  <VStack align="start" spacing="1">
                    <Text fontWeight="bold" fontSize="lg">
                      Order #{order.orderId}
                    </Text>
                    <Text color={textColor} fontSize="sm">
                      Placed on {formatDate(order.orderDate)}
                    </Text>
                  </VStack>
                  <HStack spacing="3">
                    <Badge
                      colorScheme={getStatusColor(order.status)}
                      px="3"
                      py="1"
                      borderRadius="full"
                      fontSize="sm"
                    >
                      <HStack spacing="1">
                        <Icon as={getStatusIcon(order.status)} />
                        <Text>{order.status}</Text>
                      </HStack>
                    </Badge>
                    <Text fontWeight="bold" fontSize="lg">
                      {formatPrice(order.totalAmount)}
                    </Text>
                  </HStack>
                </Flex>

                <Divider />

                {/* Order Items */}
                <Box>
                  <Text fontWeight="semibold" mb="3">Order Items:</Text>
                  <TableContainer>
                    <Table size="sm" variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Product</Th>
                          <Th>Quantity</Th>
                          <Th>Price</Th>
                          <Th>Total</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.items.map((item, index) => (
                          <Tr key={index}>
                            <Td>
                              <VStack align="start" spacing="1">
                                <Text fontWeight="medium">{item.productName}</Text>
                                <Text fontSize="sm" color={textColor}>
                                  {item.productCategory}
                                </Text>
                              </VStack>
                            </Td>
                            <Td>{item.quantity}</Td>
                            <Td>{formatPrice(item.price)}</Td>
                            <Td fontWeight="medium">
                              {formatPrice(item.price * item.quantity)}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>

                <Divider />

                {/* Order Summary */}
                <Flex justify="space-between" align="center" wrap="wrap">
                  <VStack align="start" spacing="1">
                    <Text fontSize="sm" color={textColor}>
                      Payment: {order.paymentMethod} ({order.paymentStatus})
                    </Text>
                    {order.shippingAddress && (
                      <Text fontSize="sm" color={textColor}>
                        Ship to: {order.shippingAddress.city}, {order.shippingAddress.state}
                      </Text>
                    )}
                  </VStack>
                  <HStack spacing="3">
                    {order.status === 'pending' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => {
                          // Handle cancel order
                          toast({
                            title: "Order cancellation",
                            description: "Order cancellation feature will be implemented soon.",
                            status: "info",
                            duration: 3000,
                            isClosable: true,
                          });
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => {
                        // Handle view details
                        toast({
                          title: "Order Details",
                          description: "Detailed order view will be implemented soon.",
                          status: "info",
                          duration: 3000,
                          isClosable: true,
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </HStack>
                </Flex>
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Orders;