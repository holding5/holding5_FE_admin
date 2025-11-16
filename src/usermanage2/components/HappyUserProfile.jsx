// src/pages/components/HappyUserProfile.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { useHappyinProfile } from "../hooks/useHappyins";
import AdminModal from "./AdminModal";

const HappyUserProfile = () => {
  const { id } = useParams();
  const { form, histories, loading, refetch, rawStatus, rawRoles } =
    useHappyinProfile(id);

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  const handleAdminClick = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAdminAnchorEl(null);
  };

  if (loading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;

  // 공통 readOnly 스타일
  const readOnlyProps = {
    InputProps: { readOnly: true },
    size: "small",
    margin: "dense",
    fullWidth: true,
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* ===== 기본 정보 ===== */}
      <Stack spacing={2}>
        {/* 1행: 이름, 닉네임, 성별, 전화번호 */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="이름"
            value={form.name ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="닉네임"
            value={form.nickname ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="성별"
            value={form.gender ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="생년월일"
            value={form.birthdate ?? ""}
            placeholder="YYYY-MM-DD"
            {...readOnlyProps}
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: 260 }}
          />
          <TextField
            label="전화번호"
            value={form.phoneNumber ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
        </Stack>

        {/* 2행: 이메일, 종교, 학교/직장, 직업 */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="이메일"
            value={form.email ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="종교"
            value={form.religion ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="학교/직장"
            value={form.school ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="직업"
            value={form.workface ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
        </Stack>

        {/* 3행: 역할, 그룹카테고리 */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="해피인 분류"
            value={form.serviceRole ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="그룹 카테고리"
            value={form.groupCategory ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
        </Stack>

        <TextField
          label="해피인 소개"
          value={form.greetingMessage ?? ""}
          {...readOnlyProps}
          multiline
          minRows={4} // 최소 3줄 정도
          maxRows={6} // 선택: 너무 길면 스크롤
          sx={{ width: "100%" }}
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* ===== 이력 ===== */}
      <Typography variant="h6" gutterBottom>
        경력 변경 이력
      </Typography>
      <Box
        sx={{
          maxHeight: 200,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },
        }}
      >
        <Stack spacing={1.5}>
          {histories.map((h, idx) => (
            <Box key={idx} sx={{ fontSize: 14, lineHeight: 1.35 }}>
              {new Date(h.createdAt).toLocaleString()} - {h.content}
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ===== 행정 관리 버튼 ===== */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAdminClick}
        >
          행정관리
        </Button>
      </Stack>

      <AdminModal
        anchorEl={adminAnchorEl}
        onClose={handleAdminClose}
        userId={id}
        currentStatus={rawStatus}
        currentRoles={rawRoles}
        onDone={async () => {
          await refetch();
        }}
      />
    </Paper>
  );
};

export default HappyUserProfile;
