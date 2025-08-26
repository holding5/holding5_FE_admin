import {
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Menu,
  Box,
} from "@mui/material";
import { useState, useRef } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import FnQEditorInline from "../components/FnQEditorInline";
import FnQTable from "../components/FnQTable";

const FnQPage = () => {
  // 샘플 카테고리
  const [categories, setCategories] = useState(["전체", "기능", "규칙", "기타"]);

  // 생성 핸들러 (임시로 콘솔에 출력)
  const handleCreate = (item) => {
    console.log("생성된 F&Q:", item);
  };

  // 카테고리 관리 버튼 핸들러
  const handleOpenCategory = () => {
    alert("카테고리 관리 모달 열기 (구현 예정)");
  };

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }} >
        <ContentSearchbar />
      </Stack>

      <FnQEditorInline
        categories={categories}
        onCreate={handleCreate}
        onOpenCategory={handleOpenCategory}
      />

      {/* 리스트 테이블 */}
      <Box component="section" sx={{ mt: "10px", p: "0px 20px" }}>
        <FnQTable/>
      </Box>

    </Box>
  );
};

export default FnQPage;