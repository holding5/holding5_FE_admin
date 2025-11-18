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
 *    status?: "ACTIVATED" | "DEACTIVATED" | "SUSPENDED" | string;
 *    // 프론트에서만 쓰는 필드 (신고 결과 로컬 반영)
 *    actionResult?: "DISMISSED" | "RESOLVED";
 *    userInfo?: { serviceRole: string; ageGroup: string; userId?: number };
 *  }>;
 *  commentReports?: Array<{
 *    reportId: number;
 *    targetId: number;  // comment id
 *    type: string;
 *    reportStatus: "OPEN" | "DISMISSED" | "RESOLVED" | string;
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

      // 로컬: 관리자 삭제 상태 + 신고 결과 RESOLVED 로 표시
      updateCommentState(commentId, {
        status: "SUSPENDED",
        actionResult: "RESOLVED",
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

      // 로컬: 신고 결과 DISMISSED 로 표시
      updateCommentState(commentId, { actionResult: "DISMISSED" });
    } catch (e) {
      console.error("댓글 무혐의 처리 실패:", e);
      alert("댓글 무혐의 처리 중 오류가 발생했습니다.");
    }
  };

  const numericHighlightUserId = Number(highlightUserId);
  const hasHighlightUser = !Number.isNaN(numericHighlightUserId);

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

        // 🔹 이 댓글에 대한 reportStatus 집계
        const hasOpenReports = reports.some((r) => r.reportStatus === "OPEN");
        const hasDismissedReports = reports.some(
          (r) => r.reportStatus === "DISMISSED"
        );
        const hasResolvedReports = reports.some(
          (r) => r.reportStatus === "RESOLVED"
        );

        // --- 1) status 기준(작성자/관리자 삭제) 배너 ---
        let statusBannerText = "";
        if (comment.status === "DEACTIVATED") {
          statusBannerText = "작성자가 삭제한 댓글입니다.";
        } else if (comment.status === "SUSPENDED") {
          statusBannerText = "관리자가 삭제한 댓글입니다.";
        }
        const showStatusBanner = !!statusBannerText;

        // --- 2) reportStatus 기준(신고 처리 결과) 배너 ---
        const localResult = comment.actionResult; // "DISMISSED" | "RESOLVED" | undefined
        let reportBannerText = null;
        let reportBannerSeverity = "info";

        if (localResult === "DISMISSED") {
          reportBannerText = "처리결과 무혐의 처리된 댓글입니다.";
          reportBannerSeverity = "info";
        } else if (localResult === "RESOLVED") {
          reportBannerText = "처리결과 삭제처리된 댓글입니다.";
          reportBannerSeverity = "warning";
        } else if (!hasOpenReports && reports.length > 0) {
          // 서버 기준: OPEN 없는 상태에서만 결과 배너
          if (hasResolvedReports) {
            reportBannerText = "처리결과 삭제처리된 댓글입니다.";
            reportBannerSeverity = "warning";
          } else if (hasDismissedReports) {
            reportBannerText = "처리결과 무혐의 처리된 댓글입니다.";
            reportBannerSeverity = "info";
          }
        }
        const showReportBanner = !!reportBannerText;

        // --- 스타일용: 삭제된 상태인지(배경/색만) ---
        const isDeletedStatus =
          comment.status === "DEACTIVATED" || comment.status === "SUSPENDED";
        const isDeletedLocal = localResult === "RESOLVED";
        const isDeleted = isDeletedStatus || isDeletedLocal;

        // --- 작성자 여부 ---
        const isAuthor =
          hasHighlightUser && Number(comment.userId) === numericHighlightUserId;

        // --- 버튼 노출: 오직 isAuthor + OPEN 신고 ---
        const canModerate = isAuthor && hasOpenReports;

        return (
          <Box
            key={comment.id}
            sx={{
              border: "1px solid",
              borderColor: isAuthor ? "primary.light" : "#ccc",
              borderRadius: 2,
              p: 2,
              mb: 2,
              bgcolor: isAuthor
                ? "rgba(227, 242, 253, 0.9)"
                : "background.paper",
              opacity: isDeleted ? 0.9 : 1,
            }}
          >
            {/* status 배너 (작성자/관리자 삭제) */}
            {showStatusBanner && (
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
                {statusBannerText}
              </Alert>
            )}

            {/* reportStatus 배너 (무혐의 / 삭제처리) */}
            {showReportBanner && (
              <Alert
                severity={reportBannerSeverity}
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
                {reportBannerText}
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

              {comment.reportCount > 0 && (
                <Chip label="신고됨" color="error" size="small" />
              )}

              {/* 신고 내역 Chip들 */}
              {reports.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {reports.map((r) => (
                    <Chip
                      key={r.reportId}
                      label={r.type}
                      size="small"
                      color="error"
                      sx={{ mt: 0.5 }}
                    />
                  ))}
                </Stack>
              )}

              <Box flexGrow={1} />

              {/* 무혐의 / 삭제 버튼: 본인 + OPEN 신고 있을 때만 */}
              {canModerate && (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleCommentDismiss(comment.id)}
                  >
                    무혐의
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
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
