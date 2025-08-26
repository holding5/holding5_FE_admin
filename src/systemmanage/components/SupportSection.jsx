// SupportSection.jsx
import { useState, useMemo } from "react";
import { Box, Stack, Button, Typography, Divider } from "@mui/material";
import SupportCategoryInput from "./SupportCategoryInput";        // 새로 만든 컴포넌트
import SupportList from "./SupportList";
import { getSponsors } from "../api";

const CATEGORY_OPTIONS = ["전체", "정기후원단체", "후원단체·회사", "후원자"];

const SupportSection = () => {
  const { orgs, companies, individuals } = getSponsors();

  // ✅ 이끄는 말 state (섹션별로 독립 보관)
  const [lead, setLead] = useState({ enabled: false, text: "" });

  // ✅ 카테고리 state
  const [category, setCategory] = useState("전체");

  // ✅ 선택된 카테고리에 따른 데이터 계산
  const filtered = useMemo(() => {
    switch (category) {
      case "정기후원단체":
        return { orgs, companies: [], individuals: [] };
      case "후원단체·회사":
        return { orgs: [], companies, individuals: [] };
      case "후원자":
        return { orgs: [], companies: [], individuals };
      default: // "전체"
        return { orgs, companies, individuals };
    }
  }, [category, orgs, companies, individuals]);

  // 버튼 핸들러 (필요 시 모달/폼 연결)
  const handleOpenCategoryManager = () => {
    // TODO: 카테고리 관리 모달/드로어 오픈
    // ex) setCategoryManagerOpen(true)
    console.log("카테고리 관리 열기");
  };
  const handleCreate = () => console.log("등록");
  const handleEdit = () => console.log("수정");

  return (
    <Box>

      {/* 카테고리 선택 + 관리 버튼 */}
      <SupportCategoryInput
        categories={CATEGORY_OPTIONS}
        value={category}
        onChange={setCategory}
        onOpenCategory={handleOpenCategoryManager}
        label="후원 카테고리"
        required
        sx={{ mb: 2 }}
      />

      {/* 3) 우측 액션 버튼 */}
      <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mb: 1 }}>
        <Button variant="contained" onClick={handleCreate}>등록</Button>
        <Button variant="outlined" onClick={handleEdit}>수정</Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* 4) 리스트 렌더링 (카테고리별) */}
      {category === "전체" || category === "정기후원단체" ? (
        <>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>정기후원단체</Typography>
          <SupportList items={filtered.orgs} />
        </>
      ) : null}

      {category === "전체" || category === "후원단체·회사" ? (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3 }}>후원단체·회사</Typography>
          <SupportList items={filtered.companies} />
        </>
      ) : null}

      {category === "전체" || category === "후원자" ? (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3 }}>후원자</Typography>
          <SupportList items={filtered.individuals} />
        </>
      ) : null}
    </Box>
  );
};

export default SupportSection;
