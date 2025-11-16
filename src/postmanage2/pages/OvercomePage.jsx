import { Box } from "@mui/material";
import OvercomeTable from "../components/OvercomeTable";

const OvercomePage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 1, p: 2 }}>
        <OvercomeTable />
      </Box>
    </Box>
  );
};

export default OvercomePage;
