import { Box, Typography } from "@mui/material";
import RankDataTable from "./RankDataTable";
import ContentSearchbar from "../../components/ContentSearchbar";
const RankManageList = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "11rem",
          height: "2.5rem",
          backgroundColor: "#A0522D",
          display: "flex",
          borderRadius: "18px",
          justifyContent: "center",
          alignItems: "center",
          my: "2rem",
          ml: "2rem",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "bold" }}>
          등급관리
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: "2rem" }}>
        <ContentSearchbar />
      </Box>
      <RankDataTable />
    </Box>
  );
};

export default RankManageList;
