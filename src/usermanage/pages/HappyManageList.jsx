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
import DetailSearch from "../../components/DetailSearch";
import UserTable from "../../components/UserTable";

const HappyManageList = () => {
  const nav = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const memNum = useRef(25);

  const onItemsChange = (e) => {
    setItemsPerPage(e.target.value);
  };
  return (
    <Box component="section" sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={6} marginLeft="60px" sx={{ gap: "65px" }}>
        <Button
          onClick={() => nav("/")}
          sx={{
            color: "white",
            backgroundColor: "#3D5A80",
            borderRadius: "30px",
            width: "150px",
          }}
        >
          사진으로 보기
        </Button>
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
        </Box>

        <DetailSearch />

        <Box sx={{ mt: "235px" }}>
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
            <MenuItem value={25}>25명</MenuItem>
            <MenuItem value={50}>50명</MenuItem>
            <MenuItem value={100}>100명</MenuItem>
          </Select>
        </FormControl>

        </Box>

        
      </Stack>

      <Box component="section" sx={{ mt: "30px", p: "0px 20px" }}>
        <UserTable itemsPerPage={itemsPerPage}/>
      </Box>
    </Box>
  );
};

export default HappyManageList;
