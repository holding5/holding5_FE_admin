// SimpleSchoolRegisterDialog.jsx
import { useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import {
  EDU_OFFICES,
  getSupportOffices,
  REGIONS,
} from "../utils/eduSupportData";
import { useCreateSchool } from "../hooks/useSchool"; // 경로 확인

const initialForm = {
  schoolName: "",
  phone: "",
  region: "",
  address: "",
  eduOffice: "",
  supportOffice: "",
};

const SimpleSchoolRegisterDialog = ({ open, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { createSchool, loading, error } = useCreateSchool();

  const supportOptions = useMemo(
    () => (form.eduOffice ? getSupportOffices(form.eduOffice) : []),
    [form.eduOffice]
  );

  const resetAll = useCallback(() => {
    setForm(initialForm);
    setErrors({});
  }, []);

  const handleClose = () => {
    resetAll();
    onClose?.();
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.schoolName.trim()) next.schoolName = "학교명을 입력하세요.";
    if (!form.phone.trim()) next.phone = "전화번호를 입력하세요.";
    if (!form.region) next.region = "지역(시·도)을 선택하세요.";
    if (!form.address.trim()) next.address = "주소를 입력하세요.";
    if (!form.eduOffice) next.eduOffice = "시·도 교육청을 선택하세요.";
    if (!form.supportOffice) next.supportOffice = "교육지원청을 선택하세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await createSchool(form); // useSchool 훅에서 payload 매핑 & POST
      alert("학교가 등록되었습니다.");
      handleClose();
    } catch (e) {
      const msg = e?.response?.data?.message || "등록 중 오류가 발생했습니다.";
      alert(msg);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>학교 등록</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 420 }}>
          <TextField
            label="학교명"
            size="small"
            fullWidth
            value={form.schoolName}
            onChange={(e) => setField("schoolName", e.target.value)}
            error={!!errors.schoolName}
            helperText={errors.schoolName}
          />
          <TextField
            label="전화번호"
            size="small"
            fullWidth
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="예) 02-123-4567 또는 010-1234-5678"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <FormControl size="small" fullWidth error={!!errors.region}>
            <Select
              labelId="region-select-label"
              value={form.region}
              onChange={(e) => setField("region", e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>지역(시·도) 선택</em>
              </MenuItem>
              {REGIONS.map((r) => (
                <MenuItem key={r.value} value={r.label}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
            {errors.region && (
              <Typography variant="caption" color="error">
                {errors.region}
              </Typography>
            )}
          </FormControl>
          <TextField
            label="주소"
            size="small"
            fullWidth
            value={form.address}
            onChange={(e) => setField("address", e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
          />

          <FormControl size="small" fullWidth error={!!errors.eduOffice}>
            <Select
              labelId="edu-office-label"
              value={form.eduOffice}
              onChange={(e) => {
                setField("eduOffice", e.target.value);
                setField("supportOffice", "");
              }}
              displayEmpty
            >
              <MenuItem value="">
                <em>시·도 교육청 선택</em>
              </MenuItem>
              {EDU_OFFICES.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
            {errors.eduOffice && (
              <Typography variant="caption" color="error">
                {errors.eduOffice}
              </Typography>
            )}
          </FormControl>

          <FormControl
            size="small"
            fullWidth
            disabled={!form.eduOffice}
            error={!!errors.supportOffice}
          >
            <Select
              labelId="support-office-label"
              value={form.supportOffice}
              onChange={(e) => setField("supportOffice", e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>
                  {form.eduOffice
                    ? "교육지원청 선택"
                    : "먼저 시·도 교육청을 선택하세요"}
                </em>
              </MenuItem>
              {supportOptions.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
            {errors.supportOffice && (
              <Typography variant="caption" color="error">
                {errors.supportOffice}
              </Typography>
            )}
          </FormControl>

          {error && (
            <Typography variant="caption" color="error">
              {error.response?.data?.message || "오류가 발생했습니다."}
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleClose}
          disabled={loading}
        >
          취소
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            backgroundColor: "#3D5A80",
            "&:hover": { backgroundColor: "#324c6b" },
          }}
        >
          {loading ? "등록 중..." : "학교 등록하기"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleSchoolRegisterDialog;
