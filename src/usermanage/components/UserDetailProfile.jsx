import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Checkbox,
  FormGroup,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import AdminModal from "./AdminModal";
const UserDetailProfile = ({ userData, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const onClickModalOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onClickModalClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      component="form"
      sx={{
        display: "grid",
        gridTemplateColumns: "max-content 500px",
        gap: "40px",
        alignItems: "center",
        paddingLeft: "50px",
      }}
    >
      <Typography>ID</Typography>
      <TextField value={userData.id} name="id" onChange={onChange} />

      <Typography>닉네임</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>현재비밀번호</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>성별</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          name="gender"
          //value={gender}
          onChange={onChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="남성" />
          <FormControlLabel value="female" control={<Radio />} label="여성" />
        </RadioGroup>
      </FormControl>

      <Typography>이름</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>생년월일</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>연락처</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>학교(직장)</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>해피인 분류</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>종교</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>해피인 권한 부여</Typography>
      <FormControl component="fieldset">
        <FormGroup
          aria-labelledby="happyin-permission-label"
          name="happyinPermission" // 🟢 그룹의 name (onChange에서 사용)
          // value는 FormGroup에 직접 주지 않고, 각 Checkbox의 checked 상태로 관리
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, max-content)",
            justifyContent: "flex-start",
          }}
        >
          <FormControlLabel
            control={<Checkbox name="lifeMessenger" />}
            label="생명메시지"
          />
          <FormControlLabel
            control={<Checkbox name="counselor" />}
            label="카운셀러"
          />
          <FormControlLabel
            control={<Checkbox name="photoUpload" />}
            label="사진업로드"
          />
          <FormControlLabel
            control={<Checkbox name="hopeMessage" />}
            label="희망메시지"
          />
          <FormControlLabel
            control={<Checkbox name="voiceUpload" />}
            label="음성업로드"
          />
        </FormGroup>
      </FormControl>
      <Typography multiline rows={4}>
        경력 변경
      </Typography>
      <TextField value={userData.id} name="id" multiline rows={4} />

      <Typography>해피인 소개</Typography>
      <TextField value={userData.id} name="id" multiline rows={4} />

      <Stack
        direction="row"
        justifyContent="center"
        sx={{ gridColumn: "1 /span 2", mb: "10px", mt: "0px" }}
        spacing={1}
      >
        <Button
          sx={{
            backgroundColor: "RGB(23, 107, 187)",
            color: "white",
            padding: "5px 30px",
          }}
        >
          수정
        </Button>
        <Button
          sx={{
            backgroundColor: "RGB(230, 126, 34)",
            color: "white",
            padding: "5px 30px",
          }}
        >
          삭제
        </Button>
        <Button
          sx={{
            backgroundColor: "RGB(111, 161, 57)",
            color: "white",
            padding: "5px 50px",
          }}
          onClick={onClickModalOpen}
        >
          행정관리
        </Button>
      </Stack>

      <AdminModal anchorEl={anchorEl} onClose={onClickModalClose} />
    </Box>
  );
};

export default UserDetailProfile;
