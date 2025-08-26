// ────────────────────────────────────────────────────────────────────────────────
// File: src/pages/system/components/FnQEditorInline.jsx
// Description: 인라인 작성 영역 (카테고리 선택 + 질문 입력 + 답변 입력 + 버튼)
// ────────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

const FnQEditorInline = ({ categories, onCreate, onOpenCategory }) => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const reset = () => {
    setCategory("");
    setQuestion("");
    setAnswer("");
  };

  const handleCreate = () => {
    if (!category || !question.trim() || !answer.trim()) return;
    onCreate({ category, question, answer });
    reset();
  };

  return (
    <Box sx={{ mt: 3, p: 2 }}>
      <Stack spacing={2}>
        {/* 카테고리 + 카테고리 관리 버튼 */}
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>카테고리 선택</InputLabel>
            <Select
              value={category}
              label="카테고리 선택"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.filter((c) => c !== "전체").map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            startIcon={<SettingsIcon />}
            variant="outlined"
            onClick={onOpenCategory}
            sx={{ height: 40 }}
          >
            카테고리 관리
          </Button>
        </Stack>

        {/* 질문 입력 */}
        <Stack spacing={0.5}>
          <Typography variant="body2" fontWeight={600}>질문</Typography>
          <TextField
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            size="small"
          />
        </Stack>

        {/* 답변 입력 */}
        <Stack spacing={0.5}>
          <Typography variant="body2" fontWeight={600}>답변</Typography>
          <TextField
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
            multiline
            minRows={6}
          />
        </Stack>

        {/* 생성 버튼 */}
        <Box textAlign="right">
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!category || !question.trim() || !answer.trim()}
            startIcon={<AddIcon />}
          >
            생성
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default FnQEditorInline;