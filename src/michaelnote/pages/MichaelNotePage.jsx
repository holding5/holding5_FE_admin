import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Pagination,
  CircularProgress,
  Chip,
  Popover,
  Stack,
  Divider,
  Skeleton,
} from "@mui/material";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import {
  useMichaelNoteList,
  useMichaelNoteDetail,
} from "../hooks/useMichaelNote";
import { formatDateTime } from "../../utils/formatDate";

// ── 상태 색상 ──────────────────────────────────────────────────────────────
const STATUS_COLOR = {
  ACTIVATED: "#1976d2",
  DEACTIVATED: "#757575",
  SUSPENDED: "#e67e22",
};
const STATUS_LABEL = {
  ACTIVATED: "활성",
  DEACTIVATED: "삭제",
  SUSPENDED: "정지",
};

// ── 상세 팝오버 ────────────────────────────────────────────────────────────
function NoteDetailPopover({ anchorEl, noteId, onClose }) {
  const open = Boolean(anchorEl);
  const { detail, loading, error } = useMichaelNoteDetail(noteId, open);

  const Field = ({ label, value }) =>
    value ? (
      <Box sx={{ mb: 1 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {value}
        </Typography>
      </Box>
    ) : null;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      PaperProps={{ sx: { maxWidth: 520, width: "100%" } }}
    >
      <Box sx={{ p: 2.5 }}>
        {loading && (
          <Stack spacing={1}>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="text" />
            ))}
          </Stack>
        )}

        {error && (
          <Typography color="error" variant="body2">
            상세 조회 실패
          </Typography>
        )}

        {detail && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                미카엘 노트 #{detail.id}
              </Typography>
              <Chip
                label={STATUS_LABEL[detail.status] ?? detail.status}
                size="small"
                sx={{
                  color: STATUS_COLOR[detail.status] ?? "inherit",
                  borderColor: STATUS_COLOR[detail.status] ?? "inherit",
                  fontWeight: 600,
                }}
                variant="outlined"
              />
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* 6하원칙 필드 */}
            <Field label="📅 언제였죠?" value={detail.happenedAt} />
            <Field label="📍 어디서였죠?" value={detail.location} />
            <Field label="👤 누가 그랬죠?" value={detail.perpetrator} />
            <Field label="❓ 무엇을요?" value={detail.action} />
            <Field label="🔧 어떻게 했나요?" value={detail.method} />
            <Field label="💬 왜죠?" value={detail.reason} />

            <Divider sx={{ my: 1.5 }} />

            <Field label="나의 반응" value={detail.myReaction} />
            <Field label="목격자 유무" value={detail.hasWitness} />
            <Field label="증거 기록" value={detail.evidenceRecord} />

            {/* 사진 */}
            {detail.images?.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 0.5 }}
                >
                  첨부 사진 ({detail.images.length}장)
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {detail.images.map((img) => (
                    <Box
                      key={img.id}
                      component="img"
                      src={img.url}
                      alt="첨부사진"
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 1,
                        border: "1px solid #eee",
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* 음성 */}
            {detail.voice && (
              <Box sx={{ mt: 1.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 0.5 }}
                >
                  첨부 음성
                </Typography>
                <audio
                  controls
                  src={detail.voice.url}
                  style={{ width: "100%" }}
                />
              </Box>
            )}

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="outlined" size="small" onClick={onClose}>
                닫기
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Popover>
  );
}

// ── 메인 페이지 ────────────────────────────────────────────────────────────
export default function MichaelNotePage() {
  const {
    rows,
    totalPages,
    totalElements,
    page,
    setPage,
    loading,
    error,
    searched,
    search,
  } = useMichaelNoteList();

  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleSearch = () => {
    if (input.trim()) search(input.trim());
  };

  const handleRowClick = (e, noteId) => {
    setAnchorEl(e.currentTarget);
    setSelectedNoteId(noteId);
  };

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 1, p: 2 }}>
        {/* 검색바 */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              placeholder="드림인 닉네임 또는 이름으로 검색"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: input && (
                  <InputAdornment position="end">
                    <Clear
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setInput("")}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, maxWidth: 400 }}
            />
            <Button variant="contained" size="small" onClick={handleSearch}>
              검색
            </Button>
            {loading && <CircularProgress size={20} />}
          </Stack>
        </Paper>

        {/* 결과 테이블 */}
        <Paper>
          {searched && (
            <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                총 {totalElements.toLocaleString()}건
              </Typography>
            </Box>
          )}

          {error && (
            <Box sx={{ px: 2, py: 1, color: "error.main", fontSize: 12 }}>
              조회 실패: {error?.message ?? "알 수 없는 오류"}
            </Box>
          )}

          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  {[
                    "번호",
                    "언제였죠?",
                    "어디서였죠?",
                    "누가 그랬죠?",
                    "상태",
                    "작성일시",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      align="center"
                      sx={{
                        color: "#fff",
                        fontSize: 12,
                        border: "1px solid #ccc",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!searched ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ py: 6, color: "text.secondary", fontSize: 13 }}
                    >
                      드림인 이름을 검색해 미카엘 노트를 조회하세요.
                    </TableCell>
                  </TableRow>
                ) : rows.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      sx={{ py: 6, color: "text.secondary", fontSize: 13 }}
                    >
                      해당 드림인의 미카엘 노트가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row, idx) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={(e) => handleRowClick(e, row.id)}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 12,
                          border: "1px solid #eee",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {(page - 1) * 20 + idx + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 12,
                          border: "1px solid #eee",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {row.happenedAt ?? "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 12,
                          border: "1px solid #eee",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {row.location ?? "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 12,
                          border: "1px solid #eee",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {row.perpetrator ?? "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: 12, border: "1px solid #eee" }}
                      >
                        <Chip
                          label={STATUS_LABEL[row.status] ?? row.status}
                          size="small"
                          sx={{
                            color: STATUS_COLOR[row.status] ?? "inherit",
                            borderColor: STATUS_COLOR[row.status] ?? "inherit",
                            fontSize: 11,
                          }}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: 12,
                          border: "1px solid #eee",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDateTime(row.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {searched && totalPages > 1 && (
            <Pagination
              sx={{ display: "flex", justifyContent: "center", my: 2 }}
              showFirstButton
              showLastButton
              count={totalPages}
              page={page}
              onChange={(_, v) => setPage(v)}
              variant="outlined"
              shape="rounded"
            />
          )}
        </Paper>

        {/* 상세 팝오버 */}
        <NoteDetailPopover
          anchorEl={anchorEl}
          noteId={selectedNoteId}
          onClose={() => {
            setAnchorEl(null);
            setSelectedNoteId(null);
          }}
        />
      </Box>
    </Box>
  );
}
