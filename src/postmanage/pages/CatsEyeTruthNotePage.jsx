import ContentSearchbar from "../../components/ContentSearchbar";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const data = [
  {
    id: 1242,
    region: "경북 > 구미시",
    content:
      "형곡중학교에서 피해자 1명이 지속적으로 괴롭힘을 당하고 있습니다. 가해 학생들의 신속한 조치가 필요합니다.",
    reporterNickname: "콩나물대가리",
    createdAt: "2025.01.02",
    cheerCount: 4,
    reportCount: 12,
    commentCount: 3,
    reportChannels: {
      region: 2,
      school: 0,
      police: 0,
    },
    searchCount: 123,
  },
  {
    id: 1241,
    region: "부산 > 사하구",
    content:
      "온라인 커뮤니티에서 특정 학생에 대한 허위 사실이 유포되고 있습니다. 사이버 불링으로 보입니다.",
    reporterNickname: "정의의사도",
    createdAt: "2025.01.01",
    cheerCount: 10,
    reportCount: 5,
    commentCount: 8,
    reportChannels: {
      region: 1,
      school: 1,
      police: 3,
    },
    searchCount: 250,
  },
  {
    id: 1240,
    region: "서울 > 강서구",
    content:
      "방과 후 학교 뒷골목에서 금품을 갈취당하는 학생을 목격했습니다. 매일 반복되는 것 같습니다.",
    reporterNickname: "골목길감시자",
    createdAt: "2024.12.31",
    cheerCount: 2,
    reportCount: 20,
    commentCount: 5,
    reportChannels: {
      region: 5,
      school: 5,
      police: 10,
    },
    searchCount: 310,
  },
  {
    id: 1239,
    region: "경기 > 수원시",
    content:
      "체육 시간에 따돌림으로 인해 한 학생이 계속 혼자 있습니다. 단체 활동에서 의도적으로 배제되고 있습니다.",
    reporterNickname: "익명의학부모",
    createdAt: "2024.12.30",
    cheerCount: 15,
    reportCount: 3,
    commentCount: 12,
    reportChannels: {
      region: 1,
      school: 2,
      police: 0,
    },
    searchCount: 180,
  },
  {
    id: 1238,
    region: "인천 > 남동구",
    content:
      "SNS 단체 대화방에서 한 학생을 향한 언어폭력이 심각한 수준입니다. 캡쳐 자료 확보했습니다.",
    reporterNickname: "사이버수사대",
    createdAt: "2024.12.29",
    cheerCount: 8,
    reportCount: 15,
    commentCount: 7,
    reportChannels: {
      region: 3,
      school: 2,
      police: 10,
    },
    searchCount: 421,
  },
  {
    id: 1237,
    region: "대전 > 유성구",
    content:
      "같은 반 학생의 학용품을 지속적으로 훔치고 망가뜨리는 학생이 있습니다. 피해 학생이 두려워 말을 못합니다.",
    reporterNickname: "같은반친구",
    createdAt: "2024.12.28",
    cheerCount: 5,
    reportCount: 8,
    commentCount: 4,
    reportChannels: {
      region: 2,
      school: 6,
      police: 0,
    },
    searchCount: 98,
  },
  {
    id: 1236,
    region: "광주 > 북구",
    content:
      "신체적인 폭행은 없지만, 무시하고 없는 사람 취급하는 은밀한 따돌림이 진행 중입니다.",
    reporterNickname: "지나가던선배",
    createdAt: "2024.12.27",
    cheerCount: 25,
    reportCount: 2,
    commentCount: 18,
    reportChannels: {
      region: 1,
      school: 1,
      police: 0,
    },
    searchCount: 350,
  },
  {
    id: 1235,
    region: "울산 > 중구",
    content:
      "피해 학생의 개인정보(주소, 전화번호)를 온라인에 공개하겠다고 협박하는 사건이 발생했습니다.",
    reporterNickname: "개인정보보호",
    createdAt: "2024.12.26",
    cheerCount: 3,
    reportCount: 18,
    commentCount: 6,
    reportChannels: {
      region: 2,
      school: 4,
      police: 12,
    },
    searchCount: 512,
  },
  {
    id: 1234,
    region: "강원 > 춘천시",
    content:
      "가해 학생들이 피해 학생에게 불법적인 심부름(담배 구매 등)을 강요하고 있습니다.",
    reporterNickname: "편의점알바생",
    createdAt: "2024.12.25",
    cheerCount: 1,
    reportCount: 22,
    commentCount: 9,
    reportChannels: {
      region: 5,
      school: 5,
      police: 12,
    },
    searchCount: 480,
  },
  {
    id: 1233,
    region: "제주 > 제주시",
    content:
      "외모를 비하하고 조롱하는 발언으로 인해 피해 학생이 등교를 거부하고 있습니다. 심리적인 안정이 시급합니다.",
    reporterNickname: "걱정되는이웃",
    createdAt: "2024.12.24",
    cheerCount: 30,
    reportCount: 1,
    commentCount: 22,
    reportChannels: {
      region: 1,
      school: 0,
      police: 0,
    },
    searchCount: 290,
  },
];

