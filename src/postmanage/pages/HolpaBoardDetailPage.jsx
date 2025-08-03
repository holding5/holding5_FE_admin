import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import HolpaCommentCard from "../components/HolpaCommentCard";
import HolpaMainCard from "../components/HolpaMainCard";
import { Label } from "@mui/icons-material";

const HolpaBoardDetailPage = () => {
  const [sortOption, setSortOption] = useState("latest");

  const handleOrder = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        width: "80%",
      }}
    >
      <HolpaMainCard />
      <FormControl component="fieldset">
        <RadioGroup
          value={sortOption}
          onChange={setSortOption}
          aria-label="댓글정렬"
          row
        >
          <FormControlLabel value="latest" control={<Radio />} label="최신순" />
          <FormControlLabel control={<Radio />} label="등록순" value="oldest" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HolpaCommentCard />
      </Box>
    </Box>
  );
};

export default HolpaBoardDetailPage;
