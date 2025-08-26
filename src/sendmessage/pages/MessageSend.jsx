// MessageSend.jsx
import { useState, useMemo } from "react";
import {
  Box, Stack, Paper, Button, Typography, Divider, Snackbar, Alert,
} from "@mui/material";
import MessageInputForm from "../components/MessageInputForm";
import SelectGroup from "../components/SelectGroup";
import SelectTarget from "../components/SelectTarget";

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

  const payload = useMemo(() => ({
    message,
    filters,
    targets: selectedIndividuals,
  }), [message, filters, selectedIndividuals]);

  const handleSend = async () => {
    // 간단 검증
    if (!message.body?.trim() && message.files.length === 0 && message.audioBlobs.length === 0) {
      setToast({ open: true, msg: "메시지 내용 또는 첨부를 입력해 주세요.", severity: "warning" });
      return;
    }
    if (filters.schedule.enabled && !filters.schedule.at) {
      setToast({ open: true, msg: "예약 발송 시간을 선택해 주세요.", severity: "warning" });
      return;
    }
    // TODO: API 연동
    console.log("Submit payload:", payload);
    setToast({ open: true, msg: "발송 요청을 처리했습니다.", severity: "success" });
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
        <Button variant="contained" onClick={handleSend}>
          {filters.schedule.enabled ? "예약 발송" : "즉시 발송"}
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
