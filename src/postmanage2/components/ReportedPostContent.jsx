import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Alert,
} from "@mui/material";

const ReportedPostContent = ({ post }) => {
  if (!post) return null;

  const {
    nickname,
    email,
    type,
    status,
    content,
    reportedAt,
    bannedAt,
    isAutoDeleted,
  } = post;

  const showDeletedBanner = status === "자동정지" || isAutoDeleted;

  // ✅ 버튼 클릭 핸들러들
  const handleInnocent = () => {
    alert("무혐의 처리가 완료되었습니다.");
  };

  const handleDelete = () => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      alert("삭제 처리가 완료되었습니다.");
    }
  };

  const handleEdit = () => {
    alert("수정 페이지로 이동합니다. (아직 연결 안됨)");
  };

  return (
    <Box border="1px solid #ddd" borderRadius={2} p={3} mb={4}>
      {/* 신고 분류 + 자동 삭제 안내 */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Chip label={type} color="error" size="small" />
        {showDeletedBanner && (
          <Alert
            severity="warning"
            variant="outlined"
            sx={{ fontWeight: "bold", px: 2 }}
          >
            삭제된 글입니다. <strong>자동 삭제 처리된 글입니다.</strong>
          </Alert>
        )}
      </Stack>

      {/* 작성자 정보 */}
      <Stack direction="row" spacing={2} mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          {nickname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({email})
        </Typography>
      </Stack>

      {/* 본문 내용 */}
      <Typography variant="body1" whiteSpace="pre-line" mb={2}>
        {content}
      </Typography>

      {/* 미디어/링크 없음 */}
      <Typography variant="body2" color="text.disabled" mb={1}>
        준비된 사진이 없습니다.
      </Typography>
      <Typography variant="body2" color="text.disabled" mb={2}>
        준비된 음성이 없습니다.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* 처리 버튼 */}
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" color="success" onClick={handleInnocent}>
          무혐의
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          삭제
        </Button>
        <Button variant="outlined" color="warning" onClick={handleEdit}>
          수정
        </Button>
        <Button variant="contained" color="info" disabled>
          앱에서 삭제됨
        </Button>
      </Stack>

      {/* 신고 시점 및 제명 시점 */}
      <Stack direction="row" spacing={4} mt={2}>
        <Typography variant="caption">신고시점: {reportedAt}</Typography>
        {bannedAt && (
          <Typography variant="caption">영구제명 시점: {bannedAt}</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ReportedPostContent;
