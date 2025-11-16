// src/pages/system/CatsEyeDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import useOvercomePostDetail from "../hooks/useOvercomePostDetail";
import OvercomeContent from "../components/OvercomeContent";
import OvercomeComments from "../components/OvercomeComments";

const OvercomeDetailPage = () => {
  const { postId } = useParams(); // 라우터 경로: /overcome/:postId
  const { data, loading, error } = useOvercomePostDetail(postId);

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
      <OvercomeContent post={data} />

      {/* 댓글 목록 */}
      {data.comments && data.comments.length > 0 ? (
        <OvercomeComments comments={data.comments} />
      ) : (
        <Typography variant="body2" color="text.secondary">
          댓글이 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default OvercomeDetailPage;
