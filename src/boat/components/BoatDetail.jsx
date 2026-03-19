import {
  Popover,
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { useBoatDetail } from "../hooks/useBoats";
import { formatDateTime } from "../../utils/formatDate";

const GOAL_TYPE_LABEL = {
  SUPPORT_COUNT: "응원수",
  DATE: "거리",
  MIXED: "혼합",
};

const STATUS_COLOR = {
  진행중: "#1976d2",
  완료: "#27ae60",
  조기중단: "#e74c3c",
  삭제: "#757575",
  비활성: "#e67e22",
};

const BoatDetail = ({ anchorEl, onClose, row }) => {
  const open = Boolean(anchorEl);
  const { detail, loading, error } = useBoatDetail(row?.id, open);
  const [showAllJourneys, setShowAllJourneys] = useState(false);

  const displayedJourneys = detail?.journeys
    ? showAllJourneys
      ? detail.journeys
      : detail.journeys.slice(0, 3)
    : [];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 2, minWidth: 550, maxWidth: 700 }}>
        {loading && (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress size={24} />
            <Typography sx={{ mt: 1 }}>불러오는 중…</Typography>
          </Stack>
        )}

        {error && <Typography color="error">상세 조회 실패</Typography>}

        {detail && (
          <>
            {/* 기본 정보 */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Chip
                label={detail.statusLabel}
                size="small"
                sx={{
                  color: STATUS_COLOR[detail.statusLabel] ?? "inherit",
                  borderColor: STATUS_COLOR[detail.statusLabel] ?? "inherit",
                  fontWeight: 600,
                }}
                variant="outlined"
              />
              <Typography variant="body2" color="text.secondary">
                등록일시: {formatDateTime(detail.createdAt)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                작성자:{" "}
                <span style={{ color: "#1976d2" }}>
                  {detail.authorName ?? "-"}
                </span>
              </Typography>
            </Stack>

            <Typography sx={{ mb: 2, fontSize: 14 }}>
              {detail.content}
            </Typography>

            <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
              <Typography variant="body2">
                목표: {GOAL_TYPE_LABEL[detail.goalType] ?? "-"}
              </Typography>
              <Typography variant="body2">
                목표응원수: {detail.targetSupportCount}
              </Typography>
              <Typography variant="body2">
                현재응원수: {detail.currentSupportCount}
              </Typography>
              <Typography variant="body2">
                전달수: {detail.relayCount}
              </Typography>
              {detail.targetDate && (
                <Typography variant="body2">
                  목표날짜: {formatDateTime(detail.targetDate)}
                </Typography>
              )}
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            {/* 여정 목록 */}
            <Typography sx={{ fontWeight: 700, mb: 1, fontSize: 13 }}>
              여정 ({detail.journeys?.length ?? 0}건)
            </Typography>

            {detail.journeys?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                여정 없음
              </Typography>
            ) : (
              <>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        #
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        수신자
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        수신일시
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        응원여부
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        만료여부
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedJourneys.map((j, idx) => (
                      <TableRow key={j.id}>
                        <TableCell align="center" sx={{ fontSize: 12 }}>
                          {idx + 1}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 12 }}>
                          {j.receiverNickname}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 12 }}>
                          {formatDateTime(j.receivedAt)}
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 12 }}>
                          <Chip
                            label={j.responded ? "응원" : "미응원"}
                            size="small"
                            color={j.responded ? "success" : "default"}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 12 }}>
                          <Chip
                            label={j.expired ? "만료" : "유효"}
                            size="small"
                            color={j.expired ? "error" : "default"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {detail.journeys.length > 3 && (
                  <Button
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => setShowAllJourneys((v) => !v)}
                  >
                    {showAllJourneys
                      ? "접기"
                      : `전체보기 (${detail.journeys.length}건)`}
                  </Button>
                )}
              </>
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
};

export default BoatDetail;
