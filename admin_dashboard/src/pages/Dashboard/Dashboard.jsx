import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  HStack,
  VStack,
  Icon,
  Progress,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
  SimpleGrid
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage
} from "react-icons/fi";

const Dashboard = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,456,789",
      change: "+12.5%",
      changeType: "increase",
      icon: FiDollarSign,
      color: "green"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "increase",
      icon: FiShoppingCart,
      color: "blue"
    },
    {
      title: "Total Users",
      value: "5,678",
      change: "+15.3%",
      changeType: "increase",
      icon: FiUsers,
      color: "purple"
    },
    {
      title: "Products",
      value: "456",
      change: "-2.1%",
      changeType: "decrease",
      icon: FiPackage,
      color: "orange"
    }
  ];

  const recentOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      email: "john@example.com",
      amount: "₹2,499",
      status: "completed",
      date: "2024-01-15"
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "₹1,299",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "#12347",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: "₹3,999",
      status: "shipped",
      date: "2024-01-14"
    },
    {
      id: "#12348",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: "₹899",
      status: "completed",
      date: "2024-01-14"
    }
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 156,
      revenue: "₹1,24,800",
      growth: "+12%"
    },
    {
      name: "Smart Watch",
      sales: 89,
      revenue: "₹89,000",
      growth: "+8%"
    },
    {
      name: "Laptop Stand",
      sales: 234,
      revenue: "₹46,800",
      growth: "+15%"
    },
    {
      name: "Phone Case",
      sales: 445,
      revenue: "₹22,250",
      growth: "+5%"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "green";
      case "pending": return "yellow";
      case "shipped": return "blue";
      default: return "gray";
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb={8}>
        <Heading size="lg" color={textColor} mb={2}>
          Dashboard Overview
        </Heading>
        <Text color="gray.500">
          Welcome back! Here's what's happening with your store today.
        </Text>
      </Box>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {stats.map((stat, index) => (
          <Box key={index} bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
            <Box>
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    {stat.title}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {stat.value}
                  </Text>
                  <HStack spacing={1}>
                    <Icon
                      as={stat.changeType === "increase" ? FiTrendingUp : FiTrendingDown}
                      color={stat.changeType === "increase" ? "green.500" : "red.500"}
                      boxSize={4}
                    />
                    <Text
                      fontSize="sm"
                      color={stat.changeType === "increase" ? "green.500" : "red.500"}
                      fontWeight="medium"
                    >
                      {stat.change}
                    </Text>
                  </HStack>
                </VStack>
                <Box
                  p={3}
                  bg={`${stat.color}.50`}
                  borderRadius="lg"
                  color={`${stat.color}.500`}
                >
                  <Icon as={stat.icon} boxSize={6} />
                </Box>
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
        {/* Recent Orders */}
        <GridItem>
          <Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
            <Box mb={6}>
              <HStack justify="space-between">
                <Heading size="md" color={textColor}>
                  Recent Orders
                </Heading>
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </HStack>
            </Box>
            <Box>
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Customer</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentOrders.map((order, index) => (
                      <Tr key={index}>
                        <Td>
                          <Text fontWeight="medium" color={textColor}>
                            {order.id}
                          </Text>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="medium" color={textColor}>
                              {order.customer}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {order.email}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontWeight="semibold" color={textColor}>
                            {order.amount}
                          </Text>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={getStatusColor(order.status)}
                            variant="subtle"
                            borderRadius="full"
                            textTransform="capitalize"
                          >
                            {order.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.500">
                            {order.date}
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Box>
        </GridItem>

        {/* Top Products */}
        <GridItem>
          <Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
            <Box mb={6}>
              <Heading size="md" color={textColor}>
                Top Products
              </Heading>
            </Box>
            <Box>
              <VStack spacing={4} align="stretch">
                {topProducts.map((product, index) => (
                  <Box key={index}>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color={textColor}>
                        {product.name}
                      </Text>
                      <Text fontSize="sm" color="green.500" fontWeight="medium">
                        {product.growth}
                      </Text>
                    </HStack>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="xs" color="gray.500">
                        {product.sales} sales
                      </Text>
                      <Text fontSize="xs" fontWeight="semibold" color={textColor}>
                        {product.revenue}
                      </Text>
                    </HStack>
                    <Progress
                      value={(product.sales / 500) * 100}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          </Box>
        </GridItem>
      </Grid>

      {/* Quick Actions */}
      <Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6}>
        <Box mb={6}>
          <Heading size="md" color={textColor}>
            Quick Actions
          </Heading>
        </Box>
        <Box>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Button
              leftIcon={<Icon as={FiPackage} />}
              colorScheme="blue"
              variant="outline"
              size="lg"
              h="60px"
            >
              Add Product
            </Button>
            <Button
              leftIcon={<Icon as={FiUsers} />}
              colorScheme="green"
              variant="outline"
              size="lg"
              h="60px"
            >
              View Users
            </Button>
            <Button
              leftIcon={<Icon as={FiShoppingCart} />}
              colorScheme="purple"
              variant="outline"
              size="lg"
              h="60px"
            >
              Manage Orders
            </Button>
            <Button
              leftIcon={<Icon as={FiTrendingUp} />}
              colorScheme="orange"
              variant="outline"
              size="lg"
              h="60px"
            >
              View Analytics
            </Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
