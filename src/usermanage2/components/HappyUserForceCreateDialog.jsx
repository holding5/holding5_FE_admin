import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import {
  happyinRoleMap,
  groupCategoryMap,
  religionMap,
} from "../../constant/codeMaps";
import { useHappyinForceCreate } from "../hooks/useHappyins";

const genderOptions = [
  { value: "MAN", label: "남" },
  { value: "WOMAN", label: "여" },
];

const defaultForm = {
  email: "",
  password: "",
  name: "",
  nickname: "",
  gender: "MAN",
  birthDate: "",
  phoneNumber: "",
  affiliation: "",
  serviceRole: "BASIC_HAPPYIN",
  groupCategory: "CULTURE_ART",
  religion: "NONE",
};

export default function HappyUserForceCreateDialog({
  open,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const { submit, loading, error } = useHappyinForceCreate();

  // 다이얼로그 열릴 때마다 초기화
  useEffect(() => {
    if (open) {
      setForm(defaultForm);
      setErrors({});
    }
  }, [open]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.email) next.email = "이메일을 입력하세요.";
    if (!form.password) next.password = "초기 비밀번호를 입력하세요.";
    if (!form.name) next.name = "이름을 입력하세요.";
    if (!form.nickname) next.nickname = "닉네임을 입력하세요.";
    if (!form.gender) next.gender = "성별을 선택하세요.";
    if (!form.birthDate) next.birthDate = "생년월일을 선택하세요.";
    if (!form.phoneNumber) next.phoneNumber = "전화번호를 입력하세요.";
    if (!form.affiliation) next.affiliation = "소속을 입력하세요.";
    if (!form.serviceRole) next.serviceRole = "해피인 분류를 선택하세요.";
    if (!form.groupCategory) next.groupCategory = "그룹 분류를 선택하세요.";
    if (!form.religion) next.religion = "종교를 선택하세요.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await submit(form);
      if (onSuccess) onSuccess(); // 예: 목록 refetch
      onClose();
    } catch (e) {
      // 에러는 상단 error 또는 alert 로 표시 가능
      console.error(e);
    }
  };

  const handleClose = () => {
    if (!loading) onClose();
  };

  // ----------------- 전화번호 자동 하이픈 util -----------------
  function formatPhone(raw) {
    raw = raw.replace(/\D/g, "");

    let formatted = raw;

    if (raw.startsWith("01")) {
      if (raw.length > 3 && raw.length <= 7)
        formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
      else if (raw.length > 7)
        formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }

    return formatted;
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setForm((prev) => ({
      ...prev,
      phoneNumber: formatted,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>해피인 직권 생성</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* 로그인 정보 */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="이메일"
              fullWidth
              value={form.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              size="small"
            />
            <TextField
              label="초기 비밀번호"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              size="small"
            />
          </Stack>

          {/* 기본 정보 */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="이름"
              fullWidth
              value={form.name}
              onChange={handleChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              size="small"
            />
            <TextField
              label="닉네임"
              fullWidth
              value={form.nickname}
              onChange={handleChange("nickname")}
              error={!!errors.nickname}
              helperText={errors.nickname}
              size="small"
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <FormControl fullWidth size="small" error={!!errors.gender}>
              <InputLabel>성별</InputLabel>
              <Select
                value={form.gender}
                label="성별"
                onChange={handleChange("gender")}
              >
                {genderOptions.map((g) => (
                  <MenuItem key={g.value} value={g.value}>
                    {g.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth size="small" error={!!errors.religion}>
              <InputLabel>종교</InputLabel>
              <Select
                value={form.religion}
                label="종교"
                onChange={handleChange("religion")}
              >
                {Object.entries(religionMap).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.religion && (
                <FormHelperText>{errors.religion}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="생년월일"
              type="date"
              fullWidth
              value={form.birthDate}
              onChange={handleChange("birthDate")}
              error={!!errors.birthDate}
              helperText={errors.birthDate || "YYYY-MM-DD"}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="전화번호"
              fullWidth
              value={form.phoneNumber}
              onChange={handlePhoneChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber || "예: 010-1234-5678"}
              size="small"
            />
          </Stack>

          <TextField
            label="소속(학교/직장 등)"
            fullWidth
            value={form.affiliation}
            onChange={handleChange("affiliation")}
            error={!!errors.affiliation}
            helperText={errors.affiliation}
            size="small"
          />

          {/* 구분 / 그룹 / 종교 */}
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth size="small" error={!!errors.serviceRole}>
              <InputLabel>해피인 분류</InputLabel>
              <Select
                value={form.serviceRole}
                label="해피인 분류"
                onChange={handleChange("serviceRole")}
              >
                {Object.entries(happyinRoleMap).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.serviceRole && (
                <FormHelperText>{errors.serviceRole}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth size="small" error={!!errors.groupCategory}>
              <InputLabel>그룹 분류</InputLabel>
              <Select
                value={form.groupCategory}
                label="그룹 분류"
                onChange={handleChange("groupCategory")}
              >
                {Object.entries(groupCategoryMap).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.groupCategory && (
                <FormHelperText>{errors.groupCategory}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          {error && (
            <Box sx={{ color: "error.main", fontSize: 12 }}>
              서버 오류: {error}
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          취소
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "생성 중..." : "직권 생성"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
