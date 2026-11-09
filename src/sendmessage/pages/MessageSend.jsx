// MessageSend.jsx
import { useState, useMemo } from "react";
import {
  Box, Stack, Paper, Button, Typography, Divider, Snackbar, Alert,
} from "@mui/material";
import MessageInputForm from "../components/MessageInputForm";
import SelectGroup from "../components/SelectGroup";
import SelectTarget from "../components/SelectTarget";
import { sendAdminNotification, mapAudience } from "../../api/sendNotification";

export default function MessageSend() {
  // 메시지 본문/첨부/링크
  const [message, setMessage] = useState({
    title: "",          // 필요 없으면 제거
    body: "",
    links: [],
    files: [],          // File[] (이미지/음성/영상)
    audioBlobs: [],     // 녹음 blob (선택)
  });

  // 그룹(조건) 선택
  const [filters, setFilters] = useState({
    audience: "dreamin",        // dreamin | happin | both 등
    ageType: "man",             // 만나이/연나이
    ageRange: [7, 18],
    religion: [],               // ["기독교","불교",...]
    grade: [],                  // ["초등","중등","고등","20대",...]
    happinType1: [],            // 일반/또래/오피니언/그룹
    happinType2: [],            // 세부 분류 (별표1)
    counselorType1: [],         // 카운셀러 분류 1
    happinCounselorType2: [],   // 카운셀러 분류 2
    groupSend: false,
    school: null,
    schedule: { enabled: false, at: null }, // 예약발송
    combine: "union", // union(합집합) | intersect(교집합)
  });

  // 개별 대상 선택(아이디 목록)
  const [selectedIndividuals, setSelectedIndividuals] = useState([]); // ['userId1','userId2', ...]

  const [toast, setToast] = useState({ open: false, msg: "", severity: "success" });
  const [sending, setSending] = useState(false);

  const payload = useMemo(() => ({
    message,
    filters,
    targets: selectedIndividuals,
  }), [message, filters, selectedIndividuals]);

  const handleSend = async () => {
    // 알림(텍스트) 발송 검증 — 본문 필수
    if (!message.body?.trim()) {
      setToast({ open: true, msg: "알림 본문을 입력해 주세요.", severity: "warning" });
      return;
    }
    if (filters.schedule.enabled && !filters.schedule.at) {
      setToast({ open: true, msg: "예약 발송 시간을 선택해 주세요.", severity: "warning" });
      return;
    }
    // 현재 알림 발송은 제목/본문 텍스트 + 대상(전체/드림인/해피인/개별)만 지원.
    // 첨부/예약발송은 추후 지원 예정 — 첨부가 있으면 안내만 하고 텍스트로 발송.
    if (
      (message.files?.length || 0) > 0 ||
      (message.audioBlobs?.length || 0) > 0 ||
      filters.schedule?.enabled
    ) {
      setToast({
        open: true,
        msg: "첨부/예약발송은 아직 지원되지 않아 텍스트 알림만 발송됩니다.",
        severity: "info",
      });
    }

    setSending(true);
    try {
      const res = await sendAdminNotification({
        title: message.title,
        body: message.body,
        audience:
          selectedIndividuals.length > 0 ? undefined : mapAudience(filters.audience),
        userIds: selectedIndividuals,
      });
      setToast({
        open: true,
        msg: `알림 발송 완료 — 대상 ${res.targetCount}명, 푸시 ${res.pushSent}건`,
        severity: "success",
      });
    } catch (e) {
      setToast({
        open: true,
        msg: `발송 실패: ${e?.response?.data?.message || e.message || "알 수 없는 오류"}`,
        severity: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">메시지 발송</Typography>

      <Paper variant="outlined">
        <Box p={2}>
          <MessageInputForm value={message} onChange={setMessage} />
        </Box>
      </Paper>

      <Paper variant="outlined">
        <Box p={2}>
          <SelectGroup value={filters} onChange={setFilters} />
        </Box>
      </Paper>

      <Paper variant="outlined">
        <Box p={2}>
          <SelectTarget
            value={selectedIndividuals}
            onChange={setSelectedIndividuals}
            // 조건이 바뀔 때 서버에 대상 미리보기 요청할 수 있도록 전달
            filters={filters}
          />
        </Box>
      </Paper>

      <Divider />

      <Stack direction="row" justifyContent="flex-end" spacing={1}>
        <Button variant="outlined" onClick={() => console.log(payload)}>
          미리보기(콘솔)
        </Button>
        <Button variant="contained" onClick={handleSend} disabled={sending}>
          {sending ? "발송 중…" : filters.schedule.enabled ? "예약 발송" : "즉시 발송"}
        </Button>
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} variant="filled">{toast.msg}</Alert>
      </Snackbar>
    </Stack>
  );
}
