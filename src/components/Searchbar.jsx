import "./Searchbar.css";
import { useState } from "react";
import {
  Paper,
  Select,
  MenuItem,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  const [searchCategory, setSearchCategory] = useState("integrated");

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: "20px",
        border: "1px solid #ccc",
        boxShadow: "none",
      }}
    >
      <Select
        value={searchCategory}
        onChange={handleCategoryChange}
        variant="standard"
        disableUnderline
        sx={{ ml: 1, p: "0 5px" }}
      >
        <MenuItem value="integrated">통합검색</MenuItem>
        <MenuItem value="title">제목</MenuItem>
        <MenuItem value="author">작성자</MenuItem>
      </Select>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="검색어를 입력하세요."
        inputProps={{ "aria-label": "search" }}
      />

      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
