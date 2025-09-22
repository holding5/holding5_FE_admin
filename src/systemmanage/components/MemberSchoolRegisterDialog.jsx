// MemberSchoolRegisterDialog.jsx
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  IconButton,
  Divider,
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  searchSchools,
  getSchoolDetail,
  previewPin,
  registerMemberSchool,
} from "../hooks/useSchool";

/* ------- 학교 검색 팝오버 ------- */
function SchoolSearchPopover({ open, anchorEl, onClose, onPick }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const runSearch = async () => {
    setLoading(true);
    try {
      const list = await searchSchools(keyword, 20);
      // UI에서 보기 좋게 키만 살짝 정리
      const mapped = list.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phoneNumber,
        address: r.address,
        province: r.province, // ex) 경상북도
        cityOffice: r.cityOffice, // ex) 경상북도교육청
        districtOffice: r.districtOffice, // ex) 구미교육지원청
      }));
      setResults(mapped);
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e) => e.key === "Enter" && runSearch();

  const pick = (row) => {
    onPick?.(row);
    onClose?.();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ sx: { width: 530, p: 1.5 } }}
    >
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          placeholder="학교명을 입력해 주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={onEnter}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={runSearch}
          disabled={loading}
          sx={{ minWidth: 90 }}
        >
          {loading ? "검색중" : "검색"}
        </Button>
      </Stack>

      <Divider sx={{ my: 1 }} />

      {results.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {loading ? "로딩 중..." : "검색 결과가 없습니다."}
        </Typography>
      ) : (
        <List dense sx={{ maxHeight: 320, overflowY: "auto" }}>
          {results.map((s) => (
            <ListItemButton key={s.id} onClick={() => pick(s)}>
              <ListItemText
                primary={s.name}
                secondaryTypographyProps={{ component: "span" }}
                secondary={
                  <>
                    <span>전화: {s.phone || "-"}</span>
                    <br />
                    <span>주소: {s.address || "-"}</span>
                    <br />
                    <span>
                      {s.province || "-"} / {s.cityOffice || "-"} /{" "}
                      {s.districtOffice || "-"}
                    </span>
                  </>
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Popover>
  );
}

/* ------- 메인 다이얼로그 ------- */
const initialForm = {
  schoolId: "",
  schoolName: "",
  phone: "",
  address: "",
  province: "",
  cityOffice: "",
  districtOffice: "",
};

export default function MemberSchoolRegisterDialog({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // 선생 옵션 & 선택값
  const [teacherOptions, setTeacherOptions] = useState([]); // [{id,name,phone}]
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]); // [101, 202, ...]

  // PIN
  const [pin, setPin] = useState("");

  const [popoverOpen, setPopoverOpen] = useState(false);
  const searchBtnRef = useRef(null);

  const resetAll = useCallback(() => {
    setForm(initialForm);
    setErrors({});
    setTeacherOptions([]);
    setSelectedTeacherIds([]);
    setPin("");
  }, []);

  const handleClose = () => {
    resetAll();
    onClose?.();
  };

  const validate = () => {
    const next = {};
    if (!form.schoolId) next.schoolName = "학교를 검색해 선택하세요.";
    if (!pin || pin.length !== 6) next.pin = "6자리 PIN을 생성해 주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const body = {
        teacherUserIds: selectedTeacherIds.map((v) => Number(v)),
        pinCode: pin,
        phoneNumber: form.phone,
        address: form.address,
        province: form.province,
        cityOffice: form.cityOffice,
        districtOffice: form.districtOffice,
      };

      await registerMemberSchool(form.schoolId, body);
      alert("회원학교 등록이 완료되었습니다.");
      handleClose();
    } catch (e) {
      // 409(CONFLICT): PIN 중복 등
      const status = e?.response?.status;
      if (status === 409) {
        alert(
          "이미 사용 중인 PIN이거나 학교 등록 충돌이 발생했습니다. 다시 시도해 주세요."
        );
      } else {
        alert("등록 중 오류가 발생했습니다.");
        console.error(e);
      }
    } finally {
      setSubmitting(false);
    }
  };

  /** 검색에서 학교 선택 시: 상세 조회로 값 주입 + 선생 옵션 구성 */
  const handlePickSchool = async (s) => {
    try {
      const detail = await getSchoolDetail(s.id);
      setForm({
        schoolId: detail.id ?? s.id,
        schoolName: detail.name ?? s.name ?? "",
        phone: detail.phoneNumber ?? s.phone ?? "",
        address: detail.address ?? s.address ?? "",
        province: detail.province ?? s.province ?? "",
        cityOffice: detail.cityOffice ?? s.cityOffice ?? "",
        districtOffice: detail.districtOffice ?? s.districtOffice ?? "",
      });
      setErrors({});

      // 현재 학교에 등록된 선생(활성) 목록
      const teachers = Array.isArray(detail.teachers)
        ? detail.teachers.map((t) => ({
            id: t.userId, // 숫자 ID
            name: t.name,
            phone: t.phoneNumber,
          }))
        : [];
      setTeacherOptions(teachers);
      setSelectedTeacherIds([]);

      // 현재 사용 중인 PIN이 있으면 표시
      if (detail.pinCode) setPin(detail.pinCode);
    } catch (e) {
      console.error(e);
      // 상세 호출 실패 시, 검색 결과 값만 우선 채움
      setForm({
        schoolId: s.id,
        schoolName: s.name ?? "",
        phone: s.phone ?? "",
        address: s.address ?? "",
        province: s.province ?? "",
        cityOffice: s.cityOffice ?? "",
        districtOffice: s.districtOffice ?? "",
      });
      setTeacherOptions([]);
      setSelectedTeacherIds([]);
      setPin("");
    }
  };

  const teacherMap = useMemo(() => {
    const m = new Map();
    teacherOptions.forEach((t) => m.set(t.id, t));
    return m;
  }, [teacherOptions]);

  const handleGeneratePin = async () => {
    try {
      const code = await previewPin();
      setPin(code);
      setErrors((prev) => ({ ...prev, pin: undefined }));
    } catch (e) {
      console.error(e);
      alert("PIN 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>회원학교 등록</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 500 }}>
          {/* 학교명 표시 + 검색 버튼 */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="학교명"
              size="small"
              fullWidth
              value={form.schoolName}
              InputProps={{ readOnly: true }}
              error={!!errors.schoolName}
              helperText={errors.schoolName}
            />
            <IconButton
              ref={searchBtnRef}
              color="primary"
              onClick={() => setPopoverOpen(true)}
              sx={{
                bgcolor: "#1b2b3f",
                color: "white",
                "&:hover": { bgcolor: "#162234" },
                width: 40,
                height: 40,
              }}
              aria-label="학교 검색"
              title="학교 검색"
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* 전화/주소 */}
          <TextField
            label="전화번호"
            size="small"
            fullWidth
            value={form.phone}
            InputProps={{ readOnly: true }}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="주소"
            size="small"
            fullWidth
            value={form.address}
            InputProps={{ readOnly: true }}
            error={!!errors.address}
            helperText={errors.address}
          />

          {/* 지역 정보 */}
          <Stack direction="row" spacing={1}>
            <TextField
              label="시·도"
              size="small"
              fullWidth
              value={form.province}
              InputProps={{ readOnly: true }}
              error={!!errors.province}
              helperText={errors.province}
            />
            <TextField
              label="교육청"
              size="small"
              fullWidth
              value={form.cityOffice}
              InputProps={{ readOnly: true }}
              error={!!errors.cityOffice}
              helperText={errors.cityOffice}
            />
            <TextField
              label="교육지원청"
              size="small"
              fullWidth
              value={form.districtOffice}
              InputProps={{ readOnly: true }}
              error={!!errors.districtOffice}
              helperText={errors.districtOffice}
            />
          </Stack>

          {/* 담당 선생님(선택) */}
          <FormControl size="small" fullWidth disabled={!form.schoolId}>
            <InputLabel id="teacher-select-label">
              담당 선생님 (선택)
            </InputLabel>
            <Select
              labelId="teacher-select-label"
              label="담당 선생님 (선택)"
              multiple
              value={selectedTeacherIds}
              onChange={(e) => setSelectedTeacherIds(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => (
                    <Chip key={id} label={teacherMap.get(id)?.name || id} />
                  ))}
                </Box>
              )}
            >
              {teacherOptions.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  <Checkbox checked={selectedTeacherIds.indexOf(t.id) > -1} />
                  <ListItemText primary={t.name} secondary={t.phone} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {form.schoolId && teacherOptions.length === 0 && (
            <Typography variant="caption" color="text.secondary">
              이 학교에 등록된 선생님 정보가 없습니다.
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />

          {/* 학교 PIN */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="학교 PIN번호"
              size="small"
              value={pin}
              InputProps={{ readOnly: true }}
              error={!!errors.pin}
              helperText={errors.pin}
              sx={{ width: 220 }}
            />
            <Button
              variant="contained"
              onClick={handleGeneratePin}
              disabled={!form.schoolId}
              sx={{
                bgcolor: "#1b2b3f",
                "&:hover": { bgcolor: "#162234" },
                minWidth: 90,
                height: 40,
              }}
            >
              생성
            </Button>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" fullWidth onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={submitting}
          onClick={submit}
          sx={{
            backgroundColor: "#D97904",
            "&:hover": { backgroundColor: "#c36e00" },
          }}
        >
          {submitting ? "처리중..." : "회원 학교 등록하기"}
        </Button>
      </DialogActions>

      {/* 🔍 학교 검색 팝오버 */}
      <SchoolSearchPopover
        open={popoverOpen}
        anchorEl={searchBtnRef.current}
        onClose={() => setPopoverOpen(false)}
        onPick={handlePickSchool}
      />
    </Dialog>
  );
}