const mockData = [
  {
    id: 1,
    nickname: "행복한 고양이",
    noteCount: 12,
    status: "온라인",
    processStatus: "복구 완료",
  },
  {
    id: 2,
    nickname: "코딩 마스터",
    noteCount: 45,
    status: "오프라인",
    processStatus: "복구대기",
  },
  {
    id: 3,
    nickname: "강철 프로그래머",
    noteCount: 8,
    status: "온라인",
    processStatus: "복구대기",
  },
  {
    id: 4,
    nickname: "리액트 장인",
    noteCount: 99,
    status: "자리비움",
    processStatus: "복구완료",
  },
  {
    id: 5,
    nickname: "주니어 개발자",
    noteCount: 3,
    status: "온라인",
    processStatus: "복구대기",
  },
  {
    id: 6,
    nickname: "데이터 분석가",
    noteCount: 37,
    status: "오프라인",
    processStatus: "처리 완료",
  },
  {
    id: 7,
    nickname: "날으는 돈까스",
    noteCount: 22,
    status: "온라인",
    processStatus: "복구대기",
  },
  {
    id: 8,
    nickname: "잠자는 사자",
    noteCount: 0,
    status: "온라인",
    processStatus: "복구완료",
  },
  {
    id: 9,
    nickname: "친절한 AI",
    noteCount: 150,
    status: "오프라인",
    processStatus: "복구완료",
  },
  {
    id: 10,
    nickname: "마지막 유저",
    noteCount: 5,
    status: "온라인",
    processStatus: "복구대기",
  },
];

const CatsEyeTruthNotePage = () => {
  const nav = useNavigate();
  const activeColor = "#3A5A94";
  const inactiveColor = "#8e8e8e";

  const [activeBtn, setActiveBtn] = useState("cats");

  const onClickPage = () => {
    nav("catseye-detail");
  };

  const onClickBtn = (e) => {
    setActiveBtn(e.target.value);
    nav(`/catseye-truth/${e.target.value}`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "30px",
          mb: "30px",
        }}
      >
        <ContentSearchbar />
      </Box>

      <Box sx={{ display: "flex", gap: "10px", paddingLeft: "40px" }}>
        <Button
          value="cats"
          sx={{
            color: "white",
            width: "200px",
            p: "5px 30px",
            backgroundColor: activeBtn === "cats" ? activeColor : inactiveColor,
            fontSize: "18px",
          }}
          onClick={onClickBtn}
        >
          캣츠아이
        </Button>
        <Button
          value="truth"
          sx={{
            color: "white",
            width: "200px",
            p: "5px 30px",
            backgroundColor:
              activeBtn === "truth" ? activeColor : inactiveColor,
            fontSize: "18px",
          }}
          onClick={onClickBtn}
        >
          진실노트
        </Button>
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Outlet context={{ data, onClickPage, mockData }} />
      </Box>
    </Box>
  );
};

export default CatsEyeTruthNotePage;
