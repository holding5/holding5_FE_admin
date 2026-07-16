import {
  Popover,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Link,
  Divider,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useSuggestionDetail,
  useSuggestionAnswer,
  useSuggestionDelete,
  TYPE_TO_LABEL,
} from "../hooks/useSuggestions";

/**
 * 건의 상세 팝오버 — 본문/연락처/첨부 조회 + 답변 등록 + 삭제.
 */
const SuggestionDetail = ({ anchorEl, onClose, row, onChanged }) => {
  const open = Boolean(anchorEl);

  const [detail, setDetail] = useState(null);
  const [answer, setAnswer] = useState("");

  const { fetchDetail, loading } = useSuggestionDetail();
  const { submitAnswer, saving } = useSuggestionAnswer();
  const { removeSuggestion, deleting } = useSuggestionDelete();

  useEffect(() => {
    if (!row) return;
    setDetail(null);
    setAnswer("");
    fetchDetail(row.id)
      .then((d) => {
        setDetail(d);
        setAnswer(d?.answer ?? "");
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const handleAnswer = async () => {
    if (!answer.trim()) return alert("답변 내용을 입력하세요.");
    try {
      await submitAnswer(row.id, answer.trim());
      alert("답변이 등록되었습니다.");
      onChanged?.();
      onClose?.();
    } catch (e) {
      alert(e?.response?.data?.message || "답변 등록에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("이 건의를 삭제하시겠습니까?")) return;
    try {
      await removeSuggestion(row.id);
      alert("삭제되었습니다.");
      onChanged?.();
      onClose?.();
    } catch (e) {
      alert("삭제에 실패했습니다.");
    }
  };

  if (!row) {
    return (
      <Popover open={open} anchorEl={anchorEl} onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box sx={{ p: 2 }}>불러오는 중…</Box>
      </Popover>
    );
  }

  const media = detail?.mediaFiles ?? [];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 2, minWidth: 560, maxWidth: 720 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip size="small" label={TYPE_TO_LABEL[row.type] ?? row.type} color="primary" variant="outlined" />
          <Chip
            size="small"
            label={detail?.handled ?? row.handled ? "처리완료" : "대기"}
            color={detail?.handled ?? row.handled ? "success" : "default"}
          />
          {loading && <CircularProgress size={16} />}
        </Stack>

        <Typography sx={{ fontWeight: 700, mb: 1 }}>{detail?.title ?? row.title}</Typography>

        <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: 13 }}>작성자: <b>{detail?.authorName ?? row.authorName}</b></Typography>
          <Typography sx={{ fontSize: 13 }}>연락처: {detail?.contact ?? row.contact ?? "-"}</Typography>
        </Stack>
        {(detail?.institutionName || row.institutionName !== "-") && (
          <Typography sx={{ fontSize: 13, mb: 1 }}>
            기관명: {detail?.institutionName ?? row.institutionName ?? "-"}
          </Typography>
        )}
        <Typography sx={{ fontSize: 13, mb: 1 }}>등록일시: {row.createdAt}</Typography>

        <Box sx={{ my: 1, p: 1.5, backgroundColor: "#f7f7f7", borderRadius: 1, whiteSpace: "pre-wrap" }}>
          <Typography sx={{ fontSize: 14 }}>{detail?.content ?? "(본문 없음)"}</Typography>
        </Box>

        {/* 첨부파일 */}
        {media.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>첨부파일</Typography>
            {media.map((m) => (
              <Stack key={m.id} direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Typography sx={{ fontSize: 13 }}>{m.originalFilename}</Typography>
                {String(m.mediaType || "").startsWith("audio") ? (
                  <audio controls src={m.storageUrl} style={{ height: 28 }} />
                ) : String(m.mediaType || "").startsWith("image") ? (
                  <img src={m.storageUrl} alt={m.originalFilename} style={{ maxHeight: 60 }} />
                ) : (
                  <Link href={m.storageUrl} target="_blank" rel="noreferrer">열기</Link>
                )}
              </Stack>
            ))}
          </Box>
        )}

        <Divider sx={{ my: 1.5 }} />

        {/* 답변 */}
        <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>답변</Typography>
        {detail?.answeredByName && (
          <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 0.5 }}>
            답변자: {detail.answeredByName}
          </Typography>
        )}
        <TextField
          fullWidth
          multiline
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 입력하세요. 등록 시 처리완료로 표시됩니다."
        />

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleAnswer}
            disabled={saving || deleting}
            sx={{ backgroundColor: "#27ae60" }}
          >
            {saving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "답변 등록"}
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={saving || deleting}
            sx={{ backgroundColor: "#d35400" }}
          >
            {deleting ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "삭제"}
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ backgroundColor: "#666565ff", "&:hover": { backgroundColor: "#888787ff" } }}
          >
            닫기
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};

export default SuggestionDetail;
