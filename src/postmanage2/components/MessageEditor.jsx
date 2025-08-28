import { Box, Typography, TextField, Button, Stack, Paper } from "@mui/material";
import { useState } from "react";

// 관리자 기본 메시지 (나중에 API로 불러올 수 있음)
const defaultMessages = [
  "지금 당신은 혼자가 아니에요. 우리는 함께 이겨낼 수 있어요.",
  "당신의 이야기를 듣고 싶어요. 말해줘서 고마워요.",
  "세상이 끝난 것처럼 느껴져도, 반드시 길은 있어요.",
  "이 순간도 결국 지나갈 거예요. 버티는 당신이 대단해요."
];

const MessageEditor = ({ message, setMessage }) => {
  const handleSelectDefault = (msg) => {
    setMessage(msg);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography fontWeight="bold" mb={1}>메시지 입력</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="전하고 싶은 메시지를 입력해 주세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Typography mt={2} mb={1} fontWeight="bold">기본 메시지 선택</Typography>
      <Paper sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
        <Stack spacing={1}>
          {defaultMessages.map((msg, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              sx={{ justifyContent: "flex-start", whiteSpace: "normal" }}
              onClick={() => handleSelectDefault(msg)}
            >
              {msg}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default MessageEditor;
