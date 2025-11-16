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
import { searchDreamins } from "../hooks/useAdmin"; // ⬅️ 훅에서 API 사용

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
            onChange={(e) => setField("phoneNumber", e.target.value)}
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
          disabled={
            !form?.email || !form?.name || !form?.phoneNumber || !form?.password
          }
        >
          등록/수정하기
        </Button>
      </Stack>

      {/* 드림인 선택 다이얼로그 */}
      <DreaminPickerDialog
        open={openPicker}
        onClose={() => setOpenPicker(false)}
        onPick={(row) => {
          onChange((prev) => ({
            ...prev,
            name: row?.name ?? prev.name,
            email: row?.email ?? prev.email,
            phoneNumber: row?.phoneNumber ?? prev.phoneNumber,
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
function DreaminPickerDialog({ open, onClose, onPick }) {
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
      const result = await searchDreamins(q, { page: 0, size: 20 });
      setRows(result);
    } catch (e) {
      console.error(e);
      alert("드림인 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>드림인 검색</DialogTitle>
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
