import {
  Popover,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHopeMessageDetail } from "../hooks/useHopeMessages";
import axiosInstance from "../../utils/axiosInstance";
import { formatDateTime } from "../../utils/formatDate";

const HopeMessageDetail = ({ anchorEl, onClose, row, onActionDone }) => {
  const open = Boolean(anchorEl);

  // ✅ 상세 API 호출
  const { detail, loading, error, refetch } = useHopeMessageDetail(row?.id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ 상세 데이터 도착 시 세팅
  useEffect(() => {
    if (detail) {
      setTitle(detail.title ?? "");
      setContent(detail.content ?? "");
    }
  }, [detail]);

  // ── 관리 액션 공통 핸들러 ──
  const handleAction = async (actionFn, confirmMsg) => {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    setActionLoading(true);
    try {
      await actionFn();
      onActionDone?.(); // 부모에서 목록 새로고침
      onClose();
    } catch (e) {
      alert(e?.response?.data?.message ?? e?.message ?? "처리 실패");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = () =>
    handleAction(
      () => axiosInstance.delete(`/admin/messages/hope/${detail.id}`),
      "정말 삭제하시겠습니까?",
    );

  const handleReject = () =>
    handleAction(
      () => axiosInstance.patch(`/admin/messages/hope/${detail.id}/reject`),
      "거절 처리하시겠습니까?",
    );

  const handleApprove = () =>
    handleAction(
      () => axiosInstance.patch(`/admin/messages/hope/${detail.id}/approve`),
      "승인 처리하시겠습니까?",
    );

  const handleConvertToLife = () =>
    handleAction(async () => {
      const res = await axiosInstance.post(
        `/admin/messages/hope/${detail.id}/convert-to-life-message`,
      );
      alert(`생명메시지(ID: ${res.data?.lifeMessageId})로 변환되었습니다.`);
    }, "생명메시지로 변환하시겠습니까?\n기존 희망메시지는 비활성화됩니다.");

  // ✅ 상태별 버튼 비활성화 판단
  const isDeleted = detail?.status === "DEACTIVATED";
  const isApproved = detail?.status === "ACTIVATED";
  const isRejected = detail?.status === "DISMISSED";
  const isLifeChanged = detail?.status === "LIFE_CHANGED";

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 2, minWidth: 650, maxWidth: 800 }}>
        {loading && (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress size={24} />
            <Typography sx={{ mt: 1 }}>불러오는 중…</Typography>
          </Stack>
        )}

        {error && <Typography color="error">상세 조회 실패</Typography>}

        {detail && (
          <>
            {/* 📁 파일 정보 — mediaFiles */}
            <Stack spacing={1} sx={{ mb: 2 }}>
              {detail.mediaFiles?.map((f) => (
                <Stack
                  key={f.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Typography sx={{ minWidth: 60 }}>{f.kind}</Typography>

                  <Typography
                    sx={{ color: "#1976d2", cursor: "pointer" }}
                    onClick={() => window.open(f.storageUrl)}
                  >
                    {f.originalFilename}
                  </Typography>

                  <Typography>
                    {f.size ? (f.size / 1024).toFixed(1) + " KB" : "-"}
                  </Typography>

                  {f.kind === "AUDIO" && (
                    <Typography>
                      {Math.round((f.durationMillis ?? 0) / 1000)}초
                    </Typography>
                  )}
                </Stack>
              ))}
            </Stack>

            {/* 📄 메타 정보 */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography>
                등록일시: {formatDateTime(detail.createdAt)}
              </Typography>
              <Typography>
                등록자:{" "}
                <span style={{ color: "#1976d2" }}>
                  {detail.authorName ?? "-"}
                </span>
              </Typography>
              <Chip
                label={detail.statusDisplayName ?? detail.status ?? "-"}
                size="small"
                color={
                  detail.status === "ACTIVATED"
                    ? "success"
                    : detail.status === "DISMISSED"
                      ? "error"
                      : "default"
                }
              />
            </Stack>

            {/* 📊 통계 */}
            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                👍 {detail.likeCount ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                💬 {detail.commentCount ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                👁 {detail.viewCount ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🚨 {detail.reportCount ?? 0}
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* 📝 제목 / 내용 */}
            <Box sx={{ my: 2 }}>
              <Typography sx={{ mb: 0.5 }}>제목</Typography>
              <TextField
                fullWidth
                size="small"
                value={title}
                disabled
                sx={{ mb: 1 }}
              />

              <Typography sx={{ mb: 0.5 }}>내용</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={content}
                disabled
              />
            </Box>

            {/* 💬 댓글 목록 */}
            {detail.comments?.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  댓글 ({detail.comments.length})
                </Typography>
                <Stack spacing={1}>
                  {detail.comments.map((c) => (
                    <Box
                      key={c.id}
                      sx={{
                        p: 1,
                        border: "1px solid #eee",
                        borderRadius: 1,
                        fontSize: 12,
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
                          {c.authorName}
                        </Typography>
                        <Typography color="text.secondary" fontSize={11}>
                          {formatDateTime(c.createdAt)}
                        </Typography>
                        <Typography color="text.secondary" fontSize={11}>
                          👍{c.likeCount ?? 0} 🚨{c.reportCount ?? 0}
                        </Typography>
                      </Stack>
                      <Typography fontSize={12} sx={{ mt: 0.5 }}>
                        {c.content}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* 🔘 액션 버튼 */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="error"
                disabled={actionLoading || isDeleted || isLifeChanged}
                onClick={handleDelete}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#c0392b" }}
                disabled={
                  actionLoading ||
                  isApproved ||
                  isRejected ||
                  isDeleted ||
                  isLifeChanged
                }
                onClick={handleReject}
              >
                거절
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#27ae60" }}
                disabled={
                  actionLoading ||
                  isApproved ||
                  isRejected ||
                  isDeleted ||
                  isLifeChanged
                }
                onClick={handleApprove}
              >
                승인
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={actionLoading || !isApproved || isLifeChanged}
                onClick={handleConvertToLife}
              >
                생명메시지 변환
              </Button>
              <Button variant="outlined" onClick={onClose}>
                닫기
              </Button>
              {actionLoading && <CircularProgress size={18} />}
            </Stack>
          </>
        )}
      </Box>
    </Popover>
  );
};

export default HopeMessageDetail;
