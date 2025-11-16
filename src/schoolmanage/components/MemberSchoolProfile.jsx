import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Divider,
  Paper,
  Button,
  IconButton,
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  useSchoolDetail,
  searchMembers,
  registerSchoolTeachers,
} from "../hooks/useSchool";

/* ------- 회원 검색 팝오버 (복수 선택) ------- */
function TeacherSearchPopover({ open, anchorEl, onClose, onPickMany }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState(new Set());
  const [role, setRole] = useState(""); // 🔹 선택 역할 (옵션)

  // 회원 검색 api 연결
  const runSearch = async () => {
    setLoading(true);
    try {
      const list = await searchMembers({
        q: keyword,
        page: 0,
        size: 20,
        onlyActive: true,
        role: role || undefined,
      });
      setResults(list);
      setChecked(new Set());
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e) => e.key === "Enter" && runSearch();

  const toggle = (id) =>
    setChecked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const apply = () => {
    const picked = results.filter((r) => checked.has(r.id));
    onPickMany?.(picked);
    onClose?.();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ sx: { width: 560, p: 1.5 } }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        {/* 역할 선택 (전체 / DREAMIN / BASIC_HAPPYIN ... ) */}
        <Select
          size="small"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">역할 전체</MenuItem>
          <MenuItem value="DREAMIN">드림인</MenuItem>
          <MenuItem value="BASIC_HAPPYIN">해피인</MenuItem>
          <MenuItem value="STAR_HAPPYIN">스타 해피인</MenuItem>
          <MenuItem value="GROUP_HAPPYIN">그룹 해피인</MenuItem>
          <MenuItem value="TEEN_HAPPYIN">또래 해피인</MenuItem>
        </Select>

        <TextField
          size="small"
          placeholder="닉네임/이름/전화로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={onEnter}
          fullWidth
        />
        <Button variant="contained" onClick={runSearch} disabled={loading}>
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
          {results.map((u) => (
            <ListItemButton key={u.id} onClick={() => toggle(u.id)}>
              <Checkbox
                edge="start"
                checked={checked.has(u.id)}
                tabIndex={-1}
              />
              <ListItemText
                primary={`${u.nickname ?? ""} (${u.name ?? "-"})`}
                secondaryTypographyProps={{ component: "span" }}
                secondary={<span>전화: {u.phoneNumber || "-"}</span>}
              />
            </ListItemButton>
          ))}
        </List>
      )}

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mt: 1 }}
      >
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" onClick={apply}>
          추가
        </Button>
      </Stack>
    </Popover>
  );
}

/* ------- 메인 페이지 ------- */
const MemberSchoolProfile = () => {
  const { id } = useParams();

  const { form, setForm, teachers, setTeachers, loading, error, refetch } =
    useSchoolDetail(id);

  // 🔍 팝오버 제어
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBtnRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...(prev ?? {}), [name]: value }));
  };

  // ✅ 선생 해제 (UI에서만 제거)
  const handleRemoveTeacher = (teacherId) => {
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
    // 실제 API 붙일 때는 여기서 해제 API 호출 + 성공 시 setTeachers 갱신
  };
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // ✅ 팝오버에서 선택된 선생님들 추가
  const handleAddTeachers = (picked) => {
    setTeachers((prev) => {
      const map = new Map(prev.map((p) => [p.id, p]));
      picked.forEach((p) => map.set(p.id, p)); // id 기준 중복 제거
      return Array.from(map.values());
    });
  };

  if (loading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;
  if (error)
    return (
      <Box sx={{ p: 3, color: "error.main" }}>불러오기에 실패했습니다.</Box>
    );

  const handleSave = async () => {
    if (!id) return;

    setSaving(true);
    setSaveError(null);

    try {
      // 선택된 선생님 userId 배열
      const userIds = Array.isArray(teachers) ? teachers.map((t) => t.id) : [];

      // 아무도 선택 안 했으면 그냥 리턴(선택사항)
      // if (userIds.length === 0) {
      //   alert("등록할 선생님을 선택해 주세요.");
      //   return;
      // }

      // 🔹 새 API 호출
      await registerSchoolTeachers(id, userIds);

      // 저장 후 다시 상세 조회해서 화면 동기화
      await refetch();

      alert("회원학교 선생님 목록이 저장되었습니다.");
    } catch (e) {
      console.error(e);
      setSaveError(e);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* 상단 기본 정보 */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        회원학교 정보
      </Typography>
      <Stack spacing={3}>
        {/* 1행 */}
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
          <TextField
            name="schoolName"
            label="학교명"
            value={form.name}
            onChange={handleChange}
            size="small"
            margin="dense"
            sx={{ flex: 1, minWidth: 100 }}
          />
          <TextField
            name="schoolType"
            label="분류"
            value={form.schoolType}
            onChange={handleChange}
            size="small"
            margin="dense"
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            name="phoneNumber"
            label="전화번호"
            value={form.phoneNumber}
            onChange={handleChange}
            size="small"
            margin="dense"
            sx={{ flex: 1, minWidth: 200 }}
          />
        </Stack>

        {/* 2행 */}
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
          <TextField
            name="province"
            label="지역"
            value={form.province}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="dense"
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            name="address"
            label="주소"
            value={form.address}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="dense"
            sx={{ flex: 2, minWidth: 200 }}
          />
          <TextField
            name="memberCount"
            label="회원수"
            value={form.memberCount}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="dense"
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            name="pinNumber"
            label="핀번호"
            value={form.pinNumber}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="dense"
            sx={{ flex: 1, minWidth: 200 }}
          />
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* 🔽 회원 학교 선생 목록 + 검색 버튼 */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography variant="h6">회원학교 선생 목록</Typography>
        <Button
          ref={searchBtnRef}
          variant="outlined"
          size="small"
          onClick={() => setSearchOpen(true)}
        >
          회원 검색
        </Button>
      </Stack>

      <Box
        sx={{
          maxHeight: 260,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: 3,
          },
        }}
      >
        {teachers.length === 0 ? (
          <Box sx={{ py: 2, color: "text.secondary" }}>
            현재 등록된 선생님이 없습니다.
          </Box>
        ) : (
          <Stack spacing={1}>
            {teachers.map((t) => (
              <Stack
                key={t.id}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  py: 1,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box sx={{ minWidth: 100 }}>{t.nickname}</Box>
                <Box sx={{ minWidth: 80 }}>{t.name}</Box>
                <Box sx={{ minWidth: 140 }}>{t.phoneNumber}</Box>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveTeacher(t.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {saveError && (
        <Box sx={{ mb: 2, color: "error.main", fontSize: 14 }}>
          저장 중 오류가 발생했습니다.
        </Box>
      )}

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "저장 중..." : "선생 등록"}
        </Button>
      </Stack>

      <TeacherSearchPopover
        open={searchOpen}
        anchorEl={searchBtnRef.current}
        onClose={() => setSearchOpen(false)}
        onPickMany={handleAddTeachers}
      />
    </Paper>
  );
};

export default MemberSchoolProfile;
