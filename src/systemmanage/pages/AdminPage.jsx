// src/pages/AdminPage.jsx
import { useState, useCallback } from "react";
import { Box, Container, Paper, Divider } from "@mui/material";
import AdminInputForm from "../components/AdminInputForm";
import AdminTable from "../components/AdminTable";

const initialForm = {
  id: null,
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
};

export default function AdminPage() {
  const [form, setForm] = useState(initialForm);

  const handlePickAdmin = useCallback((row) => {
    setForm((prev) => ({
      ...prev,
      id: row.id ?? prev.id,
      name: row.name ?? prev.name,
      email: row.email ?? prev.email,
      phoneNumber: row.phoneNumber ?? prev.phoneNumber,
      // 비밀번호는 유지/초기화하지 않음
    }));
  }, []);

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 5 }}>
      <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ p: 2 }}>
          <AdminInputForm
            form={form}
            onChange={setForm}
            // onReset={handleResetAll}  // 필요하면 AdminInputForm에 prop 추가해서 사용
          />
        </Paper>

        <Divider sx={{ my: 1 }} />

        <Paper variant="outlined" sx={{ p: 2 }}>
          <AdminTable onPick={handlePickAdmin} />
        </Paper>
      </Container>
    </Box>
  );
}
