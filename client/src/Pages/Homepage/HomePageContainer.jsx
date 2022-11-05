import { Box, Button, Container, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePageContainer = ({ data }) => {
  let firstdata = data?.slice(0, 4);
  let seconddata = data?.slice(4, 9);
  console.log("data:const ", data);
  // const navigate = useNavigate()
  return <div>
    <Box w='90%' m='auto'>
    <Flex justifyContent='space-between' mt='10px' mb="10px">
    <Heading size='2xl'>Best Products...</Heading>
    <Link to="/product"><Button>View All</Button></Link>
    </Flex>

      <Flex >
      {firstdata?.map((el) => (
        <Box boxSize='sm' key={el._id}>
          <Link to={`/singleProduct/${el._id}`}>
          <Image borderRadius='15px' w='90%' src={el.prod_image}/>
				</Link>
        </Box>
      ))}
      </Flex>
    <Flex justifyContent='space-between'  mb="10px">
    <Heading size='2xl'>New Arrival...</Heading>
    <Link to="/product"><Button>View All</Button></Link>
    </Flex>

      <Flex >
      {seconddata?.map((el) => (
        <Box boxSize='sm' key={el._id}>
          <Link to={`/singleProduct/${el._id}`}>
          <Image borderRadius='15px' w='90%' src={el.prod_image}/>
				</Link>
        </Box>
      ))}
      </Flex>
      
    </Box>
  </div>;
};

export default HomePageContainer;
