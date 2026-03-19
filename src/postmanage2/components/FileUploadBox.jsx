import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axiosInstance from "../../utils/axiosInstance";

const FileUploadBox = ({
  audioFile,
  setAudioFile,
  setThumbnail,
  // ✅ 새로 추가: 업로드 결과(메타)를 부모에게 전달
  onAudioUploaded,
  onThumbnailUploaded,
}) => {
  const [audioUploading, setAudioUploading] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [audioError, setAudioError] = useState("");

  // ✅ 파일을 서버에 업로드하고 storageUrl 등 메타를 받아오는 함수
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post("/admin/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data; // { storageUrl, originalFilename, mediaType, size }
  };

  // ✅ 음성 파일 선택 → 즉시 업로드
  const handleAudioChange = async (e) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";

    if (!file) return;

    setAudioFile(file);
    setAudioUploaded(false);
    setAudioError("");
    setAudioUploading(true);

    try {
      const meta = await uploadFile(file);
      // 부모 컴포넌트에 업로드 결과 전달
      onAudioUploaded?.({
        storageUrl: meta.storageUrl,
        originalFilename: meta.originalFilename,
        mediaType: meta.mediaType,
        size: meta.size,
        durationMillis: 0, // TODO: 프론트에서 audio duration 추출 가능
        thumbnailUrl: null,
      });
      setAudioUploaded(true);
    } catch (err) {
      setAudioError(
        err?.response?.data?.error ?? err?.message ?? "업로드 실패",
      );
      onAudioUploaded?.(null);
    } finally {
      setAudioUploading(false);
    }
  };

  // ✅ 썸네일 선택 → 즉시 업로드
  const handleThumbnailChange = async (e) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";

    if (!file) return;

    setThumbnail(file);
    setThumbUploaded(false);
    setThumbError("");
    setThumbUploading(true);

    try {
      const meta = await uploadFile(file);
      onThumbnailUploaded?.({
        storageUrl: meta.storageUrl,
        originalFilename: meta.originalFilename,
        mediaType: meta.mediaType,
        size: meta.size,
        durationMillis: 0,
        thumbnailUrl: meta.storageUrl,
      });
      setThumbUploaded(true);
    } catch (err) {
      setThumbError(
        err?.response?.data?.error ?? err?.message ?? "업로드 실패",
      );
      onThumbnailUploaded?.(null);
    } finally {
      setThumbUploading(false);
    }
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography fontWeight="bold" mb={1}>
        파일 업로드
      </Typography>

      {/* 오디오 업로드 */}
      <Stack spacing={1} mb={2}>
        <Typography>🎧 음성 파일</Typography>
        <Button variant="outlined" component="label" disabled={audioUploading}>
          {audioUploading ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1 }} />
              업로드 중...
            </>
          ) : (
            "파일 선택 (MP3/M4A)"
          )}
          <input
            hidden
            accept="audio/*"
            type="file"
            onChange={handleAudioChange}
          />
        </Button>

        {audioFile && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontSize={14}>
              {audioFile.name} / {(audioFile.size / 1024).toFixed(1)} KB
            </Typography>
            {audioUploaded && (
              <CheckCircleOutlineIcon color="success" fontSize="small" />
            )}
          </Stack>
        )}

        {audioError && (
          <Alert severity="error" sx={{ fontSize: 12, py: 0 }}>
            {audioError}
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default FileUploadBox;
