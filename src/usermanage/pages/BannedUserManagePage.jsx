import BannedUserCard from "../components/BannedUserCard";
import { Box, Button, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import ContentSearchbar from "../../components/ContentSearchbar";

const userData = [
  {
    id: 1,
    nickname: "스코어의 남자",
    banTime: "2024.06.07 01:23:00",
    password: "password123",
    gender: "male",
    name: "홍길동",
    birthDate: "20.12.03",
    phone: "010-3456-9098",
    school: "한국대학교",
    history: `2024. 06.30 : 드림인에서 또래해피인으로 변경
2021. 01.23 : 신고건으로 일시정지[30일] 관리자 해제
2020. 02.23 : 최초등록`,
    reports: {
      total: 12,
      details: [
        { type: "언어폭력", count: 2 },
        { type: "도배", count: 3 },
        { type: "부적절한 언어사용", count: 1 },
        { type: "음담패설,성적희롱", count: 6 },
      ],
    },
  },
  {
    id: 2,
    nickname: "팔불출",
    banTime: "2024.06.07 01:23:00",
    password: "password123",
    gender: "male",
    name: "홍길동",
    birthDate: "20.12.03",
    phone: "010-3456-9098",
    school: "한국대학교",
    history: `2024. 06.30 : 드림인에서 또래해피인으로 변경
2021. 01.23 : 신고건으로 일시정지[30일] 관리자 해제
2020. 02.23 : 최초등록`,
    reports: {
      total: 12,
      details: [
        { type: "언어폭력", count: 2 },
        { type: "도배", count: 3 },
        { type: "부적절한 언어사용", count: 1 },
        { type: "음담패설,성적희롱", count: 6 },
      ],
    },
  },
  {
    id: 3,
    nickname: "어메이징",
    banTime: "2024.06.07 01:23:00",
    password: "password123",
    gender: "male",
    name: "홍길동",
    birthDate: "20.12.03",
    phone: "010-3456-9098",
    school: "한국대학교",
    history: `2024. 06.30 : 드림인에서 또래해피인으로 변경
2021. 01.23 : 신고건으로 일시정지[30일] 관리자 해제
2020. 02.23 : 최초등록`,
    reports: {
      total: 12,
      details: [
        { type: "언어폭력", count: 2 },
        { type: "도배", count: 3 },
        { type: "부적절한 언어사용", count: 1 },
        { type: "음담패설,성적희롱", count: 6 },
      ],
    },
  },
  {
    id: 4,
    nickname: "코코바지",
    banTime: "2024.06.07 01:23:00",
    password: "password123",
    gender: "male",
    name: "홍길동",
    birthDate: "20.12.03",
    phone: "010-3456-9098",
    school: "한국대학교",
    history: `2024. 06.30 : 드림인에서 또래해피인으로 변경
2021. 01.23 : 신고건으로 일시정지[30일] 관리자 해제
2020. 02.23 : 최초등록`,
    reports: {
      total: 12,
      details: [
        { type: "언어폭력", count: 2 },
        { type: "도배", count: 3 },
        { type: "부적절한 언어사용", count: 1 },
        { type: "음담패설,성적희롱", count: 6 },
      ],
    },
  },
];
const BannedUserManagePage = () => {
  return (
    <Box>
      <Outlet context={{ userData: userData }} />
    </Box>
  );
};

export default BannedUserManagePage;
