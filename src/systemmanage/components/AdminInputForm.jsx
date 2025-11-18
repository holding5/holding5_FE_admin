import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
  // 🔹 추가
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import { searchMembers } from "../hooks/useAdmin"; // ⬅️ 훅에서 API 사용

/**
 * props
 *  - form: { id, name, email, phoneNumber, password }
 *  - onChange: (updater) => void
 *  - onSubmit?: (payload) => void   // 🔹 추가: 등록/수정 버튼 콜백
 */
export default function AdminInputForm({
  form,
  onChange,
  onSubmit,
  resetSignal,
}) {
  const [openPicker, setOpenPicker] = useState(false);

  // 🔹 추가: '해제/정지' 선택 상태 (null | 'RELEASE' | 'SUSPEND')
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    setActionType(null);
    setOpenPicker(false);
  }, [resetSignal]);

  // 🔹 모든 기본 필드가 비면, id도 함께 초기화해서 "신규 모드"로 전환
  useEffect(() => {
    if (!form) return;
    const noName = !form.name || form.name.trim() === "";
    const noEmail = !form.email || form.email.trim() === "";
    const noPhone = !form.phoneNumber || form.phoneNumber.trim() === "";

    // 이름/이메일/전화번호가 모두 비어 있는데 id만 남아 있다면 → id 제거
    if (noName && noEmail && noPhone && form.id) {
      onChange((prev) => ({ ...prev, id: undefined }));
    }
  }, [form?.name, form?.email, form?.phoneNumber, form?.id, onChange]);

  const setField = (k, v) => onChange((prev) => ({ ...prev, [k]: v }));

  // 전화번호에서 010 제거 후 뒤 8자리 + "!"
  const generatePasswordFromPhone = (rawPhone) => {
    if (!rawPhone) return "";
    const digits = String(rawPhone).replace(/\D/g, "");
    const without010 = digits.startsWith("010") ? digits.slice(3) : digits;
    const last8 = without010.slice(-8);
    if (last8.length !== 8) return "";
    return `${last8}!`;
  };

  const handlePasswordReset = () => {
    const pw = generatePasswordFromPhone(form.phoneNumber);
    if (!pw) {
      alert("전화번호에서 비밀번호를 생성할 수 없습니다. (예: 010-1234-5678)");
      return;
    }
    setField("password", pw);
  };

  // 🔹 추가: 등록/수정 버튼 액션
  const handleSubmit = () => {
    // actionType은 선택해도 되고 안해도 됨(null 허용)
    const payload = { ...form, actionType }; // 예: 'RELEASE' | 'SUSPEND' | null
    onSubmit?.(payload);
  };

  //🔹 신규/기존에 따라 유효성 분기
  const isExistingMember = !!form?.id; // 검색으로 선택한 기존 회원이면 true

  const baseValid = !!form?.name && !!form?.email && !!form?.phoneNumber;

  // 신규 관리자: name/email/phone/password 전부 필요
  // 기존 회원 승급: name/email/phone만 있으면 OK (password 선택)
  const isFormValid = isExistingMember
    ? baseValid
    : baseValid && !!form?.password;

  const autoFormatPhone = (value) => {
    // 모든 숫자만 추출 (국가번호 포함)
    let digits = value.replace(/\D/g, "");

    // +82 처리 → 0으로 변환
    if (digits.startsWith("82")) {
      digits = "0" + digits.slice(2);
    }

    // 이제 국내 번호 규칙으로 포맷한 뒤 반환

    // 010-0000-0000
    if (digits.startsWith("010")) {
      if (digits.length <= 3) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(
        7,
        11
      )}`;
    }

    // 011, 016, 017, 018, 019 등의 패턴
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  return (
    <Box>
      {/* 1번째 줄: 드림인 검색 버튼 */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => setOpenPicker(true)}
        >
          검색으로 선택
        </Button>
        <Typography variant="body2" color="text.secondary">
          선택 시 비밀번호를 제외한 항목이 자동으로 채워집니다.
        </Typography>
      </Stack>

      {/* 입력 요소들 */}
      <Grid container spacing={1.5} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            size="small"
            label="이름"
            fullWidth
            value={form.name ?? ""}
            onChange={(e) => setField("name", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <TextField
            size="small"
            label="이메일(ID)"
            fullWidth
            value={form.email ?? ""}
            onChange={(e) => setField("email", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            label="전화번호"
            placeholder="예) 010-1234-5678"
            fullWidth
            value={form.phoneNumber ?? ""}
            onChange={(e) => {
              const formatted = autoFormatPhone(e.target.value);
              setField("phoneNumber", formatted);
            }}
          />
        </Grid>

        {/* type="password" -> 테스트 이후 넣기 */}
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            size="small"
            label="비밀번호"
            fullWidth
            value={form.password ?? ""}
            onChange={(e) => setField("password", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2} alignSelf="center">
          <Tooltip title='전화번호에서 "010" 제외 뒤 8자리 + "!" 로 자동 생성'>
            <span>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={handlePasswordReset}
                disabled={!form.phoneNumber}
              >
                비밀번호 리셋
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>

      {/* 🔹 2번째 줄: 해제/정지(라디오처럼 단일선택, 클릭 시 해제 가능) + 등록/수정하기 버튼 */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={3}
        sx={{ mt: 2 }}
      >
        <ToggleButtonGroup
          exclusive
          value={actionType}
          // 같은 값을 또 클릭하면 해제(null)되도록 처리
          onChange={(_, next) =>
            setActionType((prev) => (prev === next ? null : next))
          }
        >
          <ToggleButton value="RELEASE">해제</ToggleButton>
          <ToggleButton value="SUSPEND">정지</ToggleButton>
        </ToggleButtonGroup>

        <Box flex={0.95} />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          등록/수정하기
        </Button>
      </Stack>

      {/* 드림인 선택 다이얼로그 */}
      <MemberPickerDialog
        open={openPicker}
        onClose={() => setOpenPicker(false)}
        onPick={(row) => {
          onChange((prev) => ({
            ...prev,
            id: row?.id ?? prev.id,
            name: row?.name ?? prev.name,
            email: row?.email ?? prev.email,
            phoneNumber: autoFormatPhone(
              row?.phoneNumber ?? prev.phoneNumber ?? ""
            ),
          }));
          setOpenPicker(false);
        }}
      />
    </Box>
  );
}

/* =========================
   드림인 검색 다이얼로그
   ========================= */
function MemberPickerDialog({ open, onClose, onPick }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setRows([]);
  }, [open]);

  const search = async () => {
    setLoading(true);
    try {
      const result = await searchMembers(q, {
        page: 0,
        size: 20,
        onlyActive: true,
      });
      setRows(result);
    } catch (e) {
      console.error(e);
      alert("회원 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>회원 검색</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          <TextField
            autoFocus
            size="small"
            fullWidth
            placeholder="이름/이메일/전화로 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <Button onClick={search} variant="contained" disabled={loading}>
            검색
          </Button>
        </Stack>

        {loading ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <List dense>
            {rows.map((r) => (
              <ListItemButton key={r.id} onClick={() => onPick?.(r)}>
                <ListItemText
                  primary={`${r.name ?? "-"}  ·  ${r.email ?? "-"}`}
                  secondary={r.phoneNumber ?? ""}
                />
              </ListItemButton>
            ))}
            {!rows.length && (
              <Typography sx={{ py: 2 }} color="text.secondary">
                검색 결과가 없습니다.
              </Typography>
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
