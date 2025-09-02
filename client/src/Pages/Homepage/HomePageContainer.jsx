import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Heading, 
  Image, 
  Text, 
  VStack, 
  HStack,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Tooltip,
  Divider
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiStar, FiShoppingCart, FiTrendingUp, FiZap } from "react-icons/fi";

const HomePageContainer = ({ data }) => {
  let firstdata = data?.slice(0, 4);
  let seconddata = data?.slice(4, 9);
  
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const ProductCard = ({ product, isNew = false, isBest = false }) => (
    <Box
      as={Link}
      to={`/singleProduct/${product._id}`}
      _hover={{ 
        transform: "translateY(-12px) scale(1.02)",
        boxShadow: "2xl"
      }}
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      shadow="xl"
      border="2px solid"
      borderColor={isBest ? "orange.200" : borderColor}
      position="relative"
      _group
      bgGradient={isBest ? "linear(to-br, white, orange.50)" : "linear(to-br, white, gray.50)"}
    >
      {/* Best Product Badge */}
      {isBest && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bgGradient="linear(to-r, orange.400, red.400)"
          color="white"
          textAlign="center"
          py="2"
          fontSize="sm"
          fontWeight="bold"
          zIndex="2"
        >
          <Flex align="center" justify="center" gap="2">
            <Icon as={FiTrendingUp} />
            BEST SELLER
          </Flex>
        </Box>
      )}

      {/* New Arrival Badge */}
      {isNew && (
        <Badge
          position="absolute"
          top="3"
          right="3"
          bgGradient="linear(to-r, green.400, teal.400)"
          color="white"
          variant="solid"
          borderRadius="full"
          px="4"
          py="2"
          zIndex="1"
          fontSize="sm"
          fontWeight="bold"
          boxShadow="lg"
        >
          <Flex align="center" gap="1">
            <Icon as={FiZap} />
            NEW
          </Flex>
        </Badge>
      )}

      {/* Product Image Container */}
      <Box 
        position="relative" 
        overflow="hidden"
        bgGradient="linear(to-br, gray.100, gray.200)"
        p="4"
      >
        <Image
          src={product.prod_image}
          alt={product.prod_name}
          w="100%"
          h="220px"
          objectFit="cover"
          borderRadius="xl"
          transition="all 0.4s ease"
          _groupHover={{ 
            transform: "scale(1.1) rotate(2deg)",
            filter: "brightness(1.1)"
          }}
        />
        
        {/* Quick Add to Cart Overlay */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bgGradient="linear(to-t, blackAlpha.900, blackAlpha.700)"
          color="white"
          p="4"
          transform="translateY(100%)"
          transition="transform 0.4s ease"
          _groupHover={{ transform: "translateY(0)" }}
          borderRadius="xl"
        >
          <Flex align="center" justify="center" gap="3">
            <Icon as={FiShoppingCart} boxSize="5" />
            <Text fontSize="md" fontWeight="bold">Quick Add to Cart</Text>
          </Flex>
        </Box>
      </Box>

      {/* Product Info */}
      <Box p="6" position="relative">
        {/* Category Badge */}
        <Badge
          colorScheme="blue"
          variant="subtle"
          borderRadius="full"
          px="3"
          py="1"
          mb="3"
          fontSize="xs"
          fontWeight="semibold"
        >
          {product.prod_cat}
        </Badge>
        
        <VStack align="start" spacing="3">
          <Heading 
            size="md" 
            color={textColor} 
            noOfLines={2}
            fontWeight="bold"
            lineHeight="1.3"
          >
            {product.prod_name}
          </Heading>
          
          {/* Rating and Price Row */}
          <HStack spacing="4" align="center" w="100%">
            <HStack spacing="2" bg="yellow.50" px="3" py="1" borderRadius="full">
              <Icon as={FiStar} color="yellow.500" boxSize="4" />
              <Text fontSize="sm" fontWeight="bold" color="yellow.700">
                {product.prod_rating}
              </Text>
            </HStack>
            
            <Text fontSize="xl" fontWeight="extrabold" color={accentColor}>
              ₹{product.prod_price}
            </Text>
          </HStack>
          
          {/* Description Preview */}
          <Text
            fontSize="sm"
            color="gray.600"
            noOfLines={2}
            lineHeight="1.4"
          >
            {product.prod_desc}
          </Text>
        </VStack>
      </Box>
    </Box>
  );

  const SectionHeader = ({ title, subtitle, icon, showViewAll = true, gradient = "blue" }) => {
    const gradientColors = {
      blue: "linear(to-r, blue.500, purple.500)",
      orange: "linear(to-r, orange.500, red.500)",
      green: "linear(to-r, green.500, teal.500)"
    };

    return (
      <VStack spacing="4" align="start" mb="10" w="100%">
        <Flex align="center" gap="4" mb="2">
          <Box
            p="3"
            borderRadius="xl"
            bgGradient={gradientColors[gradient]}
            color="white"
            boxShadow="lg"
          >
            <Icon as={icon} boxSize="6" />
          </Box>
          <VStack align="start" spacing="1">
            <Heading
              size="2xl"
              bgGradient={gradientColors[gradient]}
              bgClip="text"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="600px"
                fontWeight="medium"
              >
                {subtitle}
              </Text>
            )}
          </VStack>
        </Flex>
        
        {showViewAll && (
          <Button
            as={Link}
            to="/product"
            rightIcon={<Icon as={FiArrowRight} />}
            size="lg"
            bgGradient={gradientColors[gradient]}
            color="white"
            _hover={{
              transform: "translateX(8px)",
              boxShadow: "xl"
            }}
            _active={{
              transform: "scale(0.95)"
            }}
            transition="all 0.3s ease"
            borderRadius="xl"
            px="8"
            py="4"
            fontWeight="bold"
          >
            Explore All Products
          </Button>
        )}
      </VStack>
    );
  };

  return (
    <Box 
      bgGradient="linear(to-b, gray.50, white)"
      py="16"
      minH="100vh"
    >
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        {/* Best Products Section */}
        <SectionHeader
          title="Best Products"
          subtitle="Discover our handpicked selection of premium products that our customers love the most. These are the top performers!"
          icon={FiTrendingUp}
          gradient="orange"
        />
        
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing="8"
          mb="20"
        >
          {firstdata?.map((el, index) => (
            <ProductCard 
              key={el._id} 
              product={el} 
              isBest={index === 0} // First product gets best seller badge
            />
          ))}
        </SimpleGrid>

        <Divider 
          borderColor="gray.300" 
          borderWidth="2px" 
          borderRadius="full" 
          opacity="0.6"
          mb="16"
        />

        {/* New Arrivals Section */}
        <SectionHeader
          title="New Arrivals"
          subtitle="Fresh products just arrived! Be the first to explore our latest additions and stay ahead of the trend."
          icon={FiZap}
          gradient="green"
        />
        
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing="8"
        >
          {seconddata?.map((el) => (
            <ProductCard key={el._id} product={el} isNew={true} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HomePageContainer;
