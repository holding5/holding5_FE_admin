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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import { searchDreamins } from "../hooks/useAdmin"; // ⬅️ 훅에서 API 사용

/**
 * props
 *  - form: { id, name, email, phoneNumber, password }
 *  - onChange: (updater) => void  // setState(updater) 형태 권장
 */
export default function AdminInputForm({ form, onChange }) {
  const [openPicker, setOpenPicker] = useState(false);

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

  return (
    <Box>
      {/* 최상단: 드림인 검색하기 */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
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
      <Grid container spacing={1.5}>
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
