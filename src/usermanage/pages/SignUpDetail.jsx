import SignUpUserData from "../../modules/SingupData";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Box, Stack } from "@mui/material";
import SignUpDetailButton from "../components/SignUpDetailButton";
import { useState } from "react";
import SignUpDetailInfo from "../components/SignupDetailInfo";
import SignUpDetailSign from "../components/SignUpDetailSign";
const sampleUserData = [
  {
    id: 1,
    label: "학력사항",
    type: "select",
    value: "2002",
    options: [
      { value: "2002", label: "2002학번 한국대학교 교육학과 졸업" },
      { value: "2022", label: "2022년 한국대학교 교육학 졸업 교육학 박사" },
    ],
  },
  {
    id: 2,
    label: "신청분야",
    type: "select",
    value: "counseling",
    options: [
      { value: "counseling", label: "해피인 > (일반) 해피인 > 카운셀링" },
      { value: "mentoring", label: "해피인 > (일반) 해피인 > 멘토링" },
    ],
  },

  {
    id: 3,
    label: "경력사항",
    type: "readonly-textfield",
    value:
      "중고등학교에서 기간제 교사를 했습니다. 현재는 경기도교육청 안전학교 요원으로 일하고 있습니다",
  },
  {
    id: 4,
    label: "활동계획",
    type: "readonly-textfield",
    value:
      "학생들의 고충을 이해하고 함께 소통하며 진실된 마음으로 이야기를 들어주는 조금이나마 힘을 보탤 수 있는 대나무숲이 되어 주고 싶네요.",
  },
  {
    id: 5,
    label: "자기소개서",
    type: "readonly-textfield",
    value:
      "학생들의 고충을 이해하고 함께 소통하며 진실된 마음으로 이야기를 들어주는 조금이나마 힘을 보탤 수 있는 대나무숲이 되어 주고 싶네요.",
  },
  {
    id: 6,
    label: "신청동기",
    type: "readonly-textfield",
    value:
      "학생들의 고충을 이해하고 함께 소통하며 진실된 마음으로 이야기를 들어주는 조금이나마 힘을 보탤 수 있는 대나무숲이 되어 주고 싶네요.",
  },
];

const SignUpDetail = () => {
  const params = useParams();
  const userData = SignUpUserData.find(
    (item) => String(params.id) === String(item.id)
  );
  const nav = useNavigate();

  const buttonColor = ["#d34204d0", "#1976d2"];
  const btnInfo = [
    { value: "info", text: "신상정보" },
    { value: "posts", text: "게시물활동" },
    { value: "review", text: "활동평가" },
    { value: "signup", text: "해피인신청" },
  ];

  const [selectBtn, setSelectBtn] = useState("info");

  const onClickChangeContent = (e) => {
    setSelectBtn(e.target.value);
  };

  const components = {
    info: <SignUpDetailInfo userData={userData} />,
    signup: <SignUpDetailSign userData={sampleUserData} />,
  };

  return (
    <Box>
      <Button
        sx={{
          backgroundColor: "rgba(7, 209, 245, 1)",
          color: "white",
          padding: "2px 30px",
          textTransform: "none",
          fontSize: "25px",
          borderRadius: "5px",
          ml: "30px",
          mb: "20px",
          mt: "20px",
        }}
        onClick={() => {
          nav(-1);
        }}
      >
        back
      </Button>

      <Stack direction="row" sx={{ ml: "40px", gap: "20px" }}>
        {btnInfo.map((item) => (
          <SignUpDetailButton
            key={item.value}
            value={item.value}
            color={selectBtn === item.value ? buttonColor[0] : buttonColor[1]}
            onClickChangeContent={onClickChangeContent}
            text={item.text}
          />
        ))}
      </Stack>

      <Box>{components[selectBtn]}</Box>
    </Box>
  );
};
export default SignUpDetail;
