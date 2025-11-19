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
    status: initialStatus,
    userInfo,
    mediaFiles = [], // ✅ 여기에 DTO 배열이 들어옴: { url, type }[]
  } = post;

  const [status, setStatus] = useState(
    initialStatus ?? (initialActivated ? "ACTIVATED" : "SUSPENDED")
  );

  if (!post) return null;

  const isActive = status === "ACTIVATED";

  // 🔹 배너 내용/색 결정
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
      await deleteHolpaPostContent(id);
      alert("삭제 처리가 완료되었습니다.");
      setStatus("SUSPENDED");
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 🔹 타입별로 나누기
  const imageFiles = mediaFiles.filter((f) => {
    const t = (f.type || "").toUpperCase();
    return t.startsWith("IMAGE");
  });

  const audioFiles = mediaFiles.filter((f) => {
    const t = (f.type || "").toUpperCase();
    // AUDIO, VOICE 같은 것들 포함
    return t.startsWith("AUDIO") || t.includes("VOICE");
  });

  const videoFiles = mediaFiles.filter((f) => {
    const t = (f.type || "").toUpperCase();
    return t.startsWith("VIDEO");
  });

  return (
    <Box border="1px solid #ddd" borderRadius={2} p={3} mb={4}>
      {/* 카테고리 + 삭제 배너 */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Chip
          label={labelMapper("holpaPostCategory", category)}
          color="primary"
          size="medium"
        />

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

      {/* 🔹 미디어 섹션 전체 */}
      {imageFiles.length + audioFiles.length + videoFiles.length > 0 ? (
        <Stack spacing={2} mb={2}>
          {/* 이미지들 */}
          {imageFiles.length > 0 && (
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {imageFiles.map((file, idx) => (
                <Box
                  key={file.url ?? idx}
                  component="img"
                  src={file.url}
                  alt={`holpa-post-${id}-image-${idx}`}
                  sx={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #eee",
                  }}
                />
              ))}
            </Stack>
          )}

          {/* 음성들 */}
          {audioFiles.length > 0 && (
            <Stack spacing={1}>
              {audioFiles.map((file, idx) => (
                <audio
                  key={file.url ?? idx}
                  controls
                  src={file.url}
                  style={{ width: "100%" }}
                />
              ))}
            </Stack>
          )}

          {/* 동영상들 */}
          {videoFiles.length > 0 && (
            <Stack spacing={1}>
              {videoFiles.map((file, idx) => (
                <Box
                  key={file.url ?? idx}
                  component="video"
                  src={file.url}
                  controls
                  sx={{
                    width: "100%",
                    maxWidth: 480,
                    borderRadius: 1,
                    border: "1px solid #eee",
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.disabled" mb={2}>
          준비된 미디어가 없습니다.
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      {/* 버튼 */}
      <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
        {isActive && (
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
