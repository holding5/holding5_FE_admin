import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import AdminModal from "../usermanage/components/AdminModal";
const DreamUserDetailProfile = ({ userData, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const [userType, setUserType] = useState(""); // 학생/직장인
  const [schoolYear, setSchoolYear] = useState(""); // 학년

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSchoolYearChange = (e) => {
    setSchoolYear(e.target.value);
  };

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
        paddingLeft: "80px",
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

      <Typography>학생/직장,일반인</Typography>
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <InputLabel>선택하세요</InputLabel>
          <Select value={userType} onChange={handleUserTypeChange} label="선택하세요">
            <MenuItem value="student">학생</MenuItem>
            <MenuItem value="worker">직장인</MenuItem>
            <MenuItem value="normal">일반인</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>학년</InputLabel>
          <Select
            value={schoolYear}
            onChange={handleSchoolYearChange}
            label="학년"
          >
            <MenuItem value="1">1학년</MenuItem>
            <MenuItem value="2">2학년</MenuItem>
            <MenuItem value="3">3학년</MenuItem>
            <MenuItem value="4">4학년</MenuItem>
            <MenuItem value="5">5학년</MenuItem>
            <MenuItem value="6">6학년</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Typography>소속학교</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>종교</Typography>
      <TextField value={userData.id} name="id" />
      
      <Typography multiline rows={4}>
        경력 변경
      </Typography>
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

export default DreamUserDetailProfile;
