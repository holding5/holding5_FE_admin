import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const MessageInput = ({ value, onChange, defaultMessages, onAddDefaultMessage }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>메시지 내용</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        placeholder="여기에 메시지를 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {defaultMessages.map((msg, idx) => (
          <Button
            key={idx}
            variant="outlined"
            onClick={() => onAddDefaultMessage(msg)}
          >
            안내멘트 {idx + 1}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default MessageInput;
