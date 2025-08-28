import { Stack, Box, Button } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import DetailSearchBar from "../components/DetailSearchBar";
import DreamUserTable from "../components/DreamUserTable";

const DreamUserPage = () => {
  const [showDetail, setShowDetail] = useState(false); // 상세 검색바 상태
  const [filters, setFilters] = useState({}); // 선택된 상세 검색 필터 조건

  const handleToggleDetail = () => setShowDetail(prev => !prev);

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 상단 검색바 + 상세검색 버튼 */}
      <Stack direction="row" spacing={2} marginLeft="330px" alignItems="flex-start">
        <ContentSearchbar />
        {/* 상세검색 버튼 */}
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <Button
            variant="outlined"
            size="small"
            onClick={handleToggleDetail}
            sx={{ mt: 1 }}
          >
            {showDetail ? "상세검색 닫기" : "상세검색"}
          </Button>
        </Box>
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: "20px", pr: "70px", ml: 20 }} >
        {/* 상세 검색바 */}
        {showDetail && (
          <DetailSearchBar filters={filters} onChangeFilters={setFilters} />
        )}
      </Stack>

      <Box sx={{ mt: 2, p: 1}}>
        <DreamUserTable filters={filters} />
      </Box>

      
    </Box>
  );
};

export default DreamUserPage;
