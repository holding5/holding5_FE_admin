// src/pages/components/ReportedPostComments.jsx
import React, { useState, useEffect, useMemo } from "react";
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
import {
  dismissReportedComment,
  deleteReportedComment,
} from "../hooks/useReportedUserContents";
import { labelMapper } from "../../utils/LabelMapper";

/**
 * @param {{
 *  comments?: Array<{
 *    id: number;
 *    content: string;
 *    authorName: string;
 *    anonymity?: boolean;
 *    likeCount: number;
 *    reportCount: number;
 *    createdAt: string;
 *    postId: number;
 *    userId: number;
 *    actionResult?: "DISMISSED" | "DELETED";
 *    userInfo?: { serviceRole: string; ageGroup: string; userId?: number };
 *  }>;
 *  commentReports?: Array<{
 *    reportId: number;
 *    targetId: number;  // comment id
 *    type: string;
 *    status: string;
 *    createdAt: string;
 *  }>;
 *  highlightUserId?: number | string;
 * }} props
 */
const ReportedPostComments = ({
  comments = [],
  commentReports = [],
  highlightUserId,
}) => {
  const [sortType, setSortType] = useState("latest");
  const [localComments, setLocalComments] = useState(comments);

  // 🔹 신고 내역: commentId → report 목록 맵
  const reportsByCommentId = useMemo(() => {
    const map = new Map();
    commentReports.forEach((r) => {
      if (!map.has(r.targetId)) map.set(r.targetId, []);
      map.get(r.targetId).push(r);
    });
    return map;
  }, [commentReports]);

  // 🔹 상위에서 comments가 바뀔 때마다 동기화
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleSortChange = (e, newSort) => {
    if (newSort !== null) setSortType(newSort);
  };

  const sortedComments = [...localComments].sort((a, b) => {
    if (sortType === "latest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const updateCommentState = (commentId, updater) => {
    setLocalComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, ...updater } : c))
    );
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteReportedComment(commentId);
      alert("댓글이 삭제되었습니다.");
      updateCommentState(commentId, {
        activated: false,
        actionResult: "DELETED",
      });
    } catch (e) {
      console.error("댓글 삭제 실패:", e);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCommentDismiss = async (commentId) => {
    if (!window.confirm("이 댓글에 대한 모든 신고를 무혐의 처리하시겠습니까?"))
      return;
    try {
      await dismissReportedComment(commentId);
      alert("무혐의 처리가 완료되었습니다.");
      updateCommentState(commentId, { actionResult: "DISMISSED" });
    } catch (e) {
      console.error("댓글 무혐의 처리 실패:", e);
      alert("무혐의 처리 중 오류가 발생했습니다.");
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
        const reports = reportsByCommentId.get(comment.id) || [];

        // 서버 기준: 이 댓글에 남아있는 OPEN 신고가 있는지
        const hasOpenReports = reports.some((r) => r.status === "OPEN");
        const isDismissedOnServer = reports.length > 0 && !hasOpenReports;

        const isDeleted =
          comment.activated === false || comment.actionResult === "DELETED";
        const isDismissedLocal = comment.actionResult === "DISMISSED";
        const isDismissed = isDismissedLocal || isDismissedOnServer;

        // 🔹 해당 유저가 쓴 댓글인지
        const isAuthor =
          highlightUserId != null && comment.userId === highlightUserId;

        return (
          <Box
            key={comment.id}
            sx={{
              border: "1px solid",
              borderColor: isDeleted
                ? "warning.light"
                : isAuthor
                ? "primary.light"
                : "#ccc",
              borderRadius: 2,
              p: 2,
              mb: 2,
              bgcolor: isDeleted
                ? "grey.50"
                : isAuthor
                ? "rgba(227, 242, 253, 0.9)" // 🔹 해당 유저 댓글 하이라이트(연한 파랑)
                : "background.paper",
              opacity: isDeleted ? 0.9 : 1,
            }}
          >
            {/* 🔸 삭제 배너 */}
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

            {/* 🔸 무혐의 배너 */}
            {!isDeleted && isDismissed && (
              <Alert
                severity="info"
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
                신고 검토 결과 무혐의 처리된 댓글입니다.
              </Alert>
            )}

            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Avatar>{(comment.authorName || "익")[0]}</Avatar>

              <Box>
                <Typography fontWeight="bold">
                  {comment.anonymity ? "익명" : comment.authorName}
                </Typography>
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

            {/* 내용 */}
            <Typography
              mt={1}
              whiteSpace="pre-line"
              sx={{
                color: isDeleted ? "text.secondary" : "text.primary",
              }}
            >
              {comment.content}
            </Typography>

            {/* 상태 / 신고 정보 / 버튼 */}
            <Stack direction="row" alignItems="center" spacing={1} mt={2}>
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

              {/* 기존 신고 여부 Chip */}
              {comment.reportCount > 0 && (
                <Chip label="신고됨" color="error" size="small" />
              )}

              {/* 🔹 신고 내역이 있으면 상세 Chip들 */}
              {reports.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {reports.map((r) => (
                    <Chip
                      key={r.reportId}
                      label={`${r.type}`}
                      size="small"
                      color="error"
                      sx={{ mt: 0.5 }}
                    />
                  ))}
                </Stack>
              )}

              <Box flexGrow={1} />

              {/* 무혐의 / 삭제 버튼 (둘 중 하나만 가능) */}
              {!isDeleted && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    disabled={isDismissed || isDeleted}
                    onClick={() => handleCommentDismiss(comment.id)}
                  >
                    무혐의
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    disabled={isDismissed || isDeleted}
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    삭제
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        );
      })}

      {/* 댓글이 하나도 없을 때 */}
      {sortedComments.length === 0 && (
        <Box
          sx={{
            border: "1px solid #eee",
            borderRadius: 2,
            p: 2,
            color: "text.secondary",
          }}
        >
          댓글이 없습니다.
        </Box>
      )}
    </Box>
  );
};

export default ReportedPostComments;
