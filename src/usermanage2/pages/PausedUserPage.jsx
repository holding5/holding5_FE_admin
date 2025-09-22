import { Stack, Box } from "@mui/material";
import ContentSearchbar from "../../components/ContentSearchbar";
import PausedUserTable from "../components/PausedUserTable";

const PausedUserPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 검색바 */}
      <Stack
        direction="row"
        spacing={6}
        marginLeft="330px"
        sx={{ gap: "65px" }}
      >
        <ContentSearchbar />
      </Stack>

      <Box sx={{ mt: 2, p: 2 }}>
        <PausedUserTable />
      </Box>
    </Box>
  );
};

export default PausedUserPage;
