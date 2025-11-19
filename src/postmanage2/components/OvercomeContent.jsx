// src/pages/components/OvercomeContent.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import { labelMapper } from "../../utils/LabelMapper";
import OvercomeBeforeStoriesDialog from "./OvercomeBeforeStoriesDialog";
import { deleteOvercomePost } from "../hooks/useOvercomePostDetail";

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
};

const OvercomeContent = ({ post }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    id,
    authorName,
    createdAt,
    serviceRole,
    ageGroup,
    content,
    likeCount,
    reportCount,
    commentCount,
    group,
    beforeStories = [],
    status: initialStatus,
    activated, // 혹시 백에서 같이 내려올 수 있으니 보존
  } = post;

  // 🔹 status 기준으로 상태 관리 (fallback: activated 여부로 추정)
  const [status, setStatus] = useState(
    initialStatus ?? (activated === false ? "SUSPENDED" : "ACTIVATED")
  );

  if (!post) return null;

  const hasBeforeStories =
    Array.isArray(beforeStories) && beforeStories.length > 0;

  const isActivated = status === "ACTIVATED";

  // 🔹 배너 텍스트/스타일 계산
  let bannerText = null;
  let bannerSeverity = "warning";

  if (status === "DEACTIVATED") {
    bannerText = "작성자가 삭제한 글입니다.";
    bannerSeverity = "info";
  } else if (status === "SUSPENDED") {
    bannerText = "관리자가 삭제한 글입니다.";
    bannerSeverity = "warning";
  }

  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;

    try {
      await deleteOvercomePost(id); // DELETE /admin/posts/{postId}
      alert("삭제 처리가 완료되었습니다.");
      // 🔹 관리자에 의한 삭제 → SUSPENDED
      setStatus("SUSPENDED");
    } catch (e) {
      console.error("극복수기 게시글 삭제 실패:", e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box border="1px solid #ddd" borderRadius={2} p={3} mb={4}>
      {/* 상단: 그룹 Chip + 삭제 배너 */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mb={2}
        sx={{ minHeight: 32 }}
      >
        {group.map((type) => (
          <Chip
            key={type}
            size="small"
            color="primary"
            label={labelMapper("overcomeGroupMap", type)}
          />
        ))}

        {bannerText && (
          <Alert
            severity={bannerSeverity}
            variant="outlined"
            sx={{ fontWeight: "bold", px: 2 }}
          >
            {bannerText}
          </Alert>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2} mb={2} mt={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          {authorName}
        </Typography>
        {serviceRole && (
          <Typography variant="subtitle1" color="primary">
            {labelMapper("serviceRoleMap", serviceRole)} &gt; {ageGroup}
          </Typography>
        )}
      </Stack>

      {/* 본문 */}
      <Typography
        variant="body1"
        whiteSpace="pre-line"
        mb={2}
        sx={{ color: isActivated ? "text.primary" : "text.secondary" }}
      >
        {content}
      </Typography>

      {/* 이전 사연보기 / 삭제 버튼 */}
      <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
        {hasBeforeStories && (
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            이전 사연보기
          </Button>
        )}
        {/* 🔹 활성 상태일 때만 삭제 버튼 노출 */}
        {isActivated && (
          <Button variant="outlined" color="error" onClick={handleDelete}>
            삭제
          </Button>
        )}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* 하단 정보 */}
      <Stack direction="row" spacing={4} justifyContent="flex-end">
        <Typography variant="caption">
          작성일: {formatDateTime(createdAt)}
        </Typography>
        <Typography variant="caption">좋아요: {likeCount}</Typography>
        <Typography variant="caption">신고: {reportCount}</Typography>
        <Typography variant="caption">댓글: {commentCount}</Typography>
      </Stack>

      {/* 이전 사연 다이얼로그 */}
      <OvercomeBeforeStoriesDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        stories={beforeStories}
      />
    </Box>
  );
};

export default OvercomeContent;
