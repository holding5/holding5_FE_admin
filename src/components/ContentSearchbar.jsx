import { Button, Box, InputBase } from "@mui/material";
import { useState } from "react";

const ContentSearchbar = () => {
  const [input, setInput] = useState("");

  const onChangeSearch = (e) => {
    setInput(e.target.value);
  };

  return (
    <Box component="form" sx={{ display: "flex", gap: 3 }}>
      <InputBase
        placeholder="검색어를 입력해주세요."
        onChange={onChangeSearch}
        value={input}
        sx={{
          border: "1px solid black",
          width: "400px",
          textAlign: "center",
          "& .MuiInputBase-input": {
            paddingLeft: "10px",
            textAlign: "left",
            "&::placeholder": {
              textAlign: "center",
            },
          },
        }}
      />
      <Button sx={{ backgroundColor: "#3D5A80", color: "white" }}>검색</Button>
    </Box>
  );
};

export default ContentSearchbar;
