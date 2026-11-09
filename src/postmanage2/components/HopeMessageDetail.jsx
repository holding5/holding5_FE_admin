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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

// 생명메시지 변환 시 지정하는 주제(카테고리)·종교. 생명메시지는 이 값으로 수신자를 매칭한다.
// 값 ""(공통)은 body 에서 제외 → 백엔드에서 전체 대상으로 저장.
const LIFE_CATEGORIES = [
  { value: "", label: "공통(전체)" },
  { value: "LIGHT_STORY", label: "가벼운 이야기" },
  { value: "BULLYING", label: "왕따/학교폭력" },
  { value: "ACADEMIC", label: "성적/학업문제" },
  { value: "FRIENDS", label: "친구/이성문제" },
  { value: "PARENTS", label: "부모님과 갈등" },
  { value: "TEACHERS", label: "선생님과 갈등" },
  { value: "ECONOMY", label: "가정형편/경제" },
  { value: "APPEARANCE", label: "외모 문제" },
  { value: "ETC", label: "기타문제" },
];
const RELIGIONS = [
  { value: "", label: "무관(전체)" },
  { value: "CHRISTIAN", label: "기독교" },
  { value: "BUDDHIST", label: "불교" },
  { value: "CATHOLIC", label: "천주교" },
  { value: "NONE", label: "무교" },
];
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

  // 생명메시지 변환 다이얼로그(주제/종교 선택)
  const [convertOpen, setConvertOpen] = useState(false);
  const [convertCategory, setConvertCategory] = useState("");
  const [convertReligion, setConvertReligion] = useState("");

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

  // 변환 버튼 → 주제/종교 선택 다이얼로그 열기
  const openConvertDialog = () => {
    setConvertCategory("");
    setConvertReligion("");
    setConvertOpen(true);
  };

  // 다이얼로그 확정 → 선택한 주제/종교를 body 로 전달해 변환
  const doConvertToLife = async () => {
    setConvertOpen(false);
    await handleAction(async () => {
      const body = {};
      if (convertCategory) body.category = convertCategory;
      if (convertReligion) body.religion = convertReligion;
      const res = await axiosInstance.post(
        `/admin/messages/hope/${detail.id}/convert-to-life-message`,
        body,
      );
      alert(`생명메시지(ID: ${res.data?.lifeMessageId})로 변환되었습니다.`);
    });
  };

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
                onClick={openConvertDialog}
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

      {/* 생명메시지 변환 — 주제(카테고리)/종교 선택 다이얼로그 */}
      <Dialog open={convertOpen} onClose={() => setConvertOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>생명메시지로 변환</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            생명메시지는 선택한 주제·종교로 수신자를 매칭합니다. 지정하지 않으면 전체 대상으로
            저장됩니다. (기존 희망메시지는 비활성화됩니다.)
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="convert-category-label">주제(카테고리)</InputLabel>
            <Select
              labelId="convert-category-label"
              label="주제(카테고리)"
              value={convertCategory}
              onChange={(e) => setConvertCategory(e.target.value)}
            >
              {LIFE_CATEGORIES.map((c) => (
                <MenuItem key={c.value || "none"} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="convert-religion-label">종교</InputLabel>
            <Select
              labelId="convert-religion-label"
              label="종교"
              value={convertReligion}
              onChange={(e) => setConvertReligion(e.target.value)}
            >
              {RELIGIONS.map((r) => (
                <MenuItem key={r.value || "none"} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConvertOpen(false)}>취소</Button>
          <Button variant="contained" color="secondary" onClick={doConvertToLife}>
            변환
          </Button>
        </DialogActions>
      </Dialog>
    </Popover>
  );
};

export default HopeMessageDetail;
