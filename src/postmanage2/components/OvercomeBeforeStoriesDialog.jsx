// src/pages/components/OvercomeBeforeStoriesDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { labelMapper } from "../../utils/LabelMapper";

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

const OvercomeBeforeStoriesDialog = ({ open, onClose, stories = [] }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        이전 사연
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {stories.length === 0 && (
          <Typography color="text.secondary">
            연결된 이전 사연이 없습니다.
          </Typography>
        )}

        {stories.map((story) => {
          const comments = story.comments ?? [];
          const hasComments = comments.length > 0;

          return (
            <Box
              key={story.id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
                bgcolor: "background.paper",
              }}
            >
              {/* 상단 정보 */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography fontWeight="bold">{story.authorName}</Typography>
                  {story.category && (
                    <Chip
                      label={labelMapper("postTopicMap", story.category)}
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(story.createdAt)}
                </Typography>
              </Stack>

              {/* 이전 사연 내용 */}
              <Typography whiteSpace="pre-line" mb={1}>
                {story.content}
              </Typography>

              {/* 간단 통계 */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mb={1}
              >
                <Typography variant="caption">
                  좋아요: {story.likeCount}
                </Typography>
                <Typography variant="caption">
                  신고: {story.reportCount}
                </Typography>
                <Typography variant="caption">
                  댓글: {story.commentCount}
                </Typography>
              </Stack>

              {/* 댓글 영역 */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" mb={1}>
                댓글 {comments.length}개
              </Typography>

              {hasComments ? (
                comments.map((c) => (
                  <Box
                    key={c.id}
                    sx={{
                      border: "1px solid #eee",
                      borderRadius: 1,
                      p: 1,
                      mb: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" fontWeight="bold">
                        {c.authorName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDateTime(c.createdAt)}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" whiteSpace="pre-line" mt={0.5}>
                      {c.content}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                      mt={0.5}
                    >
                      <Typography variant="caption">
                        좋아요: {c.likeCount}
                      </Typography>
                      <Typography variant="caption">
                        신고: {c.reportCount}
                      </Typography>
                    </Stack>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  댓글이 없습니다.
                </Typography>
              )}
            </Box>
          );
        })}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OvercomeBeforeStoriesDialog;
