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
import HopeMessageTableAll from "../components/HopeMessageTableAll";

const HopeMessageList = () => {
  const nav = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const memNum = useRef(25);

  const onItemsChange = (e) => {
    setItemsPerPage(e.target.value);
  };
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

        <Box sx={{ mt: "150px" }}>
          <FormControl>
          <Select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsChange(e);
            }}
            sx={{
              width: "150px",
              height: "40px",
              textAlign: "center",
              backgroundColor: "#3D5A80",
              color: "white",
            }}
          >
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        </Box>
      </Stack>

      <Box component="section" sx={{ mt: "30px", p: "0px 20px" }}>
        <HopeMessageTableAll itemsPerPage={itemsPerPage}/>
      </Box>
    </Box>
  );
};

export default HopeMessageList;
