import { Box } from "@mui/material";
import DreamUserTable from "../components/DreamUserTable";

const DreamUserPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 2, px: 2 }}>
      <DreamUserTable />
    </Box>
  );
};

export default DreamUserPage;
