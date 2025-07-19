import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Box, TextField, Button, Chip, Typography, Stack } from "@mui/material";

const mockData = [
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
    affiliation: "드림원",
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
    affiliation: "드림원",
    ageGroup: "고등학생",
    grade: "다이아몬드2",
    gradeScore: 2400,
    totalScore: 2400,
    startDate: "2024.01.01",
    change: 30,
  },
];

const RankDataTable = () => {
  const columns = [
    { field: "id", headerName: "NO", width: 70 },
    {
      field: "nickname",
      headerName: "닉네임",
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/userdetail/${params.row.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {params.value} {params.row.detailInfo && `(${params.row.detailInfo})`}
        </Link>
      ),
    },
    { field: "affiliation", headerName: "소속분류", width: 130 },
    { field: "ageGroup", headerName: "나이대", width: 130 },
    { field: "grade", headerName: "등급", width: 130 },
    {
      field: "gradeScore",
      headerName: "등급스코어",
      type: "number",
      width: 130,
    },
    {
      field: "totalScore",
      headerName: "통합누적스코어",
      type: "number",
      width: 150,
    },
    { field: "startDate", headerName: "시작일", width: 150 },
    { field: "change", headerName: "증감", type: "number", width: 90 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", display: "flex" }}>
      <DataGrid
        rows={mockData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        sx={{ flex: "1" }}
      />
    </Box>
  );
};

export default RankDataTable;
