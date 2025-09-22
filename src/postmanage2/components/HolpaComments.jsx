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
  Alert,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteHolpaPostComment } from "../hooks/useHolpaPostDetail";
import { labelMapper } from "../../utils/LabelMapper";

const HolpaComments = ({ comments = [] }) => {
  const [sortType, setSortType] = useState("latest");
  const [localComments, setLocalComments] = useState(comments);

  const handleSortChange = (e, newSort) => {
    if (newSort !== null) setSortType(newSort);
  };

  const sortedComments = [...localComments].sort((a, b) => {
    if (sortType === "latest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteHolpaPostComment(commentId);
      alert("댓글이 삭제되었습니다.");
      setLocalComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, activated: false } : c))
      );
    } catch (e) {
      console.error("댓글 삭제 실패:", e);
      alert("댓글 삭제 중 오류가 발생했습니다.");
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
        <Typography variant="h6">댓글 {localComments.length}개</Typography>
        <ToggleButtonGroup
          value={sortType}
          exclusive
          onChange={handleSortChange}
          size="small"
        >
          <ToggleButton value="latest">최신순</ToggleButton>
          <ToggleButton value="created">등록순</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* 댓글 목록 */}
      {sortedComments.map((comment) => {
        const isDeleted = comment.activated === false;

        return (
          <Box
            key={comment.id}
            sx={{
              border: "1px solid",
              borderColor: isDeleted ? "warning.light" : "#ccc",
              borderRadius: 2,
              p: 2,
              mb: 2,
              bgcolor: isDeleted ? "grey.50" : "background.paper",
              opacity: isDeleted ? 0.9 : 1,
            }}
          >
            {/* 🔸 작은 배너만 표시 (내용은 계속 보임) */}
            {isDeleted && (
              <Alert
                severity="warning"
                variant="outlined"
                icon={false}
                sx={{
                  py: 0.5,
                  px: 1,
                  mb: 1,
                  fontSize: 12,
                  fontWeight: 600,
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                관리자가 삭제한 댓글입니다.
              </Alert>
            )}

            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar>{(comment.authorName || "?")[0]}</Avatar>
              <Box>
                <Typography fontWeight="bold">{comment.authorName}</Typography>
                {comment.userInfo && (
                  <Typography variant="body2" color="primary">
                    {labelMapper(
                      "serviceRoleMap",
                      comment.userInfo?.serviceRole ?? "NONE"
                    )}{" "}
                    &gt; {comment.userInfo.ageGroup}
                  </Typography>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary" ml="auto">
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
            </Stack>

            {/* 본문: 삭제되어도 그대로 보이게 */}
            <Typography
              mt={1}
              whiteSpace="pre-line"
              sx={{
                color: isDeleted ? "text.secondary" : "text.primary",
              }}
            >
              {comment.content}
            </Typography>

            {/* 상태 및 버튼 */}
            <Stack direction="row" alignItems="center" spacing={1} mt={2}>
              {comment.reportCount > 0 && (
                <Chip label="신고됨" color="error" size="small" />
              )}

              <IconButton size="small" disabled={isDeleted} aria-label="like">
                <ThumbUpIcon fontSize="small" />
                <Typography variant="caption" ml={0.5}>
                  {comment.likeCount}
                </Typography>
              </IconButton>

              <IconButton size="small" disabled={isDeleted} aria-label="report">
                <ReportIcon fontSize="small" />
                <Typography variant="caption" ml={0.5}>
                  {comment.reportCount}
                </Typography>
              </IconButton>

              <Box flexGrow={1} />

              {/* 삭제된 경우에는 버튼 숨김 (HolpaContent와 동일한 UX) */}
              {!isDeleted && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  삭제
                </Button>
              )}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default HolpaComments;
