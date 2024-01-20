import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "./filter.module.css";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialProductParams = searchParams.getAll("category");
  const initialSortParams = searchParams.get("sortBy");
  const initialRatingSortParams = searchParams.get("sortByRating");

  const [category, setCategory] = useState(initialProductParams || []);
  const [sortBy, setSortBy] = useState(initialSortParams || "");
  const [sortByRating, setSortByRating] = useState(
    initialRatingSortParams || ""
  );

  const handleChange = (e) => {
    const option = e.target.value;
    setCategory((prevCategories) => {
      const newCategories = [...prevCategories];
      if (newCategories.includes(option)) {
        newCategories.splice(newCategories.indexOf(option), 1);
      } else {
        newCategories.push(option);
      }
      return newCategories;
    });
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortByRating = (e) => {
    setSortByRating(e.target.value);
  };

  useEffect(() => {
    setSearchParams({
      category: category,
      sortBy: sortBy,
      sortByRating: sortByRating
    });
  }, [category, setSearchParams, sortBy, sortByRating]);
  return (
    <Box className={styled.min_div}>
      <Box className={styled.Filter_main_div}>
        <Heading className={styled.allHeading}>Products</Heading>
        {[
          "Lamp",
          "Pots & Planters",
          "Aquariums & Terrariums",
          "Table Fountains",
          "Garden Accessories"
        ].map((item) => (
          <Box key={item} className={styled.main_box_input}>
            <input
              type="checkbox"
              className={styled.checkbox_size}
              value={item}
              defaultChecked={category.includes(item)}
              onChange={(e) => handleChange(e)}
            />
            <label className={styled.label}>{item}</label>
          </Box>
        ))}
      </Box>

      <Box className={styled.Filter_main_div}>
        <Heading className={styled.allHeading}>Sorting by Price</Heading>
        <Box onChange={handleSortBy} className={styled.sorting_div}>
          {["asc", "desc"].map((item) => (
            <Box key={item} className={styled.main_box_input}>
              <input
                type="radio"
                name="sortBy"
                value={item}
                className={styled.checkbox_size}
                defaultChecked={sortBy === item}
              />
              <label className={styled.label}>
                {item === "asc" ? "Highest" : "Lowest"} Price
              </label>
            </Box>
          ))}
        </Box>

        <Heading className={styled.allHeading}>Sorting by Rating</Heading>
        <Box onChange={handleSortByRating} className={styled.sorting_div}>
          {["high", "low"].map((item) => (
            <Box key={item} className={styled.main_box_input}>
              <input
                type="radio"
                name="sortByRating"
                value={item}
                className={styled.checkbox_size}
                defaultChecked={sortByRating === item}
              />
              <label className={styled.label}>
                {item === "high" ? "Highest" : "Lowest"} Rating
              </label>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
