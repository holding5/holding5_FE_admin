// src/pages/LoginPage.jsx
import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { getKakaoAuthUrl } from "../../utils/kakao";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();

  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hint, setHint] = useState(""); // UI 확인용 성공 힌트

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!form.email) return "이메일을 입력하세요.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "이메일 형식이 올바르지 않습니다.";
    if (!form.password) return "비밀번호를 입력하세요.";
    if (form.password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setHint("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    // 아직 api 없음 -> mock데이터 로그인
    setTimeout(() => {
      const fakeSuccess = Math.random() > 0.3; // 70% 성공
      if (fakeSuccess) {
        const fakeToken = "mock-jwt-token";
        const fakeUser = {
          id: 1,
          email: form.email,
          nickname: "관리자",
          role: "ADMIN",
        };

        login(fakeToken, fakeUser); // ✅ 로그인 처리!
        setHint("로그인 성공! (mock)");
        nav("/");
      } else {
        setError("로그인 실패 (mock)");
      }

      setSubmitting(false);
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "#f5f6fa",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", maxWidth: 420, borderRadius: 3 }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={800}>
            관리자 로그인
          </Typography>
          <Typography variant="body2" color="text.secondary">
            홀딩파이브 관리자 페이지 접근을 위해 로그인하세요.
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {hint && <Alert severity="success">{hint}</Alert>}

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="이메일"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                autoFocus
                required
              />
              <TextField
                label="비밀번호"
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPw((s) => !s)}
                        edge="end"
                        aria-label="비밀번호 표시"
                      >
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Login />}
                disabled={submitting}
                fullWidth
              >
                {submitting ? "로그인 중..." : "로그인"}
              </Button>
            </Stack>
          </form>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Link component="button" variant="body2" underline="hover" disabled>
              회원가입
            </Link>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                window.location.href = getKakaoAuthUrl();
              }}
            >
              카카오로 계속하기
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
