import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  SimpleGrid,
  Spinner,
  Center,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage
} from "react-icons/fi";
import { getDashboardAnalytics } from "../../redux/action/dashboardAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { analytics, analyticsLoading, analyticsError } = useSelector(state => state.dashboardReducer);
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(getDashboardAnalytics());
  }, [dispatch]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Format percentage
  const formatPercentage = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  // Prepare stats data from API with safe defaults
  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(analytics?.kpis?.totalRevenue?.value || 0),
      change: formatPercentage(analytics?.kpis?.totalRevenue?.change || 0),
      changeType: (analytics?.kpis?.totalRevenue?.change || 0) >= 0 ? "increase" : "decrease",
      icon: FiDollarSign,
      color: "green"
    },
    {
      title: "Total Orders",
      value: formatNumber(analytics?.kpis?.totalOrders?.value || 0),
      change: formatPercentage(analytics?.kpis?.totalOrders?.change || 0),
      changeType: (analytics?.kpis?.totalOrders?.change || 0) >= 0 ? "increase" : "decrease",
      icon: FiShoppingCart,
      color: "blue"
    },
    {
      title: "Total Users",
      value: formatNumber(analytics?.kpis?.totalUsers?.value || 0),
      change: formatPercentage(analytics?.kpis?.totalUsers?.change || 0),
      changeType: (analytics?.kpis?.totalUsers?.change || 0) >= 0 ? "increase" : "decrease",
      icon: FiUsers,
      color: "purple"
    },
    {
      title: "Products",
      value: formatNumber(analytics?.kpis?.totalProducts?.value || 0),
      change: formatPercentage(analytics?.kpis?.totalProducts?.change || 0),
      changeType: (analytics?.kpis?.totalProducts?.change || 0) >= 0 ? "increase" : "decrease",
      icon: FiPackage,
      color: "orange"
    }
  ];

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  // Get recent orders from API with safe defaults
  const recentOrders = analytics?.recentOrders || [];

  // Get top products from API with safe defaults
  const topProducts = analytics?.topProducts || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "green";
      case "pending": return "yellow";
      case "shipped": return "blue";
      default: return "gray";
    }
  };

  // Show loading state
  if (analyticsLoading || !analytics?.kpis) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.500">Loading dashboard data...</Text>
        </VStack>
      </Center>
    );
  }

  // Show error state
  if (analyticsError) {
    return (
      <Box>
        <Alert status="error" mb={4}>
          <AlertIcon />
          {analyticsError}
        </Alert>
        <Button onClick={() => dispatch(getDashboardAnalytics())} colorScheme="blue">
          Retry
        </Button>
      </Box>
    );
  }

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
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order, index) => (
                        <Tr key={index}>
                          <Td>
                            <Text fontWeight="medium" color={textColor}>
                              {order.orderId || `#${order._id?.slice(-6)}`}
                            </Text>
                          </Td>
                          <Td>
                            <VStack align="start" spacing={0}>
                              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                                {order.userEmail?.split('@')[0] || 'Unknown User'}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {order.userEmail}
                              </Text>
                            </VStack>
                          </Td>
                          <Td>
                            <Text fontWeight="semibold" color={textColor}>
                              {formatCurrency(order.totalAmount)}
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
                              {formatDate(order.createdAt)}
                            </Text>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={5} textAlign="center">
                          <Text color="gray.500">No recent orders found</Text>
                        </Td>
                      </Tr>
                    )}
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
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <Box key={index}>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" fontWeight="medium" color={textColor}>
                          {product.productName}
                        </Text>
                        <Text fontSize="sm" color="green.500" fontWeight="medium">
                          {formatPercentage(0)} {/* Growth calculation can be added later */}
                        </Text>
                      </HStack>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="xs" color="gray.500">
                          {product.totalSales} sales
                        </Text>
                        <Text fontSize="xs" fontWeight="semibold" color={textColor}>
                          {formatCurrency(product.totalRevenue)}
                        </Text>
                      </HStack>
                      <Progress
                        value={topProducts.length > 0 ? Math.min((product.totalSales / Math.max(...topProducts.map(p => p.totalSales))) * 100, 100) : 0}
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                      />
                    </Box>
                  ))
                ) : (
                  <Text color="gray.500" textAlign="center">
                    No product data available
                  </Text>
                )}
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
