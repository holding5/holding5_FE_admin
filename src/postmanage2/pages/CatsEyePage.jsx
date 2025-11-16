import { Box } from "@mui/material";
import CatsEyeTable from "../components/CatsEyeTable";

const CatsEyePage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 1, p: 2 }}>
        <CatsEyeTable />
      </Box>
    </Box>
  );
};

export default CatsEyePage;
