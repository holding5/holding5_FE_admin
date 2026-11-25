import { useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Alert,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";

// 기획서 [주제정책]·[종교정책]: 같은 주제(또는 공통)·같은 종교(또는 상관없음) 학생에게 전달. "" = 공통/상관없음
const TOPICS = [["", "공통"], ["BULLYING", "왕따, 학교폭력"], ["ACADEMIC", "성적, 학업문제"], ["FRIENDS", "친구, 이성문제"],
  ["PARENTS", "부모님과 갈등"], ["TEACHERS", "선생님과 갈등"], ["ECONOMY", "가정형편, 경제"], ["APPEARANCE", "외모문제"], ["ETC", "기타문제"]];
const RELIGIONS = [["", "상관없음"], ["CHRISTIAN", "기독교"], ["BUDDHIST", "불교"], ["CATHOLIC", "천주교"]];

import InputMentNotice from "../components/InputMentNotice";
import MessageEditor from "../components/MessageEditor";
import FileUploadBox from "../components/FileUploadBox";
import InputActions from "../components/InputActions";
import SearchHappyUserBox from "../components/SearchHappyUserBox";
import { useLifeMessageCreate } from "../hooks/useLifeMessages";

const LifeMessageInputForm = ({ onSuccess }) => {
  // ✅ 해피인 선택
  const [selectedHappyin, setSelectedHappyin] = useState(null);

  // ✅ TEXT / VOICE (프론트 UI 전용 — 서버에는 보내지 않음)
  const [messageType, setMessageType] = useState("TEXT");

  // ✅ title/content
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [religion, setReligion] = useState("");
  const [content, setContent] = useState("");

  // ✅ 현재 File 선택 상태(업로드 전)
  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // ✅ 업로드 완료 후 서버에서 받은 메타 정보 (storageUrl 포함)
  const [audioMeta, setAudioMeta] = useState(null);
  const [thumbMeta, setThumbMeta] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { createLifeMessage, loading, error, reset } = useLifeMessageCreate();

  const isVoice = messageType === "VOICE";

  const canSubmit = useMemo(() => {
    if (!selectedHappyin) return false;
    if (!title.trim()) return false;
    if (!isVoice && !content.trim()) return false;

    // VOICE는 storageUrl 기반 AUDIO 파일 메타가 있어야 등록 가능
    if (isVoice) {
      return !!audioMeta?.storageUrl;
    }

    return true;
  }, [selectedHappyin, title, content, isVoice, audioMeta]);

  const handleChangeType = (_, next) => {
    if (!next) return;

    setMessageType(next);
    setErrorMsg("");
    setSuccessMsg("");
    reset?.();

    if (next === "TEXT") {
      setAudioFile(null);
      setThumbnailFile(null);
      setAudioMeta(null);
      setThumbMeta(null);
    }
  };

  /**
   * 백엔드 LifeMessageCreateReqDto:
   *   { happyinUserId, title, content, mediaFiles[] }
   *
   * messageType 필드는 없음 — mediaFiles에 AUDIO가 있으면 음성, 없으면 문자
   */
  const buildPayload = () => {
    const payload = {
      happyinUserId: selectedHappyin.userId,
      title: title.trim(),
      content: content ?? "",
      mediaFiles: [],
      category: category || null,
      religion: religion || null,
    };

    if (isVoice) {
      if (audioMeta?.storageUrl) {
        payload.mediaFiles.push({
          originalFilename:
            audioMeta.originalFilename ?? audioFile?.name ?? "audio",
          mediaType: audioMeta.mediaType ?? "audio/mpeg",
          storageUrl: audioMeta.storageUrl,
          size: audioMeta.size ?? 0,
          durationMillis: audioMeta.durationMillis ?? 0,
          thumbnailUrl: audioMeta.thumbnailUrl ?? null,
          sortOrder: 0,
        });
      }

      if (thumbMeta?.storageUrl) {
        payload.mediaFiles.push({
          originalFilename:
            thumbMeta.originalFilename ?? thumbnailFile?.name ?? "thumbnail",
          mediaType: thumbMeta.mediaType ?? "image/png",
          storageUrl: thumbMeta.storageUrl,
          size: thumbMeta.size ?? 0,
          durationMillis: 0,
          thumbnailUrl: thumbMeta.thumbnailUrl ?? null,
          sortOrder: 1,
        });
      }
    }

    return payload;
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    // 프론트 유효성
    if (!selectedHappyin) {
      setErrorMsg("해피인을 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      setErrorMsg("제목은 필수입니다.");
      return;
    }
    if (!isVoice && !content.trim()) {
      setErrorMsg("문자 메시지는 내용이 필수입니다.");
      return;
    }

    if (isVoice && !audioMeta?.storageUrl) {
      setErrorMsg("음성 파일을 선택하고 업로드가 완료될 때까지 기다려주세요.");
      return;
    }

    const payload = buildPayload();

    try {
      await createLifeMessage(payload);

      setSuccessMsg("생명메시지가 등록되었습니다.");

      // ✅ 폼 초기화
      setSelectedHappyin(null);
      setTitle(""); setCategory(""); setReligion("");
      setContent("");
      setAudioFile(null);
      setThumbnailFile(null);
      setAudioMeta(null);
      setThumbMeta(null);

      onSuccess?.();
    } catch (e) {
      setErrorMsg(e?.response?.data?.message ?? e?.message ?? "등록 실패");
    }
  };

  return (
    <Box component="form" sx={{ px: 3, py: 2 }}>
      <InputMentNotice />

      {/* ✅ 해피인 검색/선택 */}
      <SearchHappyUserBox
        onSelect={setSelectedHappyin}
        selected={selectedHappyin}
        searchEndpoint="/admin/messages/life/happyin-search"
      />

      <Divider sx={{ my: 2 }} />

      {/* 받을 학생: 주제·종교 */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Typography sx={{ minWidth: 90, fontWeight: 700 }}>받을 학생</Typography>
        <TextField select size="small" label="고민 주제" SelectProps={{ displayEmpty: true }} InputLabelProps={{ shrink: true }} value={category} onChange={(e) => setCategory(e.target.value)} sx={{ minWidth: 180 }}>
          {TOPICS.map(([v, l]) => <MenuItem key={l} value={v}>{l}</MenuItem>)}
        </TextField>
        <TextField select size="small" label="종교" SelectProps={{ displayEmpty: true }} InputLabelProps={{ shrink: true }} value={religion} onChange={(e) => setReligion(e.target.value)} sx={{ minWidth: 140 }}>
          {RELIGIONS.map(([v, l]) => <MenuItem key={l} value={v}>{l}</MenuItem>)}
        </TextField>
      </Stack>

      {/* ✅ 메시지 종류 */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Typography sx={{ minWidth: 90, fontWeight: 700 }}>
          메시지 종류
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={messageType}
          onChange={handleChangeType}
          size="small"
        >
          <ToggleButton value="TEXT">문자</ToggleButton>
          <ToggleButton value="VOICE">음성</ToggleButton>
        </ToggleButtonGroup>

        <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
          {isVoice
            ? "음성: 제목/내용 + 음성파일 등록"
            : "문자: 제목/내용만 등록"}
        </Typography>

        {loading && <CircularProgress size={18} />}
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* ✅ 제목/내용 에디터 */}
      <MessageEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />

      {/* ✅ 음성일 때만 파일 영역 — onAudioUploaded / onThumbnailUploaded 연결 */}
      {isVoice && (
        <Box sx={{ mt: 2 }}>
          <FileUploadBox
            audioFile={audioFile}
            setAudioFile={setAudioFile}
            thumbnail={thumbnailFile}
            setThumbnail={setThumbnailFile}
            onAudioUploaded={setAudioMeta}
            onThumbnailUploaded={setThumbMeta}
          />
        </Box>
      )}

      {/* 에러/성공 */}
      {(errorMsg || error) && (
        <Alert severity="error" sx={{ mt: 2, fontSize: 12 }}>
          {errorMsg || error?.message || "등록 실패"}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" sx={{ mt: 2, fontSize: 12 }}>
          {successMsg}
        </Alert>
      )}

      <InputActions onSubmit={handleSubmit} disabled={!canSubmit || loading} />
    </Box>
  );
};

export default LifeMessageInputForm;
