import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

const defaultCategories = [
  "공통(전체)",
  "성적, 학업문제",
  "왕따, 학교폭력",
  "부모님과 갈등",
  "가정형편, 경제",
  "외모문제",
  "기타문제",
  "친구, 이성문제",
  "선생님과 갈등",
  "건강문제"
];

const CategorySelector = ({ selected, onChange }) => {
  const handleToggle = (category) => {
    if (selected.includes(category)) {
      onChange(selected.filter((item) => item !== category));
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography sx={{ fontWeight: "bold" }}>주제 카테고리 선택</Typography>
      <FormGroup row>
        {defaultCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                size="small"
                checked={selected.includes(cat)}
                onChange={() => handleToggle(cat)}
              />
            }
            label={cat}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CategorySelector;
