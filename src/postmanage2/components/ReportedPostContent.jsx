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
 *    authorName: string;
 *    category: string;
 *    content: string;
 *    createdAt: string;
 *    likeCount: number;
 *    reportCount: number;
 *    commentCount: number;
 *    activated: boolean;
 *    userInfo?: { serviceRole: string; ageGroup: string; userId?: number };
 *    userId?: number;
 *  } | null;
 *  postReports?: Array<{
 *    reportId: number;
 *    targetId: number;
 *    type: string;
 *    status: string;
 *    createdAt: string;
 *  }>;
 *  highlightUserId?: number | string;
 * }} props
 */
const ReportedPostContent = ({ post, postReports = [], highlightUserId }) => {
  // 🔹 post가 null일 수도 있으니 안전하게 기본값 넣어서 구조분해
  const {
    id,
    authorName,
    category,
    content,
    createdAt,
    likeCount,
    reportCount,
    commentCount,
    activated = false,
    userInfo,
    userId,
  } = post || {};

  // 🔹 해당 유저의 게시글이면 true
  const targetId = Number(highlightUserId);
  const isAuthor =
    !Number.isNaN(targetId) && userId != null && Number(userId) === targetId;

  // 🔹 로컬 활성 상태
  const [isActivated, setIsActivated] = useState(activated);

  // 🔹 신고 처리 결과 (null | "DISMISSED" | "DELETED")
  const [actionResult, setActionResult] = useState(null);

  const hasOpenReports = (postReports || []).some((r) => r.status === "OPEN");
  const isDismissedOnServer = (postReports || []).length > 0 && !hasOpenReports; // 모두 DISMISSED 인 경우

  // 🔹 다른 게시글로 넘어갈 때마다 초기값 다시 맞춰주기
  useEffect(() => {
    setIsActivated(activated);
    // 서버에서 이미 무혐의 처리된 상태라면 로컬 플래그도 같이 맞춰준다
    setActionResult(isDismissedOnServer ? "DISMISSED" : null);
  }, [id, activated, isDismissedOnServer]);

  // 🔹 여기서야 post 유무에 따라 렌더링 결정 (훅 호출 뒤라서 OK)
  if (!post) return null;

  const showDeletedBanner = !isActivated;
  const showDismissedBanner =
    actionResult === "DISMISSED" || isDismissedOnServer;

  const isActionLocked = showDeletedBanner || showDismissedBanner;

  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;

    try {
      await deleteReportedPost(id);
      alert("삭제 처리가 완료되었습니다.");
      setIsActivated(false);
      setActionResult("DELETED");
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
      setActionResult("DISMISSED");
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
        bgcolor: isAuthor ? "rgba(255, 243, 224, 0.9)" : "background.paper", // 🔹 해당 유저 글 하이라이트
      }}
    >
      {/* 카테고리 + 삭제 안내 + 신고 요약 */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Chip
            label={labelMapper("holpaPostCategory", category)}
            color="primary"
            size="medium"
          />
          {showDeletedBanner && (
            <Alert
              severity="warning"
              variant="outlined"
              sx={{ fontWeight: "bold", px: 2 }}
            >
              관리자가 삭제한 글입니다.
            </Alert>
          )}

          {showDismissedBanner && (
            <Alert
              severity="info"
              variant="outlined"
              sx={{ fontWeight: "bold", px: 2 }}
            >
              신고 검토 결과 무혐의 처리된 글입니다.
            </Alert>
          )}
        </Stack>

        {postReports.length > 0 && (
          <Stack direction="row" spacing={1} alignItems="center">
            {postReports.map((r) => (
              <Chip
                key={r.reportId}
                label={`${r.type}`}
                size="medium"
                color="error"
              />
            ))}
          </Stack>
        )}
      </Stack>

      {/* 작성자 + 역할 */}
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

      {/* 본문 */}
      <Typography variant="body1" whiteSpace="pre-line" mb={2}>
        {content}
      </Typography>

      {/* 이미지 섹션 자리 (임시) */}
      <Typography variant="body2" color="text.disabled" mb={1}>
        준비된 사진이 없습니다. / 이미지 섹션 (임시Typography)
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* 버튼 영역 */}
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        {isActivated && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDismiss}
              disabled={isActionLocked}
            >
              무혐의
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={isActionLocked}
            >
              삭제
            </Button>
          </>
        )}
      </Stack>

      {/* 부가 정보 */}
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
