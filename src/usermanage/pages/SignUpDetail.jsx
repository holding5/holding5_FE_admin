import SignUpUserData from "../../modules/SingupData";
import { useParams } from "react-router-dom";
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

  {
    id: 8,
    label: "직책/직분",
    type: "position",
    value: "한국대학교 총장",
  },

  {
    id: 9,
    label: "승인문장",
    type: "accept",
    value:
      "해피인에 응모해 주셔서 감사드립니다.심사결과 귀하는 홀딩파이브 해피인에 적합한 것으로 판단되어 일반 해피인이 되셨습니다.더욱 책임감을 가지고 청소년들을 사랑해 주시기를 부탁드립니다. 해피인에 대한 자세한 내용은 별도공지를 통해 전달해 드리겠습니다. 감사합나다.",
  },

  {
    id: 10,
    label: "거절문장",
    type: "refuse",
    value:
      "해피인에 응모해 주셔서 감사를 드립니다. 먼저 미안한 마음을 전합니다. 주신 자료와 홀파에서의 활동을 검토한 결과 아직 해피인으로 전환하기에는 어려움이 있었음을 전해 드립니다. 이번에 해피인이 되시지는 못하셨지만 청소년을 사랑하시는 마음은 충분히 이해했습니다. 거듭 송구한 말씀을 드립니다. 감사합니다.",
  },
];

const SignUpDetail = () => {
  const params = useParams();
  const userData = SignUpUserData.find(
    (item) => String(params.id) === String(item.id)
  );

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
        }}
      >
        back
      </Button>

      <Stack direction="row">
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
