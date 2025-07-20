import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import AdminModal from "../components/AdminModal";
import { useNavigate } from "react-router-dom";
import SignUpDetailButton from "../components/SignUpDetailButton";
import FooterBtn from "../components/FooterBtn";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const fieldInfo = [
  { name: "id", label: "ID", type: "text" },
  { name: "nickname", label: "닉네임", type: "text" },
  { name: "pswd", label: "현재비밀번호", type: "text" },
  { name: "gender", label: "성별", type: "radio", option: ["남자", "여자"] },
  { name: "name", label: "이름", type: "text" },
  { name: "birthDate", label: "생년월일", type: "text" },
  { name: "phone", label: "연락처", type: "text" },
  { name: "school", label: "학교", type: "text" },
  { name: "history", label: "경력변경", type: "textarea" },
];

const buttonColor = ["#d34204d0", "#1976d2"];
const btnInfo = [
  { value: "info", text: "신상정보" },
  { value: "posts", text: "게시물활동" },
  { value: "review", text: "활동평가" },
  { value: "signup", text: "해피인신청" },
];

const PauseUserDetailPage = () => {
  const userData = useOutletContext();
  const nav = useNavigate();
  const [selectBtn, setSelectBtn] = useState("info");
  const [anchorEl, setAnchorEl] = useState(null);

  const onClickChangeContent = (e) => {
    setSelectBtn(e.target.value);
  };
  const handleAdminClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      {/* <Stack direction="row" sx={{ ml: "40px", gap: "20px" }}>
        {btnInfo.map((item) => (
          <SignUpDetailButton
            key={item.value}
            value={item.value}
            color={selectBtn === item.value ? buttonColor[0] : buttonColor[1]}
            onClickChangeContent={onClickChangeContent}
            text={item.text}
          />
        ))}
      </Stack> */}

      <Box
        component="form"
        sx={{
          display: "grid",
          mt: 3,
          gridTemplateColumns: "max-content 800px",
          alignItems: "center",
          rowGap: 2,
          columnGap: 3,
          pl: "80px",
          mb: 3,
        }}
      >
        {fieldInfo.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <Typography sx={{ fontWeight: "bold" }}>{item.label}</Typography>
              {item.type === "text" ? (
                <TextField value={userData[item.name]} sx={{ width: 500 }} />
              ) : item.type === "textarea" ? (
                <TextField multiline rows={4} value={userData[item.name]} />
              ) : (
                <RadioGroup row defaultValue={userData[item.name]}>
                  {item.option.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option.toLowerCase()}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              )}
            </React.Fragment>
          );
        })}
      </Box>

      <FooterBtn
        leftText={"수정"}
        midText={"삭제"}
        rightText={"행정관리"}
        rightClick={handleAdminClick}
      />

      <AdminModal anchorEl={anchorEl} onClose={handleAdminClose} />
    </Box>
  );
};

export default PauseUserDetailPage;
