// src/pages/HolpaDetailPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import useHolpaPostDetail from "../hooks/useHolpaPostDetail";
import HolpaContent from "../components/HolpaContent";
import HolpaComments from "../components/HolpaComments";

const HolpaDetailPage = () => {
  const { postId } = useParams(); // 라우터 경로: /holpawall/:postId
  const [order, setOrder] = useState("desc");
  const { data, loading, error } = useHolpaPostDetail(postId, order);

  const handleOrderChange = (_, newOrder) => {
    if (newOrder) setOrder(newOrder);
  };

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
      <HolpaContent post={{ ...data.post, userInfo: data.userInfo }} />

      {/* 댓글 목록 */}
      {data.comments?.length > 0 ? (
        <HolpaComments comments={data.comments} />
      ) : (
        <Typography variant="body2" color="text.secondary">
          댓글이 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default HolpaDetailPage;
