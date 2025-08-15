import { Box, Typography } from "@mui/material";
import SailBoatList from "../components/SailBoatList";
import ContentSearchbar from "../../components/ContentSearchbar";
const SailBoatPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box sx={{ mr: 2 }}>
          <ContentSearchbar />
        </Box>
        <Typography>{"돛단배 > 리스트"}</Typography>
      </Box>

      <Box sx={{ ml: 2 }}>
        <SailBoatList />
      </Box>
    </Box>
  );
};

export default SailBoatPage;
