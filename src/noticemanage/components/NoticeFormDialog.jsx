import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Typography, Box, MenuItem, Select,
  CircularProgress, Chip, OutlinedInput, Checkbox, ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useNoticeMutations, useNoticeDetail, useFileUpload,
  AUDIENCE_LABEL, HAPPYIN_TYPE_LABEL,
} from "../hooks/useNotices";

// 계약 포맷(유저BE 발송 스케줄러가 필터하는 값)
const RELIGION_OPTS = [
  { v: "CHRISTIAN", l: "기독교" }, { v: "BUDDHIST", l: "불교" },
  { v: "CATHOLIC", l: "천주교" }, { v: "NONE", l: "무교" },
];
const HAPPYIN_FIELD_OPTS = [
  { v: "OPINION", l: "오피니언" }, { v: "GENERAL", l: "일반" }, { v: "PEER", l: "또래" },
];
const AGE_TYPE_OPTS = [
  { v: "", l: "나이 무관" }, { v: "MAN", l: "만 나이" }, { v: "YEON", l: "연 나이" },
];

/** 공지 작성/수정 다이얼로그 (발송 대상 세부 타겟팅 + 첨부파일). */
const NoticeFormDialog = ({ open, onClose, editId, onSaved }) => {
  const isEdit = Boolean(editId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("ALL");
  const [happyinType, setHappyinType] = useState("ALL");
  const [religions, setReligions] = useState([]);     // 멀티 (RELIGION)
  const [happyinFields, setHappyinFields] = useState([]); // 멀티 (HAPPYIN_FIELD)
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [ageType, setAgeType] = useState("");
  const [region, setRegion] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [newMedia, setNewMedia] = useState([]);
  const [existingMedia, setExistingMedia] = useState([]);

  const { createNotice, updateNotice, deleteNotice, saving } = useNoticeMutations();
  const { fetchDetail, loading } = useNoticeDetail();
  const { uploadFile, uploading } = useFileUpload();

  const resetAll = () => {
    setTitle(""); setContent(""); setAudience("ALL"); setHappyinType("ALL");
    setReligions([]); setHappyinFields([]); setAgeMin(""); setAgeMax(""); setAgeType("");
    setRegion(""); setSchoolName(""); setScheduledAt(""); setNewMedia([]); setExistingMedia([]);
  };

  useEffect(() => {
    if (!open) return;
    resetAll();
    if (isEdit) {
      fetchDetail(editId).then((d) => {
        if (!d) return;
        setTitle(d.title ?? "");
        setContent(d.content ?? "");
        setAudience(d.audience ?? "ALL");
        setHappyinType(d.happyinType ?? "ALL");
        setAgeMin(d.ageMin != null ? String(d.ageMin) : "");
        setAgeMax(d.ageMax != null ? String(d.ageMax) : "");
        setAgeType(d.ageType ?? "");
        setRegion(d.region ?? "");
        setSchoolName(d.schoolName ?? "");
        setReligions((d.targets ?? []).filter((t) => t.targetType === "RELIGION").map((t) => t.targetValue));
        setHappyinFields((d.targets ?? []).filter((t) => t.targetType === "HAPPYIN_FIELD").map((t) => t.targetValue));
        setScheduledAt(d.scheduledAt ? String(d.scheduledAt).slice(0, 16) : "");
        setExistingMedia(d.mediaFiles ?? []);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editId]);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) {
      try {
        const meta = await uploadFile(f);
        if (meta?.storageUrl) setNewMedia((prev) => [...prev, meta]);
      } catch { alert(`업로드 실패: ${f.name}`); }
    }
    e.target.value = "";
  };

  const buildBody = () => ({
    title: title.trim(),
    content: content.trim(),
    audience,
    happyinType: audience === "HAPPYIN" ? happyinType : null,
    ageMin: ageMin === "" ? null : Number(ageMin),
    ageMax: ageMax === "" ? null : Number(ageMax),
    ageType: ageType || null,
    region: region.trim() || null,
    schoolName: schoolName.trim() || null,
    scheduledAt: scheduledAt || null,
    targets: [
      ...religions.map((v) => ({ targetType: "RELIGION", targetValue: v })),
      ...happyinFields.map((v) => ({ targetType: "HAPPYIN_FIELD", targetValue: v })),
    ],
    mediaFiles: newMedia.map((m, i) => ({
      originalFilename: m.originalFilename,
      mediaType: m.mediaType,
      storageUrl: m.storageUrl,
      size: m.size ?? 0,
      sortOrder: i,
    })),
  });

  const handleSave = async () => {
    if (!title.trim()) return alert("제목을 입력하세요.");
    if (!content.trim()) return alert("내용을 입력하세요.");
    try {
      if (isEdit) await updateNotice(editId, buildBody());
      else await createNotice(buildBody());
      alert(isEdit ? "수정되었습니다." : "작성되었습니다.");
      onSaved?.(); onClose?.();
    } catch (e) {
      alert(e?.response?.data?.message || "저장에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("이 공지를 삭제하시겠습니까?")) return;
    try { await deleteNotice(editId); alert("삭제되었습니다."); onSaved?.(); onClose?.(); }
    catch { alert("삭제에 실패했습니다."); }
  };

  const renderMulti = (selected, opts) =>
    selected.map((v) => opts.find((o) => o.v === v)?.l ?? v).join(", ");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>공지사항 {isEdit ? "수정" : "작성"}{loading && " (불러오는 중…)"}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="제목" size="small" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="내용" size="small" multiline rows={5} value={content} onChange={(e) => setContent(e.target.value)} fullWidth />

          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}>발송 대상</Typography>
            <Stack spacing={1.5}>
              {/* 대상 + 해피인 분류 */}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                <Select size="small" value={audience} onChange={(e) => setAudience(e.target.value)} sx={{ minWidth: 110 }}>
                  {Object.entries(AUDIENCE_LABEL).map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
                </Select>
                {audience === "HAPPYIN" && (
                  <Select size="small" value={happyinType} onChange={(e) => setHappyinType(e.target.value)} sx={{ minWidth: 130 }}>
                    {Object.entries(HAPPYIN_TYPE_LABEL).map(([v, l]) => <MenuItem key={v} value={v}>해피인·{l}</MenuItem>)}
                  </Select>
                )}
              </Stack>

              {/* 나이 */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ fontSize: 12, minWidth: 36 }}>나이</Typography>
                <TextField size="small" type="number" placeholder="최소" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} sx={{ width: 90 }} />
                <Typography sx={{ fontSize: 12 }}>~</Typography>
                <TextField size="small" type="number" placeholder="최대" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} sx={{ width: 90 }} />
                <Select size="small" value={ageType} onChange={(e) => setAgeType(e.target.value)} sx={{ minWidth: 110 }} displayEmpty>
                  {AGE_TYPE_OPTS.map((o) => <MenuItem key={o.v} value={o.v}>{o.l}</MenuItem>)}
                </Select>
              </Stack>

              {/* 지역 + 학교 */}
              <Stack direction="row" spacing={1}>
                <TextField size="small" label="지역(시/도, 예: 서울)" value={region} onChange={(e) => setRegion(e.target.value)} sx={{ flex: 1 }} />
                <TextField size="small" label="학교(정확히 일치)" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} sx={{ flex: 1 }} />
              </Stack>

              {/* 종교(멀티) + 해피인 분야(멀티) */}
              <Stack direction="row" spacing={1}>
                <Select
                  multiple size="small" displayEmpty value={religions}
                  onChange={(e) => setReligions(e.target.value)}
                  input={<OutlinedInput />}
                  renderValue={(sel) => sel.length ? renderMulti(sel, RELIGION_OPTS) : "종교(전체)"}
                  sx={{ flex: 1 }}
                >
                  {RELIGION_OPTS.map((o) => (
                    <MenuItem key={o.v} value={o.v}>
                      <Checkbox checked={religions.indexOf(o.v) > -1} size="small" />
                      <ListItemText primary={o.l} />
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  multiple size="small" displayEmpty value={happyinFields}
                  onChange={(e) => setHappyinFields(e.target.value)}
                  input={<OutlinedInput />}
                  renderValue={(sel) => sel.length ? renderMulti(sel, HAPPYIN_FIELD_OPTS) : "해피인 분야(전체)"}
                  sx={{ flex: 1 }}
                >
                  {HAPPYIN_FIELD_OPTS.map((o) => (
                    <MenuItem key={o.v} value={o.v}>
                      <Checkbox checked={happyinFields.indexOf(o.v) > -1} size="small" />
                      <ListItemText primary={o.l} />
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Stack>
          </Box>

          <TextField
            label="예약 발송(선택)" type="datetime-local" size="small"
            value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)}
            InputLabelProps={{ shrink: true }} sx={{ maxWidth: 260 }}
          />

          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>첨부파일</Typography>
            {existingMedia.map((m) => (
              <Chip key={m.id} label={`${m.originalFilename} (기존)`} size="small" clickable
                onClick={() => m.storageUrl && window.open(m.storageUrl, "_blank", "noopener")}
                sx={{ mr: 0.5, mb: 0.5 }} />
            ))}
            {newMedia.map((m, i) => (
              <Chip key={`n${i}`} label={m.originalFilename} size="small" color="primary"
                onDelete={() => setNewMedia((prev) => prev.filter((_, idx) => idx !== i))}
                sx={{ mr: 0.5, mb: 0.5 }} />
            ))}
            <Box sx={{ mt: 0.5 }}>
              <Button variant="outlined" component="label" size="small" disabled={uploading}>
                {uploading ? "업로드 중..." : "파일 추가"}
                <input hidden type="file" multiple onChange={handleFiles} />
              </Button>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        {isEdit && <Button color="error" onClick={handleDelete} disabled={saving}>삭제</Button>}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose}>닫기</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving || uploading}>
          {saving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : isEdit ? "수정" : "작성"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoticeFormDialog;
