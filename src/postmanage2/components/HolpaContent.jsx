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
import { deleteHolpaPostContent } from "../hooks/useHolpaPostDetail";
import { labelMapper } from "../../utils/LabelMapper";

const HolpaContent = ({ post }) => {
  const {
    id,
    authorName,
    category,
    content,
    createdAt,
    likeCount,
    reportCount,
    commentCount,
    activated: initialActivated,
    userInfo,
  } = post || {};

  const [activated, setActivated] = useState(initialActivated);

  if (!post) return null;

  const showDeletedBanner = !activated;

  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;

    try {
      await deleteHolpaPostContent(id);
      alert("삭제 처리가 완료되었습니다.");
      setActivated(false);
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box border="1px solid #ddd" borderRadius={2} p={3} mb={4}>
      {/* 카테고리 + 자동 삭제 안내 */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
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
      </Stack>

      {/* 작성자 */}
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

      <Typography variant="body2" color="text.disabled" mb={1}>
        준비된 사진이 없습니다. / 이미지 섹션 (임시Typography)
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* 버튼 */}
      <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
        {activated && ( // ✅ 삭제되면 버튼 숨김
          <Button variant="outlined" color="error" onClick={handleDelete}>
            삭제
          </Button>
        )}
      </Stack>

      {/* 부가 정보 */}
      <Stack direction="row" spacing={4} mt={2} justifyContent={"flex-end"}>
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

export default HolpaContent;
