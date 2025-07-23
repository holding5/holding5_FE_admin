import {
  Popover,
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
  Stack,
  Select,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const LifeMessageDetail = ({ anchorEl, onClose}) => {
  const open = Boolean(anchorEl);

  // 현재 선택된 라디오 버튼의 값을 관리하는 state
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleApply = () => {
    console.log("선택된 조치:", selectedValue);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2, minWidth: 650, maxWidth: 800 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography>분류: </Typography>
          <Typography>종교: </Typography>
          <IconButton><SkipPreviousIcon /></IconButton>
          <IconButton><SkipNextIcon /></IconButton>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography>파일명: <span style={{ color: '#1976d2', cursor: 'pointer' }}></span></Typography>
          <IconButton><PlayArrowIcon /></IconButton>
          <Typography>파일크기: </Typography>
          <Typography>시간: </Typography>
          <Button variant="outlined" size="small">파일찾기</Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography>등록일시: </Typography>
          <Typography>등록자: <span style={{ color: '#1976d2' }}></span></Typography>
        </Stack>

        <Box sx={{ my: 2 }}>
          <Typography>제목: </Typography>
          <TextField
            fullWidth
            size="small"
            
            sx={{ mb: 1 }}
          />
          <Typography>내용: </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            defaultValue={`잠깐만 내 이야기를 한번 들어 보실래요.\n내 음성파일이 여러분에게 도움이 되었기를 바라며 녹음 했습니다.`}
          />
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#2e3b4e' }}>수정</Button>
          <Button variant="contained" sx={{ backgroundColor: '#d35400' }}>삭제</Button>
          <Button variant="contained" sx={{ backgroundColor: '#f1c40f', color: '#000' }}>보류</Button>
          <Button variant="contained" sx={{ backgroundColor: '#c0392b' }}>거절</Button>
          <Button variant="contained" sx={{ backgroundColor: '#27ae60' }}>승인</Button>
          <Button variant="contained" onClick={onClose} sx={{ backgroundColor: "#666565ff", "&:hover": {backgroundColor:"#888787ff"} }}>닫기</Button>
        </Stack>

      </Box>
    </Popover>
  );
};

export default LifeMessageDetail;
