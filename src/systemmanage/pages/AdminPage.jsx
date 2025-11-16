// src/pages/AdminPage.jsx
import { useState, useCallback } from "react";
import { Box, Container, Paper, Divider } from "@mui/material";
import AdminInputForm from "../components/AdminInputForm";
import AdminTable from "../components/AdminTable";
import { saveAdmin } from "../hooks/useAdmin";

const initialForm = {
  id: undefined,
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
};

export default function AdminPage() {
  const [form, setForm] = useState(initialForm);

  // 테이블 리마운트용 키 (변경되면 목록 재조회)
  const [tableKey, setTableKey] = useState(0);

  // 폼 내부 토글(해제/정지) 초기화를 위한 신호
  const [resetSignal, setResetSignal] = useState(0);

  const handlePickAdmin = useCallback((row) => {
    setForm((prev) => ({
      ...prev,
      id: row.id ?? prev.id,
      name: row.name ?? prev.name,
      email: row.email ?? prev.email,
      phoneNumber: row.phoneNumber ?? prev.phoneNumber,
      // 비밀번호는 유지
    }));
  }, []);

  const handleSubmit = async (payload) => {
    try {
      await saveAdmin(payload, payload.actionType);
      alert("등록/수정되었습니다.");

      // 1) 폼 초기화
      setForm(initialForm);
      setResetSignal((n) => n + 1);

      // 2) 목록 재조회 (리마운트)
      setTableKey((k) => k + 1);

      // 3) (선택) 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("등록/수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 5 }}>
      <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ p: 2 }}>
          <AdminInputForm
            form={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            resetSignal={resetSignal}
          />
        </Paper>

        <Divider sx={{ my: 1 }} />

        <Paper variant="outlined" sx={{ p: 2 }}>
          <AdminTable key={tableKey} onPick={handlePickAdmin} />
          {/* key 변경 → 리마운트 → 내부 훅이 다시 fetch */}
        </Paper>
      </Container>
    </Box>
  );
}
