import { useParams } from "react-router-dom";
import {
  Box, Typography, Stack, TextField, Divider, Paper, MenuItem, Button
} from "@mui/material";
import useDreaminProfile from "../../hooks/useDreaminProfile";

const religionOptions = ["기독교", "불교", "천주교", "무교", "기타"];
const genderOptions = ["남", "여"];

const DreamUserProfile = () => {
  const { id } = useParams();
  const { form, setForm, histories, loading } = useDreaminProfile(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <TextField
          name="email"
          label="이메일"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          name="nickname"
          label="닉네임"
          value={form.nickname}
          onChange={handleChange}
        />
        <TextField
          name="gender"
          label="성별"
          value={form.gender}
          onChange={handleChange}
          select
        >
          {genderOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
        <TextField
          name="name"
          label="이름"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          name="birthdate"
          label="생년월일"
          value={form.birthdate}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
        />
        <TextField
          name="phoneNumber"
          label="전화번호"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          name="school"
          label="학교"
          value={form.school}
          onChange={handleChange}
        />
        <TextField
          name="job"
          label="직업"
          value={form.job}
          onChange={handleChange}
        />
        <TextField
          name="religion"
          label="종교"
          value={form.religion}
          onChange={handleChange}
          select
        >
          {religionOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>경력 변경 이력</Typography>
      <Stack spacing={2}>
        {histories.map((h, idx) => (
          <Box key={idx} sx={{ fontSize: 14 }}>
            {new Date(h.createdAt).toLocaleString()} - {h.content}
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" color="primary">수정</Button>
        <Button variant="outlined" color="error">삭제</Button>
        <Button variant="contained" color="secondary">행정관리</Button>
      </Stack>
    </Paper>
  );
};

export default DreamUserProfile;
