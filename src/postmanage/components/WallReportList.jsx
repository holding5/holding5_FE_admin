import ReportInfoCard from "./ReportInfoCard";
import { Box, Button, Select, MenuItem } from "@mui/material";
const WallReportList = () => {
  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <Box sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}>
        <Button
          sx={{
            borderRadius: 1,
            backgroundColor: "olive",
            color: "white",
            width: 180,
            height: 40,
            fontSize: "1rem",
          }}
        >
          일괄 행정관리
        </Button>
        <Select value={25} sx={{ width: 90, height: 40, mr: 10 }}>
          <MenuItem>25</MenuItem>
          <MenuItem>50</MenuItem>
          <MenuItem>100</MenuItem>
        </Select>
      </Box>
      <ReportInfoCard />
    </Box>
  );
};

export default WallReportList;
