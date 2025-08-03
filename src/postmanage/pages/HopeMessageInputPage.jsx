import {
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Menu,
  Box,
} from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContentSearchbar from "../../components/ContentSearchbar";
import HopeMessageSelectButton from "../components/HopeMessageSelectButton";
import HopeMessageInputForm from "../components/HopeMessageInputForm";

const HopeMessageInputPage = () => {
  const nav = useNavigate();
  
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }} >
        <ContentSearchbar />
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mt: "20px", pr: "70px" }}
      >
        <Box
          component="div"
          sx={{
            paddingLeft: "70px",
            display: "flex",
            gap: "20px",
          }}
        >
          <HopeMessageSelectButton />
        </Box>

        
      </Stack>

      <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
        <HopeMessageInputForm />
      </Box>

      
    </Box>
  );
};

export default HopeMessageInputPage;
