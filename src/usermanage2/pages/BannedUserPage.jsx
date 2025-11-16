import { Stack, Box } from "@mui/material";
import BannedUserTable from "../components/BannedUserTable";

const BannedUserPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ p: 2 }}>
        <BannedUserTable />
      </Box>
    </Box>
  );
};

export default BannedUserPage;
