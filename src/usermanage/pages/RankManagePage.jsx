import RankDataTable from "../components/RankDataTable";
import { Box } from "@mui/material";
import { useState, createContext } from "react";
import { Link } from "react-router-dom";

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

const columns = [
  {
    field: "id",
    headerName: "NO",
    width: 70,
    headerAlign: "center",
  },
  {
    field: "nickname",
    headerName: "닉네임",
    width: 130,
    renderCell: (params) => (
      <Link to={"/rankmanagedetail"} style={{ color: "blue" }}>
        {params.value} {params.row.detailInfo && `(${params.row.detailInfo})`}
      </Link>
    ),
    headerAlign: "center",
  },
  {
    field: "affiliation",
    headerName: "소속분류",
    width: 140,
    filterable: true,
    filterOptions: ["전체", "해피인", "드림인"],
    headerAlign: "center",
  },

  {
    field: "ageGroup",
    headerName: "나이대",
    width: 130,
    filterable: true,
    filterOptions: [
      "전체",
      "초등학생",
      "중학생",
      "고등학생",
      "20대",
      "30대",
      "40대 이상",
    ],
    headerAlign: "center",
  },

  {
    field: "grade",
    headerName: "등급",
    width: 130,
    filterable: true,
    filterOptions: ["전체", "해피인", "드림인"],
    headerAlign: "center",
  },
  {
    field: "gradeScore",
    headerName: "등급스코어",
    type: "number",
    width: 150,
    headerAlign: "center",
  },
  {
    field: "totalScore",
    headerName: "통합누적스코어",
    type: "number",
    width: 150,
    headerAlign: "center",
  },
  {
    field: "startDate",
    headerName: "시작일",
    type: "number",
    width: 130,
  },
  {
    field: "change",
    headerName: "출석",
    type: "number",
    width: 120,
    filterable: true,
    filterOptions: [
      "1개월",
      "2개월",
      "3개월",
      "5개월",
      "6개월",
      "7개월",
      "8개월",
      "9개월",
      "10개월",
      "11개월",
      "1년",
    ],
    headerAlign: "center",
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
    <RankPageData.Provider
      value={{ userData, columns, crntOption, onFilterChange }}
    >
      <Box sx={{ padding: "0 15px" }}>
        <RankDataTable />
      </Box>
    </RankPageData.Provider>
  );
};

export default RankManagePage;
