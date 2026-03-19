import { useState, useMemo } from "react";
import { Box, Divider, Alert } from "@mui/material";

import InputMentNotice from "../components/InputMentNotice";
import MessageEditor from "../components/MessageEditor";
import FileUploadBox from "../components/FileUploadBox";
import InputActions from "../components/InputActions";
import SearchHappyUserBox from "../components/SearchHappyUserBox";

import { useHopeMessageCreate } from "../hooks/useHopeMessages";

const HopeMessageInputForm = ({ onSuccess }) => {
  // ✅ 해피인 선택
  const [selectedHappyin, setSelectedHappyin] = useState(null);

  // ✅ title/content
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // ✅ 업로드 완료 후 서버에서 받은 메타 정보
  const [audioMeta, setAudioMeta] = useState(null);
  const [thumbMeta, setThumbMeta] = useState(null);

  const { createHopeMessage, creating } = useHopeMessageCreate();

  const handleSubmit = async () => {
    // ✅ 유효성
    if (!selectedHappyin) return alert("해피인을 선택해주세요.");
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    // ✅ mediaFiles: 실제 업로드된 메타 정보 사용
    const mediaFiles = [];
    let order = 0;

    if (audioMeta?.storageUrl) {
      mediaFiles.push({
        originalFilename:
          audioMeta.originalFilename ?? audioFile?.name ?? "audio",
        mediaType: audioMeta.mediaType ?? "audio/mp4",
        storageUrl: audioMeta.storageUrl,
        size: audioMeta.size ?? 0,
        durationMillis: audioMeta.durationMillis ?? 0,
        thumbnailUrl: null,
        sortOrder: order++,
      });
    }

    if (thumbMeta?.storageUrl) {
      mediaFiles.push({
        originalFilename:
          thumbMeta.originalFilename ?? thumbnailFile?.name ?? "thumbnail",
        mediaType: thumbMeta.mediaType ?? "image/jpeg",
        storageUrl: thumbMeta.storageUrl,
        size: thumbMeta.size ?? 0,
        durationMillis: 0,
        thumbnailUrl: thumbMeta.storageUrl,
        sortOrder: order++,
      });
    }

    const body = {
      happyinUserId: selectedHappyin.userId,
      title,
      content,
      mediaFiles,
    };

    try {
      await createHopeMessage(body);
      alert("등록 완료!");

      // 초기화
      setSelectedHappyin(null);
      setTitle("");
      setContent("");
      setAudioFile(null);
      setThumbnailFile(null);
      setAudioMeta(null);
      setThumbMeta(null);

      onSuccess?.();
    } catch (e) {
      alert(e?.response?.data?.message ?? e?.message ?? "등록 실패! 콘솔 확인");
    }
  };

  return (
    <Box component="form" sx={{ px: 3, py: 2 }}>
      <InputMentNotice />

      {/* ✅ 해피인 검색/선택 */}
      <SearchHappyUserBox
        onSelect={setSelectedHappyin}
        selected={selectedHappyin}
        searchEndpoint="/admin/messages/hope/happyin-search"
      />

      <Divider sx={{ my: 2 }} />

      <MessageEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />

      <FileUploadBox
        audioFile={audioFile}
        setAudioFile={setAudioFile}
        thumbnail={thumbnailFile}
        setThumbnail={setThumbnailFile}
        onAudioUploaded={setAudioMeta}
        onThumbnailUploaded={setThumbMeta}
      />

      {/* 음성 파일 선택했는데 아직 업로드 안 됐으면 안내 */}
      {audioFile && !audioMeta?.storageUrl && (
        <Alert severity="info" sx={{ mb: 1, fontSize: 12 }}>
          음성 파일 업로드 중... 완료 후 등록 버튼을 눌러주세요.
        </Alert>
      )}

      <InputActions onSubmit={handleSubmit} submitting={creating} />
    </Box>
  );
};

export default HopeMessageInputForm;
