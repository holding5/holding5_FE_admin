import OverComingCommentCard from "../components/OverComingCommentCard";
import OverComingMainCard from "../components/OverComingMainCard";
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

const OverComingDetailPage = () => {
  const [sortOption, setSortOption] = useState("latest");

  const handleOrder = (e) => {
    setSortOption(e.target.value);
    //정렬 로직 추가
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
      <OverComingMainCard />
      <FormControl component="fieldset">
        <RadioGroup value={sortOption} onChange={handleOrder} row>
          <FormControlLabel value="latest" control={<Radio />} label="최신순" />
          <FormControlLabel control={<Radio />} label="등록순" value="oldest" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <OverComingCommentCard />
      </Box>
    </Box>
  );
};

export default OverComingDetailPage;
