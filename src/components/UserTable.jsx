import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

// 예시 데이터
const sampleData = [
  {
    id: 3456,
    name: "추동훈",
    gender: "남",
    joinDate: "2025.03.21",
    phone: "010-2341-3456",
    userId: "test01",
    status: "활동중",
    happyGroup: "일반 해피인",
    ageGroup: "20대",
    score: 233,
    rank: "브론즈",
    reports: 0,
    religion: "불교",
    attendance: 245,
    avgAttendance: 20,
  },
  {
    id: 3456,
    name: "추동훈",
    gender: "남",
    joinDate: "2025.03.21",
    phone: "010-2341-3456",
    userId: "test01",
    status: "활동중",
    happyGroup: "일반 해피인",
    ageGroup: "20대",
    score: 233,
    rank: "브론즈",
    reports: 0,
    religion: "불교",
    attendance: 245,
    avgAttendance: 20,
  },
  {
    id: 3456,
    name: "추동훈",
    gender: "남",
    joinDate: "2025.03.21",
    phone: "010-2341-3456",
    userId: "test01",
    status: "활동중",
    happyGroup: "일반 해피인",
    ageGroup: "20대",
    score: 233,
    rank: "브론즈",
    reports: 0,
    religion: "불교",
    attendance: 245,
    avgAttendance: 20,
  },
  {
    id: 3456,
    name: "추동훈",
    gender: "남",
    joinDate: "2025.03.21",
    phone: "010-2341-3456",
    userId: "test01",
    status: "활동중",
    happyGroup: "일반 해피인",
    ageGroup: "20대",
    score: 233,
    rank: "브론즈",
    reports: 0,
    religion: "불교",
    attendance: 245,
    avgAttendance: 20,
  },
  {
    id: 3456,
    name: "추동훈",
    gender: "남",
    joinDate: "2025.03.21",
    phone: "010-2341-3456",
    userId: "test01",
    status: "활동중",
    happyGroup: "일반 해피인",
    ageGroup: "20대",
    score: 233,
    rank: "브론즈",
    reports: 0,
    religion: "불교",
    attendance: 245,
    avgAttendance: 20,
  },
  {
    id: 3456,
    name: "추동훈",
    gender: "남",
    joinDate: "2025.03.21",
    phone: "010-2341-3456",
    userId: "test01",
    status: "활동중",
    happyGroup: "일반 해피인",
    ageGroup: "20대",
    score: 233,
    rank: "브론즈",
    reports: 0,
    religion: "불교",
    attendance: 245,
    avgAttendance: 20,
  },
];

const UserTable = ({itemsPerPage}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const visibleRows = sampleData.slice(startIdx, endIdx);

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>번호</TableCell>
              <TableCell sx={{ color: "#fff" }}>이름</TableCell>
              <TableCell sx={{ color: "#fff" }}>성별</TableCell>
              <TableCell sx={{ color: "#fff" }}>가입일</TableCell>
              <TableCell sx={{ color: "#fff" }}>전화</TableCell>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>현상태</TableCell>
              <TableCell sx={{ color: "#fff" }}>해피인 구분</TableCell>
              <TableCell sx={{ color: "#fff" }}>구간구분</TableCell>
              <TableCell sx={{ color: "#fff" }}>홀파스코어</TableCell>
              <TableCell sx={{ color: "#fff" }}>홀파등급</TableCell>
              <TableCell sx={{ color: "#fff" }}>신고건수</TableCell>
              <TableCell sx={{ color: "#fff" }}>종교</TableCell>
              <TableCell sx={{ color: "#fff" }}>출첵 누적</TableCell>
              <TableCell sx={{ color: "#fff" }}>출첵 월평균</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.joinDate}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.happyGroup}</TableCell>
                <TableCell>{row.ageGroup}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.reports}</TableCell>
                <TableCell>{row.religion}</TableCell>
                <TableCell>{row.attendance}</TableCell>
                <TableCell>{row.avgAttendance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지네이션 */}
      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
    

    
  );
};

export default UserTable;
