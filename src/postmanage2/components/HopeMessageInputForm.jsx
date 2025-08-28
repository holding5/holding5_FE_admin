import { useState } from "react";
import { Box } from "@mui/material";

import InputMentNotice from "../components/InputMentNotice";
import SearchHappyUserBox from "../components/SearchHappyUserBox";
import CategorySelector from "../components/CategorySelector";
import ReligionSelector from "../components/ReligionSelector";
import MessageEditor from "../components/MessageEditor";
import FileUploadBox from "../components/FileUploadBox";
import InputActions from "../components/InputActions";

const HopeMessageInputForm = () => {
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedReligions, setSelectedReligions] = useState([]);

  const [audioFile, setAudioFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSubmit = () => {
    // TODO: 유효성 검사 및 등록 처리
    const payload = {
      message,
      categories: selectedCategories,
      religions: selectedReligions,
      audioFile,
      thumbnailFile,
      youtubeUrl,
    };
    console.log("등록 요청:", payload);
  };

  return (
    <Box component="form" sx={{ px: 3, py: 2 }}>
      <SearchHappyUserBox />
      <InputMentNotice />
      <CategorySelector selected={selectedCategories} onChange={setSelectedCategories} />
      <ReligionSelector selectedReligions={selectedReligions} onChange={setSelectedReligions} />
      <MessageEditor message={message} setMessage={setMessage} />
      <FileUploadBox
        audioFile={audioFile}
        setAudioFile={setAudioFile}
        thumbnail={thumbnailFile}
        setThumbnail={setThumbnailFile}
        youtubeUrl={youtubeUrl}
        setYoutubeUrl={setYoutubeUrl}
      />
      <InputActions onSubmit={handleSubmit} />
    </Box>
  );
};

export default HopeMessageInputForm;
