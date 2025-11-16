// src/pages/system/CatsEyeDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import useCatsEyePostDetail from "../hooks/useCatsEyePostDetail";
import CatsEyeContent from "../components/CatsEyeContent";
import CatsEyeComments from "../components/CatsEyeComments";

const CatsEyeDetailPage = () => {
  const { postId } = useParams(); // 라우터 경로: /catseye/:postId
  const { data, loading, error } = useCatsEyePostDetail(postId);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ color: "error.main", mt: 4, textAlign: "center" }}>
        게시글을 불러오는 중 오류가 발생했습니다.
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box sx={{ p: 3 }}>
      {/* 게시글 본문 */}
      <CatsEyeContent post={data} />

      {/* 댓글 목록 */}
      {data.comments && data.comments.length > 0 ? (
        <CatsEyeComments comments={data.comments} />
      ) : (
        <Typography variant="body2" color="text.secondary">
          댓글이 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default CatsEyeDetailPage;
