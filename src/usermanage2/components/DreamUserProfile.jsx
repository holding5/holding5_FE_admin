import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Divider,
  Paper,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useDreaminProfile } from "../hooks/useDreamins";
import AdminModal from "./AdminModal";

const DreamUserProfile = () => {
  const { id } = useParams();
  const { form, setForm, histories, loading, refetch, rawStatus, rawRoles } =
    useDreaminProfile(id);

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  const handleAdminClick = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAdminAnchorEl(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Grid container spacing={3}>
          {/* 가로 전체 쓰는 항목 */}
          <Grid item xs={12}>
            <TextField
              name="email"
              label="이메일"
              value={form.email}
              onChange={handleChange}
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>

          {/* 반 칸(2열) 배치 */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="nickname"
              label="닉네임"
              value={form.nickname}
              onChange={handleChange}
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="gender"
              label="성별"
              value={form.gender}
              onChange={handleChange}
              select
              fullWidth
              size="small"
              margin="dense"
            >
              {["남", "여"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* 3열 배치 예시: md=4 */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="name"
              label="이름"
              value={form.name}
              onChange={handleChange}
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="birthdate"
              label="생년월일"
              value={form.birthdate}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              fullWidth
              size="small"
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="phoneNumber"
              label="전화번호"
              value={form.phoneNumber}
              onChange={handleChange}
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="school"
              label="학교"
              value={form.school}
              onChange={handleChange}
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="religion"
              label="종교"
              value={form.religion}
              onChange={handleChange}
              select
              fullWidth
              size="small"
              margin="dense"
            >
              {["기독교", "불교", "천주교", "무교", "기타"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="job"
              label="직업"
              value={form.job}
              onChange={handleChange}
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>
        </Grid>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        경력 변경 이력
      </Typography>
      {/* 👇 이 상자 안에서만 스크롤 */}
      <Box
        sx={{
          maxHeight: 200, // 원하는 높이로 조절
          overflowY: "auto",
          pr: 1, // 스크롤바 공간만큼 우측 여백
          // 선택: 얇은 스크롤바
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

export default DreamUserProfile;
