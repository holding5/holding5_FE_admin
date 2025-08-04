import { Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import LifeMessageGuide from "./LifeMessageGuide";
import TopicSelector from "./TopicSelector";
import ReligionSelector from "./ReligionSelector";
import MessageInput from "./MessageInput";
import FileInput from "./FileInput";

const topicOptions = [
  "공통", "가입환영인사", "생일축하",
  "시험격려(1학기 중간고사)", "시험격려(1학기 기말고사)", "시험격려(2학기 중간고사)", "시험격려(2학기 기말고사)", "시험격려(수능)"
];

const religionOptions = [
  "모두에게(전체)", "기독교", "불교","천주교", "무교", "기타"
];

const defaultMessages = [
  "안녕하세요? 기본 안내 멘트 1 ...",
  "기본 안내 멘트 2 ...",
  "기본 안내 멘트 3 ..."
];

const CongratulatoryMessageInputForm = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedReligions, setSelectedReligions] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleReligionChange = (religion) => {
    setSelectedReligions((prev) =>
      prev.includes(religion) ? prev.filter((r) => r !== religion) : [...prev, religion]
    );
  };

  const handleAddDefaultMessage = (msg) => {
    setMessage((prev) => `${prev}\n${msg}`);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const payload = {
      topics: selectedTopics,
      religions: selectedReligions,
      message,
      file,
    };
    console.log("보낼 데이터:", payload);
    // API 연동 추가 예정
  };

  return (
    <Box sx={{ p: 4 }}>
      <LifeMessageGuide />
      <TopicSelector
        topics={topicOptions}
        selectedTopics={selectedTopics}
        onChange={handleTopicChange}
      />
      <ReligionSelector
        religions={religionOptions}
        selectedReligions={selectedReligions}
        onChange={handleReligionChange}
      />
      <MessageInput
        value={message}
        onChange={setMessage}
        defaultMessages={defaultMessages}
        onAddDefaultMessage={handleAddDefaultMessage}
      />
      <FileInput onFileChange={handleFileChange} />

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          저장
        </Button>
        <Button variant="outlined" color="secondary">
          취소
        </Button>
      </Stack>
    </Box>
  );
};

export default CongratulatoryMessageInputForm;
