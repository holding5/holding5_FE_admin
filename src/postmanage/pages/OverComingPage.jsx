import { Box, Typography } from "@mui/material";
import ContentSearchbar from "../../components/ContentSearchbar";
import colors from "../../constant/colors";

const OverComingPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ContentSearchbar />
      </Box>
      <Box sx={{ pl: 5 }}>
        <Box
          sx={{
            backgroundColor: colors.GREY,
            display: "inline-block",
            px: 9,
            py: 1,
            borderRadius: 1.2,
          }}
        >
          <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
            극복수기
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OverComingPage;
