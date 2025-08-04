import RankDataTable from "../components/RankDataTable";
import { Box } from "@mui/material";
import { useState, createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useOutlet } from "react-router-dom";
const numberSortComparator = (v1, v2) => v1 - v2;

const sortComparator = (v1, v2) => {
  const isKorean = /^[가-힣]/;
  const isEnglish = /^[a-zA-Z]/;

  const v1IsKorean = isKorean.test(v1);
  const v2IsKorean = isKorean.test(v2);
  const v1IsEnglish = isEnglish.test(v1);
  const v2IsEnglish = isEnglish.test(v2);

  if (v1IsKorean && !v2IsKorean) return -1; // v1이 먼저
  if (!v1IsKorean && v2IsKorean) return 1; // v2가 먼저

  if (v1IsEnglish && !v2IsEnglish) return -1;
  if (!v1IsEnglish && v2IsEnglish) return 1;

  return v1.localeCompare(v2, "ko");
};

const userData = [
  {
    id: 55,
    nickname: "이아름",
    affiliation: "해피인",
    ageGroup: "30대",
    grade: "A",
    gradeScore: 250,
    totalScore: 3200,
    startDate: "2023.01.02",
    change: 23,
    detailInfo: "코산의방",
  },
  {
    id: 54,
    nickname: "박달래",
    affiliation: "해피인",
    ageGroup: "40대이상",
    grade: "B",
    gradeScore: 200,
    totalScore: 3560,
    startDate: "2022.09.12",
    change: 12,
    detailInfo: "만돌래",
  },
  {
    id: 53,
    nickname: "난장이풀",
    affiliation: "해피인",
    ageGroup: "중학생",
    grade: "C",
    gradeScore: 150,
    totalScore: 1200,
    startDate: "2024.01.01",
    change: 14,
  },
  {
    id: 52,
    nickname: "키다리풀",
    affiliation: "드림인",
    ageGroup: "초등학생",
    grade: "실버3",
    gradeScore: 158,
    totalScore: 350,
    startDate: "2024.01.01",
    change: 18,
  },
  {
    id: 51,
    nickname: "능금아씨",
    affiliation: "드림인",
    ageGroup: "고등학생",
    grade: "다이아몬드2",
    gradeScore: 2400,
    totalScore: 2400,
    startDate: "2024.01.01",
    change: 30,
  },
];

export const RankPageData = createContext();

const RankManagePage = () => {
  const [crntOption, setCrntOption] = useState({
    affiliation: "전체",
    ageGroup: "전체",
    grade: "전체",
    change: "1개월",
  });
  const [crntPage, setCrntPage] = useState(1);

  const onFilterChange = (field, value) => {
    setCrntOption((prevOptions) => ({ ...prevOptions, [field]: value }));
  };

  return (
    <RankPageData.Provider value={{ userData, crntOption, onFilterChange }}>
      <Box>
        <Outlet />
      </Box>
    </RankPageData.Provider>
  );
};

export default RankManagePage;
