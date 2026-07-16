import { Box, Typography } from "@mui/material";
import SuggestionTable from "../components/SuggestionTable";

/**
 * 운영자에게 건의하기 관리 페이지 — 목록/상세/답변/삭제.
 */
const SuggestionPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        운영자에게 건의하기
      </Typography>
      <SuggestionTable />
    </Box>
  );
};

export default SuggestionPage;
