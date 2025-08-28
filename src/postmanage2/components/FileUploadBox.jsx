import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useState } from "react";

const FileUploadBox = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography fontWeight="bold" mb={1}>파일 업로드</Typography>

      {/* 오디오 업로드 */}
      <Stack spacing={1} mb={2}>
        <Typography>🎧 음성 파일</Typography>
        <Button variant="outlined" component="label">
          파일 선택 (mp3/m4a)
          <input hidden accept="audio/*" type="file" onChange={handleAudioChange} />
        </Button>
        {audioFile && (
          <Typography fontSize={14}>
            {audioFile.name} / {(audioFile.size / 1024).toFixed(1)} KB
          </Typography>
        )}
      </Stack>

      {/* 썸네일 업로드 */}
      <Stack spacing={1} mb={2}>
        <Typography>🖼 썸네일 이미지</Typography>
        <Button variant="outlined" component="label">
          이미지 선택
          <input hidden accept="image/*" type="file" onChange={handleThumbnailChange} />
        </Button>
        {thumbnail && (
          <Typography fontSize={14}>
            {thumbnail.name} / {(thumbnail.size / 1024).toFixed(1)} KB
          </Typography>
        )}
      </Stack>

      {/* 유튜브 URL */}
      <Stack spacing={1}>
        <Typography>🔗 URL 링크 (선택)</Typography>
        <TextField
          fullWidth
          size="small"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
      </Stack>
    </Box>
  );
};

export default FileUploadBox;
