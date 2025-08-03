import TruthNoteTable from "./TruthNoteTable";
import { Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import TruthSearchBar from "./TruthSearchBar";
const TruthNoteList = () => {
  const { mockData } = useOutletContext();

  return (
    <Box>
      <Box sx={{ width: "70%", maxWidth: "1150px", mx: "auto", mb: 3 }}>
        <Typography variant="h6" component="h2">
          복구요청처리
        </Typography>

        <TruthNoteTable mockData={mockData} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TruthSearchBar />
      </Box>
    </Box>
  );
};

export default TruthNoteList;
