import { Box } from "@mui/material";
import ReportedPostTable from "../components/ReportedPostTable";

const ReportedPostPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 1, p: 2 }}>
        <ReportedPostTable />
      </Box>
    </Box>
  );
};

export default ReportedPostPage;
