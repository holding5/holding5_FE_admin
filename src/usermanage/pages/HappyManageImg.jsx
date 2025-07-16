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
import ContentSearchbar from "../../components/ContentSearchbar";
import UserGrid from "../../components/UserGrid";
const filterData = [
  {
    id: "asc",
    text: "가나다 순",
    activeColor: "#D97904",
    inactiveColor: "#3D5A80",
  },
  {
    id: "desc",
    text: "가나다 역순",
    activeColor: "#D97904",
    inactiveColor: "#3D5A80",
  },
  {
    id: "latest",
    text: "최신 순",
    activeColor: "#D97904",
    inactiveColor: "#3D5A80",
  },
  {
    id: "oldest",
    text: "오래된 순",
    activeColor: "#D97904",
    inactiveColor: "#3D5A80",
  },
  {
    id: "category",
    text: "카테고리 별",
    activeColor: "#D97904",
    inactiveColor: "#3D5A80",
  },
];

const HappyManageImg = () => {
  const [filterActiveButtonId, setFilterActiveButtonId] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const memNum = useRef(25);

  const onClickFilter = (buttonId) => {
    setFilterActiveButtonId(buttonId);
  };

  const onItemsChange = (e) => {
    setItemsPerPage(e.target.value);
  };
  return (
    <Box component="section" sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={6} marginLeft="60px" sx={{ gap: "65px" }}>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#3D5A80",
            borderRadius: "30px",
            width: "150px",
          }}
        >
          리스트로 보기
        </Button>
        <ContentSearchbar />
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mt: "20px", pr: "30px" }}
      >
        <Box
          component="div"
          sx={{
            paddingLeft: "70px",
            display: "flex",
            gap: "20px",
          }}
        >
          {filterData.map((item) => {
            const isActive = filterActiveButtonId === item.id;

            return (
              <Button
                key={item.id}
                onClick={() => {
                  onClickFilter(item.id);
                }}
                sx={{
                  backgroundColor: isActive
                    ? item.activeColor
                    : item.inactiveColor,
                  color: "white",
                  width: "150px",
                }}
              >
                {item.text}
              </Button>
            );
          })}
        </Box>

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
      </Stack>

      <Box component="section" sx={{ mt: "30px", p: "0px 20px" }}>
        <UserGrid />
      </Box>
    </Box>
  );
};

export default HappyManageImg;
