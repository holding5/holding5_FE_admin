import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import {
  dismissReportedPost,
  deleteReportedPost,
} from "../hooks/useReportedUserContents";
import { labelMapper } from "../../utils/LabelMapper";

/**
 * @param {{
 *  post: {
 *    id: number;
 *    userId: number;
 *    authorName: string;
 *    category: string;
 *    content: string;
 *    createdAt: string;
 *    likeCount: number;
 *    reportCount: number;
 *    commentCount: number;
 *    status?: "ACTIVATED" | "DEACTIVATED" | "SUSPENDED" | string;
 *    userInfo?: { serviceRole: string; ageGroup: string; userId?: number };
 *  } | null;
 *  postReports?: Array<{
 *    reportId: number;
 *    targetId: number;
 *    type: string;
 *    reportStatus: "OPEN" | "DISMISSED" | "RESOLVED" | string;
 *    createdAt: string;
 *  }>;
 *  highlightUserId?: number | string;
 * }} props
 */
const ReportedPostContent = ({ post, postReports = [], highlightUserId }) => {
  const {
    id,
    authorName,
    category,
    content,
    createdAt,
    likeCount,
    reportCount,
    commentCount,
    status,
    userInfo,
    userId,
  } = post;

  // --- 로컬 신고 처리 결과 (무혐의 / 삭제) ---
  const [localReportResult, setLocalReportResult] = useState(null); // "DISMISSED" | "RESOLVED" | null

  useEffect(() => {
    setLocalReportResult(null);
  }, [id]);

  if (!post) return null;

  // --- 작성자 판별 ---
  const targetId = Number(highlightUserId);
  const isAuthor =
    !Number.isNaN(targetId) && userId != null && Number(userId) === targetId;

  // --- 1) status 기반 삭제 배너 ---
  let statusBannerText = "";
  if (status === "DEACTIVATED") {
    statusBannerText = "작성자가 삭제한 글입니다.";
  } else if (status === "SUSPENDED") {
    statusBannerText = "관리자가 삭제한 글입니다.";
  }
  const showStatusBanner = !!statusBannerText;

  // --- 2) reportStatus 기반 신고 결과 배너 ---
  const hasOpenReports = (postReports || []).some(
    (r) => r.reportStatus === "OPEN"
  );
  const hasDismissedReports = (postReports || []).some(
    (r) => r.reportStatus === "DISMISSED"
  );
  const hasResolvedReports = (postReports || []).some(
    (r) => r.reportStatus === "RESOLVED"
  );

  let reportBannerText = null;

  if (localReportResult === "DISMISSED") {
    reportBannerText = "처리결과 무혐의 처리된 글입니다.";
  } else if (localReportResult === "RESOLVED") {
    reportBannerText = "처리결과 삭제처리된 글입니다.";
  } else if (!hasOpenReports && postReports.length > 0) {
    if (hasResolvedReports) {
      reportBannerText = "처리결과 삭제처리된 글입니다.";
    } else if (hasDismissedReports) {
      reportBannerText = "처리결과 무혐의 처리된 글입니다.";
    }
  }
  const showReportBanner = !!reportBannerText;

  // --- 3) 버튼 노출 조건: isAuthor + OPEN 신고 ---
  const canModerate = isAuthor && hasOpenReports && !localReportResult;

  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;
    try {
      await deleteReportedPost(id);
      alert("삭제 처리가 완료되었습니다.");
      setLocalReportResult("RESOLVED"); // 삭제 처리 배너
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDismiss = async () => {
    if (
      !window.confirm("이 게시글에 대한 모든 신고를 무혐의 처리하시겠습니까?")
    )
      return;
    try {
      await dismissReportedPost(id);
      alert("무혐의 처리가 완료되었습니다.");
      setLocalReportResult("DISMISSED"); // 무혐의 배너
    } catch (e) {
      console.error("무혐의 처리 실패:", e);
      alert("무혐의 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box
      border="1px solid #ddd"
      borderRadius={2}
      p={3}
      mb={4}
      sx={{
        bgcolor: isAuthor ? "rgba(227, 242, 253, 0.9)" : "background.paper",
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Chip
            label={labelMapper("holpaPostCategory", category)}
            color="primary"
            size="medium"
          />

          {showStatusBanner && (
            <Alert
              severity="warning"
              variant="outlined"
              sx={{ fontWeight: "bold", px: 2 }}
            >
              {statusBannerText}
            </Alert>
          )}

          {showReportBanner && (
            <Alert
              severity="info"
              variant="outlined"
              sx={{ fontWeight: "bold", px: 2 }}
            >
              {reportBannerText}
            </Alert>
          )}
        </Stack>

        {postReports.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
          >
            {postReports.map((r) => (
              <Chip
                key={r.reportId}
                label={r.type}
                size="medium"
                color="error"
                sx={{ mb: 0.5 }}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Stack direction="row" spacing={4} mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          {authorName}
        </Typography>

        {userInfo && (
          <Typography variant="subtitle1" color="primary">
            {labelMapper("serviceRoleMap", userInfo?.serviceRole ?? "NONE")}{" "}
            &gt; {userInfo.ageGroup}
          </Typography>
        )}
      </Stack>

      <Typography variant="body1" whiteSpace="pre-line" mb={2}>
        {content}
      </Typography>

      <Typography variant="body2" color="text.disabled" mb={1}>
        준비된 사진이 없습니다. / 이미지 섹션 (임시 Typography)
      </Typography>

      <Divider sx={{ my: 2 }} />

      {canModerate && (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" color="primary" onClick={handleDismiss}>
            무혐의
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            삭제
          </Button>
        </Stack>
      )}

      <Stack direction="row" spacing={4} mt={2} justifyContent="flex-end">
        <Typography variant="caption">
          작성일: {new Date(createdAt).toLocaleString()}
        </Typography>
        <Typography variant="caption">좋아요: {likeCount}</Typography>
        <Typography variant="caption">신고: {reportCount}</Typography>
        <Typography variant="caption">댓글: {commentCount}</Typography>
      </Stack>
    </Box>
  );
};

export default ReportedPostContent;
