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
} from "@mui/material";

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
      setTitle("");
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
