import { 
  Box, 
  Text, 
  Button, 
  VStack, 
  Heading, 
  Flex,
  useColorModeValue,
  Icon,
  Badge
} from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag, FiTrendingUp, FiZap } from "react-icons/fi";

const bannerData = [
  {
    id: 1,
    url: "https://i.pinimg.com/originals/4e/b6/1e/4eb61e7b68123a3340539a2e50811a59.jpg",
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends in home decor",
    cta: "Shop Now",
    badge: "TRENDING",
    icon: FiTrendingUp,
    gradient: "linear(to-r, orange.500, red.500)"
  },
  {
    id: 2,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCIWPMDmy7GxsX55PbRZF7ZPsWx3HjHpKB9eVNnf6&s",
    title: "Premium Home Decor",
    subtitle: "Transform your space with elegant designs",
    cta: "Explore",
    badge: "PREMIUM",
    icon: FiShoppingBag,
    gradient: "linear(to-r, blue.500, purple.500)"
  },
  {
    id: 3,
    url: "https://cdn13.afydecor.com/Decor-banner.jpg",
    title: "New Arrivals",
    subtitle: "Fresh styles just in time for the season",
    cta: "View All",
    badge: "NEW",
    icon: FiZap,
    gradient: "linear(to-r, green.500, teal.500)"
  },
  {
    id: 4,
    url: "https://thumbs.dreamstime.com/z/home-decor-design-decoration-plants-banner-colored-different-pots-green-cabinet-against-pastel-wall-stylish-modern-185406630.jpg",
    title: "Modern Living",
    subtitle: "Contemporary designs for modern homes",
    cta: "Discover",
    badge: "FEATURED",
    icon: FiShoppingBag,
    gradient: "linear(to-r, pink.500, red.500)"
  }
];

const BannerSlide = ({ data }) => {
  const textColor = useColorModeValue("white", "white");
  
  return (
    <Box position="relative" h="500px" overflow="hidden">
      {/* Background Image */}
      <Box
        as="img"
        src={data.url}
        alt="banner"
        w="100%"
        h="100%"
        objectFit="cover"
        position="absolute"
        top="0"
        left="0"
        zIndex="1"
      />
      
      {/* Gradient Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-r, blackAlpha.700, blackAlpha.400, transparent)"
        zIndex="2"
      />
      
      {/* Content Overlay */}
      <Box
        position="relative"
        zIndex="3"
        h="100%"
        display="flex"
        alignItems="center"
        px={{ base: 6, md: 12, lg: 20 }}
      >
        <VStack align="start" spacing="6" maxW="600px">
          {/* Badge */}
          <Badge
            bgGradient={data.gradient}
            color="white"
            variant="solid"
            borderRadius="full"
            px="4"
            py="2"
            fontSize="sm"
            fontWeight="bold"
            boxShadow="lg"
          >
            <Flex align="center" gap="2">
              <Icon as={data.icon} boxSize="4" />
              {data.badge}
            </Flex>
          </Badge>
          
          {/* Title */}
          <Heading
            size="2xl"
            color={textColor}
            fontWeight="extrabold"
            lineHeight="1.2"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            {data.title}
          </Heading>
          
          {/* Subtitle */}
          <Text
            fontSize="xl"
            color={textColor}
            opacity="0.9"
            fontWeight="medium"
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
            maxW="500px"
            lineHeight="1.5"
          >
            {data.subtitle}
          </Text>
          
          {/* Call to Action */}
          <Button
            as={Link}
            to="/product"
            size="lg"
            bgGradient={data.gradient}
            color="white"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "xl",
              filter: "brightness(1.1)"
            }}
            _active={{
              transform: "scale(0.95)"
            }}
            transition="all 0.3s ease"
            borderRadius="xl"
            px="8"
            py="6"
            fontWeight="bold"
            fontSize="lg"
            rightIcon={<Icon as={FiArrowRight} boxSize="5" />}
            boxShadow="lg"
          >
            {data.cta}
          </Button>
        </VStack>
      </Box>
      
      {/* Decorative Elements */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        h="100px"
        bgGradient="linear(to-t, blackAlpha.300, transparent)"
        zIndex="2"
      />
    </Box>
  );
};

const Banner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Box 
      position="relative"
      bg="gray.900"
      borderRadius={{ base: "0", md: "2xl" }}
      overflow="hidden"
      mx={{ base: 0, md: 4 }}
      my={{ base: 0, md: 6 }}
      boxShadow="2xl"
    >
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        slidesToSlide={1}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        showDots={true}
        arrows={false}
        pauseOnHover={true}
      >
        {bannerData.map((data) => (
          <BannerSlide key={data.id} data={data} />
        ))}
      </Carousel>
      
      {/* Custom Dots Styling */}
      <style jsx global>{`
        .custom-dot-list-style {
          bottom: 20px !important;
        }
        .custom-dot-list-style li {
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 50% !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }
        .custom-dot-list-style li.react-multi-carousel-dot--active {
          background: white !important;
          transform: scale(1.2) !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
        }
        .carousel-container {
          border-radius: inherit;
        }
        .carousel-item-padding-40-px {
          padding: 0 !important;
        }
      `}</style>
    </Box>
  );
};

export default Banner;
