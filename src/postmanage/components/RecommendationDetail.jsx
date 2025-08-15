import {
  Popover,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const RecommendationDetail = ({ anchorEl, onClose, row }) => {
  const open = Boolean(anchorEl);

  // ✅ row 변경 시 폼 값 세팅
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (row) {
      setTitle(row.title || "");
      // content는 서버 데이터가 생기면 row.content로 교체
    }
  }, [row]);

  if (!row) {
    // anchor는 있는데 row가 아직 없을 때 깔끔히 처리
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
          <Typography>작성자: {row.writer}</Typography>
          <Typography>등록일: {row.date}</Typography>
          <IconButton size="small"><SkipPreviousIcon /></IconButton>
          <IconButton size="small"><SkipNextIcon /></IconButton>
        </Stack>

        <Box sx={{ my: 2 }}>
          <Typography sx={{ mb: 0.5 }}>내용</Typography>
          <TextField
            fullWidth
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Typography sx={{ mb: 0.5 }}>답변</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setContent(e.target.value)}
          />
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: "#2e3b4e" }}>저장</Button>
          <Button variant="contained" sx={{ backgroundColor: "#d35400" }}>삭제</Button>
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

export default RecommendationDetail;
