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
} from "@mui/material";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import axiosInstance from "../../utils/axiosInstance";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSubmitting(true);

    try {
      // 🔥 로그인 API 호출 (/admin/auth/login)
      const res = await axiosInstance.post("/admin/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("로그인 응답:", res.data);

      const { accessToken, tokenType, expiresIn } = res.data;

      if (!accessToken) {
        setError("로그인 토큰을 받지 못했습니다.");
        return;
      }

      // 🔥 유저 정보는 아직 API가 없으므로 최소값만 저장
      const user = {
        email: form.email,
        role: "ADMIN",
        tokenType,
        expiresIn,
      };

      // AuthContext 저장
      login(accessToken, user);

      setHint("로그인 성공!");
      nav("/admin");
    } catch (err) {
      console.error("로그인 실패:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          setError(`로그인 중 오류 발생 (code: ${err.response.status})`);
        }
      } else {
        setError("서버에 연결할 수 없습니다.");
      }
    } finally {
      setSubmitting(false);
    }
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

          <Divider sx={{ my: 2 }} />
        </Stack>
      </Paper>
    </Box>
  );
}
