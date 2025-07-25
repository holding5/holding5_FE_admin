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
const SignUpDetailInfo = ({ userData }) => {
  return (
    <Box
      component="form"
      sx={{
        display: "grid",
        gridTemplateColumns: "max-content 500px",
        gap: "40px",
        alignItems: "center",
        paddingLeft: "80px",
        mt: "20px",
      }}
    >
      <Typography>ID</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>닉네임</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>신청일시</Typography>
      <TextField value={userData.id} name="id" />

      <Typography>성별</Typography>
      <FormControl component="fieldset">
        <RadioGroup row name="gender">
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

      <Typography>학교</Typography>
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
        >
          행정관리
        </Button>
      </Stack>

      <AdminModal />
    </Box>
  );
};

export default SignUpDetailInfo;
