// components/MessageInputForm.jsx
import {
  Stack, TextField, Typography, IconButton, Button, Chip, Box,
  Tooltip, Divider, List, ListItem, ListItemText
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function MessageInputForm({ value, onChange }) {
  const { title, body, files, links, audioBlobs } = value;

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    onChange({ ...value, files: [...files, ...picked] });
  };

  const handleAddLink = () => {
    const url = prompt("링크 URL을 입력하세요");
    if (url) onChange({ ...value, links: [...links, url] });
  };

  // 녹음은 실제 구현 시 MediaRecorder 사용. 여기선 더미 로직.
  const startRecording = () => alert("녹음 시작(실구현: MediaRecorder)");
  const stopRecording = () => {
    alert("녹음 종료(실구현 후 blob 저장)");
    // onChange({ ...value, audioBlobs: [...audioBlobs, newBlob] });
  };

  const removeFile = (idx) =>
    onChange({ ...value, files: files.filter((_, i) => i !== idx) });

  const removeLink = (idx) =>
    onChange({ ...value, links: links.filter((_, i) => i !== idx) });

  return (
    <Stack spacing={2}>
      {/* 필요없으면 title 제거 */}
      {/* <TextField label="제목" value={title} onChange={(e)=>onChange({...value, title:e.target.value})}/> */}

      <TextField
        label="메시지 내용"
        multiline
        minRows={6}
        value={body}
        onChange={(e) => onChange({ ...value, body: e.target.value })}
        placeholder="여기에 메시지를 넣어 주세요"
        fullWidth
      />

      <Stack direction="row" spacing={1} alignItems="center">
        <input
          id="msg-file-input"
          type="file"
          multiple
          hidden
          onChange={handleFiles}
          accept="image/*,audio/*,video/*"
        />
        <label htmlFor="msg-file-input">
          <Button startIcon={<AttachFileIcon />} component="span" variant="outlined">
            첨부파일
          </Button>
        </label>

        <Button startIcon={<LinkIcon />} variant="outlined" onClick={handleAddLink}>
          링크
        </Button>

        <Tooltip title="녹음하기(데모)">
          <IconButton onClick={startRecording}><MicIcon /></IconButton>
        </Tooltip>
        <Tooltip title="정지(데모)">
          <IconButton onClick={stopRecording}><StopIcon /></IconButton>
        </Tooltip>
      </Stack>

      {(files.length > 0 || links.length > 0) && <Divider />}

      {files.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>첨부</Typography>
          <List dense>
            {files.map((f, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeFile(i)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={f.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {links.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>링크</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {links.map((url, i) => (
              <Chip
                key={i}
                label={url}
                onDelete={() => removeLink(i)}
                component="a"
                target="_blank"
                href={url}
                clickable
                sx={{ maxWidth: 360 }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
