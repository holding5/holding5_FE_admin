// src/pages/components/CatsEyeContent.jsx
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
import { deleteCatsEyePost } from "../hooks/useCatsEyePostDetail";

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

const CatsEyeContent = ({ post }) => {
  const [status, setStatus] = useState(post?.status ?? "ACTIVATED");

  if (!post) return null;

  const {
    id,
    authorName,
    address,
    serviceRole,
    ageGroup,
    createdAt,
    content,
    likeCount,
    reportCount,
    commentCount,
    shareTypes = [],
  } = post;

  const isActivated = status === "ACTIVATED";
  const showDeletedBanner = !isActivated;

  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;

    try {
      await deleteCatsEyePost(id);
      alert("삭제 처리가 완료되었습니다.");
      setStatus("DEACTIVATED");
    } catch (e) {
      console.error("캣츠아이 게시글 삭제 실패:", e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box border="1px solid #ddd" borderRadius={2} p={3} mb={4}>
      {/* 상단: 공유대상 Chip + 삭제 배너 */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mb={2}
        sx={{ minHeight: 32 }}
      >
        {shareTypes.map((type) => (
          <Chip
            key={type}
            size="small"
            color="primary"
            label={labelMapper("catsEyeShareTypeMap", type)}
          />
        ))}

        {showDeletedBanner && (
          <Alert
            severity="warning"
            variant="outlined"
            sx={{ fontWeight: "bold", px: 2 }}
          >
            관리자가 삭제한 글입니다.
          </Alert>
        )}
      </Stack>

      {/* 작성자 / 역할 */}
      <Stack direction="row" alignItems="center" spacing={2} mt={1} mb={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          {authorName}
        </Typography>
        {serviceRole && (
          <Typography variant="subtitle1" color="primary">
            {labelMapper("serviceRoleMap", serviceRole)} &gt; {ageGroup}
          </Typography>
        )}
      </Stack>

      {/* 지역 */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        {address && (
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        )}
      </Stack>

      {/* 본문: 언제/누가/어떻게/왜/어디서/메시지 */}
      <Box mb={2}>
        {content?.who && (
          <Typography variant="body2" mb={0.5}>
            <strong>누가:&nbsp;</strong> {content.who}
          </Typography>
        )}
        {content?.when && (
          <Typography variant="body2" mb={0.5}>
            <strong>언제:&nbsp;</strong> {content.when}
          </Typography>
        )}
        {content?.localContent && (
          <Typography variant="body2" mb={0.5}>
            <strong>어디서:&nbsp;</strong> {content.localContent}
          </Typography>
        )}
        {content?.how && (
          <Typography variant="body2" mb={0.5}>
            <strong>어떻게:&nbsp;</strong> {content.how}
          </Typography>
        )}
        {content?.why && (
          <Typography variant="body2" mb={0.5}>
            <strong>왜:&nbsp;</strong> {content.why}
          </Typography>
        )}

        {content?.message && (
          <Typography variant="body1" mt={1} whiteSpace="pre-line">
            <strong>전하고 싶은 말</strong>
            <br />
            {content.message}
          </Typography>
        )}
      </Box>

      {/* 버튼  ✅ 삭제되면 버튼 숨김 */}
      <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
        {isActivated && (
          <Button variant="outlined" color="error" onClick={handleDelete}>
            삭제
          </Button>
        )}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* 하단 정보 (홀파랑 공통 패턴) */}
      <Stack direction="row" spacing={4} justifyContent="flex-end">
        <Typography variant="caption">
          작성일: {formatDateTime(createdAt)}
        </Typography>
        <Typography variant="caption">좋아요: {likeCount}</Typography>
        <Typography variant="caption">신고: {reportCount}</Typography>
        <Typography variant="caption">댓글: {commentCount}</Typography>
      </Stack>
    </Box>
  );
};

export default CatsEyeContent;
