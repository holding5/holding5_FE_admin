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
import { useEffect, useMemo, useState } from "react";
import { useLifeMessageDetail } from "../hooks/useLifeMessages";
import axiosInstance from "../../utils/axiosInstance";
import { formatDateTime } from "../../utils/formatDate";

function formatBytes(bytes) {
  const b = Number(bytes);
  if (!Number.isFinite(b) || b <= 0) return "-";
  if (b < 1024) return `${b} B`;
  const kb = b / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

const LifeMessageDetail = ({ anchorEl, onClose, row, onActionDone }) => {
  const open = Boolean(anchorEl);

  // ✅ 상세 API 호출
  const { detail, loading, error } = useLifeMessageDetail(row?.id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ 상세 데이터 도착 시 세팅
  useEffect(() => {
    if (detail) {
      setTitle(detail.title ?? "");
      setContent(detail.content ?? "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [detail]);

  // ✅ 대표 파일(첫 번째) 요약 표시용 — mediaFiles
  const primaryFile = useMemo(() => {
    const files = detail?.mediaFiles ?? [];
    return files.length > 0 ? files[0] : null;
  }, [detail]);

  // ── 관리 액션 공통 핸들러 ──
  const handleAction = async (actionFn, confirmMsg) => {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    setActionLoading(true);
    try {
      await actionFn();
      onActionDone?.();
      onClose();
    } catch (e) {
      alert(e?.response?.data?.message ?? e?.message ?? "처리 실패");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = () =>
    handleAction(
      () => axiosInstance.delete(`/admin/messages/life/${detail.id}`),
      "정말 삭제하시겠습니까?",
    );

  const handleReject = () =>
    handleAction(
      () => axiosInstance.patch(`/admin/messages/life/${detail.id}/reject`),
      "거절 처리하시겠습니까?",
    );

  const handleApprove = () =>
    handleAction(
      () => axiosInstance.patch(`/admin/messages/life/${detail.id}/approve`),
      "승인 처리하시겠습니까?",
    );

  // ✅ 상태별 버튼 비활성화 판단
  const isDeleted = detail?.status === "DEACTIVATED";
  const isApproved = detail?.status === "ACTIVATED";
  const isRejected = detail?.status === "DISMISSED";

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

        {error && (
          <Typography color="error" fontSize={12}>
            상세 조회 실패: {error?.message ?? "unknown error"}
          </Typography>
        )}

        {!loading && !error && detail && (
          <>
            {/* 메타 정보 */}
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
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography>
                상태:{" "}
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
              </Typography>
              <Typography>
                종류: <b>{detail.messageType ?? "-"}</b>
              </Typography>
              {detail.updatedAt && (
                <Typography>
                  심사일시: {formatDateTime(detail.updatedAt)}
                </Typography>
              )}
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

            {/* 파일 목록 — mediaFiles */}
            {Array.isArray(detail.mediaFiles) &&
              detail.mediaFiles.length > 0 && (
                <Box
                  sx={{
                    mb: 2,
                    p: 1,
                    border: "1px solid #eee",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    fontSize={12}
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    첨부파일
                  </Typography>

                  <Stack spacing={1}>
                    {detail.mediaFiles.map((f) => (
                      <Stack
                        key={f.id}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ fontSize: 12 }}
                      >
                        <Typography sx={{ minWidth: 60 }}>{f.kind}</Typography>

                        <Typography
                          sx={{ color: "#1976d2", cursor: "pointer" }}
                          onClick={() => window.open(f.storageUrl)}
                          title={f.storageUrl}
                        >
                          {f.originalFilename}
                        </Typography>

                        <Typography sx={{ color: "text.secondary" }}>
                          {formatBytes(f.size)}
                        </Typography>

                        {f.kind === "AUDIO" && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {Math.round((f.durationMillis ?? 0) / 1000)}초
                          </Typography>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

            {/* 제목 / 내용 */}
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
                disabled={actionLoading || isDeleted}
                onClick={handleDelete}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#c0392b" }}
                disabled={
                  actionLoading || isApproved || isRejected || isDeleted
                }
                onClick={handleReject}
              >
                거절
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#27ae60" }}
                disabled={
                  actionLoading || isApproved || isRejected || isDeleted
                }
                onClick={handleApprove}
              >
                승인
              </Button>
              <Button variant="outlined" onClick={onClose}>
                닫기
              </Button>
              {actionLoading && <CircularProgress size={18} />}
            </Stack>
          </>
        )}

        {/* row는 있는데 detail이 아직 없을 때(초기) */}
        {!loading && !error && open && row && !detail && (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <Typography fontSize={12} color="text.secondary">
              상세 정보를 불러올 수 없습니다.
            </Typography>
          </Stack>
        )}
      </Box>
    </Popover>
  );
};

export default LifeMessageDetail;
