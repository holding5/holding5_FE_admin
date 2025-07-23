import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import HopeMessageTable from "./HopeMessageTable";
import { useState } from "react";
const HopeMessageApprovedList = ({ userData, filters, onChangeFilter }) => {
  const [rows, setRows] = useState(25);

  const onChangeRows = (e) => {
    setRows(e.target.value);
  };
  const msgenum = 2456;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          sx={{
            backgroundColor: "rgba(236,236,236,1)",
            display: "inline-flex",
            p: "10px 30px",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: "normal", fontSize: "16p  x" }}
          >
            희망메시지
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>
          보유 희망메시지 &nbsp;
          <Typography component="span" sx={{ color: "red" }}>
            {msgenum}
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "50px" }}>
        <Button
          elevation={8}
          sx={{
            backgroundColor: "rgba(45, 66, 92, 1)",
            borderRadius: "20px",
            border: "5px solid rgba(238, 238, 238, 1)",
            p: "5px 30px",
            color: "white",
            cursor: "pointer",
          }}
        >
          거절리스트보기
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Select
          value={rows}
          onChange={onChangeRows}
          sx={{ width: "80px", height: "40px", borderRadius: 0 }}
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Box>

      <Box>
        <HopeMessageTable
          userData={userData}
          filters={filters}
          onChangeFilter={onChangeFilter}
        />
      </Box>
    </Box>
  );
};
export default HopeMessageApprovedList;
