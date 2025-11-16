import { Stack, Box } from "@mui/material";
import PausedUserTable from "../components/PausedUserTable";

const PausedUserPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ p: 2 }}>
        <PausedUserTable />
      </Box>
    </Box>
  );
};

export default PausedUserPage;
