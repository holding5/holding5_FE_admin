import { Box } from "@mui/material";
import HappyUserApplicationTable from "../components/HappyUserApplicationTable";

const HappyUserApplicationPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 2, px: 2 }}>
      <HappyUserApplicationTable />
    </Box>
  );
};

export default HappyUserApplicationPage;
