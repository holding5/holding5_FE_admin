// components/reportedPost/ReportedPostComments.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Button,
  Divider,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import GavelIcon from "@mui/icons-material/Gavel";

const ReportedPostComments = ({ comments = [] }) => {
  const [sortType, setSortType] = useState("latest");

  const handleSortChange = (e, newSort) => {
    if (newSort !== null) setSortType(newSort);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // ✅ 댓글 버튼 핸들러
  const handleCommentInnocent = (nickname) => {
    alert(`댓글 '${nickname}'을(를) 무혐의 처리했습니다.`);
  };

  const handleCommentDelete = (nickname) => {
    if (window.confirm(`댓글 '${nickname}'을(를) 삭제하시겠습니까?`)) {
      alert("삭제 완료되었습니다.");
    }
  };

  return (
    <Box mt={4}>
      {/* 헤더 */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">댓글 {comments.length}개</Typography>
        <ToggleButtonGroup
          value={sortType}
          exclusive
          onChange={handleSortChange}
          size="small"
        >
          <ToggleButton value="latest">최근 순</ToggleButton>
          <ToggleButton value="created">등록 순</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* 댓글 목록 */}
      {sortedComments.map((comment, idx) => (
        <Box key={idx} border="1px solid #ccc" borderRadius={2} p={2} mb={2}>
          {/* 유저 정보 */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar>{comment.nickname[0]}</Avatar>
            <Box>
              <Typography fontWeight="bold">{comment.nickname}</Typography>
              <Typography variant="body2" color="text.secondary">
                ({comment.email})
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" ml="auto">
              {comment.createdAt}
            </Typography>
          </Stack>

          {/* 댓글 내용 */}
          <Typography mt={1} whiteSpace="pre-line">
            {comment.content}
          </Typography>

          {/* 상태 및 버튼 */}
          <Stack direction="row" alignItems="center" spacing={1} mt={2}>
            {comment.reported && (
              <Chip label="신고됨" color="error" size="small" />
            )}
            <IconButton size="small">
              <ThumbUpIcon fontSize="small" />
              <Typography variant="caption" ml={0.5}>
                {comment.likes || 0}
              </Typography>
            </IconButton>
            <IconButton size="small">
              <ReportIcon fontSize="small" />
              <Typography variant="caption" ml={0.5}>
                {comment.reports || 0}
              </Typography>
            </IconButton>

            <Box flexGrow={1} />

            {/* 관리 버튼 */}
            <Button
              variant="outlined"
              color="success"
              size="small"
              startIcon={<GavelIcon />}
              onClick={() => handleCommentInnocent(comment.nickname)}
            >
              무혐의
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => handleCommentDelete(comment.nickname)}
            >
              삭제
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default ReportedPostComments;
