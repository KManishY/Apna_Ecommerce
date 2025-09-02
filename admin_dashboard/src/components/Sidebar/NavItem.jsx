import React from "react";
import {
  Box,
  HStack,
  Text,
  Icon,
  Badge,
  useColorModeValue
} from "@chakra-ui/react";

const NavItem = ({ 
  icon, 
  title, 
  isActive = false, 
  badge = null, 
  isChild = false 
}) => {
  const activeBg = useColorModeValue("blue.50", "blue.900");
  const activeColor = useColorModeValue("blue.600", "blue.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const inactiveColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      w="full"
      p={isChild ? 2 : 3}
      borderRadius="lg"
      bg={isActive ? activeBg : "transparent"}
      _hover={{ bg: isActive ? activeBg : hoverBg }}
      transition="all 0.2s ease"
      cursor="pointer"
      position="relative"
    >
      <HStack spacing={3} justify="space-between">
        <HStack spacing={3}>
          <Icon
            as={icon}
            boxSize={4}
            color={isActive ? activeColor : inactiveColor}
          />
          <Text
            fontSize="sm"
            fontWeight={isActive ? "semibold" : "medium"}
            color={isActive ? activeColor : textColor}
            ml={isChild ? 2 : 0}
          >
            {title}
          </Text>
        </HStack>
        
        {badge && (
          <Badge
            colorScheme="blue"
            variant="subtle"
            borderRadius="full"
            fontSize="xs"
            px={2}
            py={1}
            minW="20px"
            textAlign="center"
          >
            {badge}
          </Badge>
        )}
      </HStack>
      
      {/* Active indicator */}
      {isActive && (
        <Box
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          w="3px"
          h="20px"
          bg={activeColor}
          borderRadius="0 2px 2px 0"
        />
      )}
    </Box>
  );
};

export default NavItem;
