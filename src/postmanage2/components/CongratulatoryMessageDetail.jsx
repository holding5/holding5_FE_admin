import {
  Popover,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCelebrationUpdate,
  useCelebrationDelete,
  useCelebrationDetail,
} from "../hooks/useCelebrationMessages";

/**
 * 축하/시험격려 메시지 상세 팝오버.
 * - 제목/내용 조회 및 수정(PUT), 삭제(DELETE)
 * - 상세 조회(GET /{id})로 첨부파일 로드 후 재생/열기
 */
const CongratulatoryMessageDetail = ({ anchorEl, onClose, row, onChanged }) => {
  const open = Boolean(anchorEl);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);

  const { updateCelebration, updating } = useCelebrationUpdate();
  const { deleteCelebration, deleting } = useCelebrationDelete();
  const { fetchDetail, loading: detailLoading } = useCelebrationDetail();

  useEffect(() => {
    if (!row) return;
    setTitle(row.title || "");
    setContent(row.raw?.content ?? row.content ?? "");
    setMedia([]);
    fetchDetail(row.id)
      .then((d) => setMedia(d?.mediaFiles ?? []))
      .catch(() => setMedia([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const handleUpdate = async () => {
    try {
      await updateCelebration(row.id, { title, content });
      onChanged?.();
      onClose?.();
    } catch (e) {
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("이 축하메시지를 삭제하시겠습니까?")) return;
    try {
      await deleteCelebration(row.id);
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

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 2, minWidth: 650, maxWidth: 800 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography>분류: <b>{row.classification}</b></Typography>
        </Stack>

        {/* 첨부파일 */}
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ mb: 0.5 }}>첨부파일</Typography>
          {detailLoading && <CircularProgress size={16} />}
          {!detailLoading && media.length === 0 && (
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>첨부파일 없음</Typography>
          )}
          {!detailLoading && media.map((m) => (
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

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography>등록일시: {row.date}</Typography>
          <Typography>
            등록자: <span style={{ color: "#1976d2" }}>{row.nickName}</span>
          </Typography>
        </Stack>

        <Box sx={{ my: 2 }}>
          <Typography sx={{ mb: 0.5 }}>제목</Typography>
          <TextField
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Typography sx={{ mb: 0.5 }}>내용</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={updating || deleting}
            sx={{ backgroundColor: "#2e3b4e" }}
          >
            {updating ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "수정"}
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={updating || deleting}
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

export default CongratulatoryMessageDetail;
