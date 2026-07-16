import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";

import SearchHappyUserBox from "../components/SearchHappyUserBox";
import FileUploadBox from "../components/FileUploadBox";
import {
  useCelebrationCreate,
  TYPE_TO_LABEL,
} from "../hooks/useCelebrationMessages";

/**
 * 축하/시험격려 메시지 등록 폼 (희망메시지 입력 폼 스타일).
 * POST /api/admin/celebration-messages
 *   body: { type, happyinUserId, title, content, mediaFiles? }
 */
const CongratulatoryMessageInputForm = ({ onSuccess }) => {
  const [selectedHappyin, setSelectedHappyin] = useState(null);
  const [type, setType] = useState("SIGNUP");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [audioMeta, setAudioMeta] = useState(null);
  const [thumbMeta, setThumbMeta] = useState(null);

  const { createCelebration, creating } = useCelebrationCreate();

  const reset = () => {
    setSelectedHappyin(null);
    setType("SIGNUP");
    setTitle("");
    setContent("");
    setAudioFile(null);
    setThumbnailFile(null);
    setAudioMeta(null);
    setThumbMeta(null);
  };

  const buildMediaFiles = () => {
    const mediaFiles = [];
    let order = 0;
    if (audioMeta?.storageUrl) {
      mediaFiles.push({
        originalFilename: audioMeta.originalFilename ?? audioFile?.name ?? "audio",
        mediaType: audioMeta.mediaType ?? "audio/mp4",
        storageUrl: audioMeta.storageUrl,
        size: audioMeta.size ?? 0,
        durationMillis: audioMeta.durationMillis ?? 0,
        thumbnailUrl: null,
        sortOrder: order++,
      });
    }
    if (thumbMeta?.storageUrl) {
      mediaFiles.push({
        originalFilename: thumbMeta.originalFilename ?? thumbnailFile?.name ?? "thumbnail",
        mediaType: thumbMeta.mediaType ?? "image/jpeg",
        storageUrl: thumbMeta.storageUrl,
        size: thumbMeta.size ?? 0,
        durationMillis: 0,
        thumbnailUrl: thumbMeta.storageUrl,
        sortOrder: order++,
      });
    }
    return mediaFiles;
  };

  const handleSubmit = async () => {
    if (!selectedHappyin?.userId) return alert("작성자(스타 해피인)를 선택하세요.");
    if (!title.trim()) return alert("제목을 입력하세요.");
    if (!content.trim()) return alert("내용을 입력하세요.");
    if (audioFile && !audioMeta?.storageUrl)
      return alert("음성 파일 업로드가 끝난 뒤 등록하세요.");

    try {
      await createCelebration({
        type,
        happyinUserId: selectedHappyin.userId,
        title: title.trim(),
        content: content.trim(),
        mediaFiles: buildMediaFiles(),
      });
      alert("등록되었습니다.");
      reset();
      onSuccess?.();
    } catch (e) {
      alert(e?.response?.data?.message || "등록에 실패했습니다.");
    }
  };

  return (
    <Box component="form" sx={{ px: 3, py: 2 }}>
      {/* 안내문구 */}
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f9f9f9", my: 2 }}>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
          축하/시험격려 메시지를 등록하는 곳입니다.
          {"\n"}작성자(스타 해피인)를 지정하고, 유형(가입환영/생일축하/시험격려 등)에 맞춰 메시지를 입력해 주세요.
          {"\n"}등록한 메시지는 해당 유형의 상황에서 회원들에게 전달됩니다.
        </Typography>
      </Paper>

      {/* 작성자(스타 해피인) */}
      <Typography fontWeight="bold" sx={{ mb: 0.5 }}>작성자(스타 해피인)</Typography>
      <SearchHappyUserBox
        onSelect={setSelectedHappyin}
        selected={selectedHappyin}
        searchEndpoint="/admin/messages/hope/happyin-search"
      />

      {/* 유형 */}
      <Box sx={{ mt: 3 }}>
        <Typography fontWeight="bold" sx={{ mb: 0.5 }}>유형</Typography>
        <Select
          size="small"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {Object.entries(TYPE_TO_LABEL).map(([enumVal, label]) => (
            <MenuItem key={enumVal} value={enumVal}>{label}</MenuItem>
          ))}
        </Select>
      </Box>

      {/* 제목 */}
      <Box sx={{ mt: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography fontWeight="bold">제목 입력</Typography>
          <Typography variant="caption" color="text.secondary">{title.length}/40</Typography>
        </Stack>
        <TextField
          fullWidth
          size="small"
          placeholder="메시지 제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 40 }}
        />
      </Box>

      {/* 내용 */}
      <Box sx={{ mt: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography fontWeight="bold">메시지 입력</Typography>
          <Typography variant="caption" color="text.secondary">{content.length}/500</Typography>
        </Stack>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="전하고 싶은 메시지를 입력해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          inputProps={{ maxLength: 500 }}
        />
      </Box>

      {/* 첨부파일 */}
      <Box sx={{ mt: 3 }}>
        <Typography fontWeight="bold" sx={{ mb: 1 }}>첨부파일 (선택)</Typography>
        <FileUploadBox
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          thumbnail={thumbnailFile}
          setThumbnail={setThumbnailFile}
          onAudioUploaded={setAudioMeta}
          onThumbnailUploaded={setThumbMeta}
        />
        {audioFile && !audioMeta?.storageUrl && (
          <Alert severity="info" sx={{ mt: 1, fontSize: 12 }}>
            음성 파일 업로드 중... 완료 후 등록하세요.
          </Alert>
        )}
      </Box>

      {/* 등록 */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={creating}
          sx={{ minWidth: 120 }}
        >
          {creating ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "등록"}
        </Button>
      </Stack>
    </Box>
  );
};

export default CongratulatoryMessageInputForm;
