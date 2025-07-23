import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import LifeMessageDetail from "./LifeMessageDetail";

// 예시 데이터
const sampleData = [
  {
    id: 1,
    classification: "공통",
    isAllow: "승인보류",
    religion: "상관없음",
    title: "그래도 행복을 꿈꿔야합니다.",
    file: "240808.m4a",
    date: "2025.01.02",
    nickName: "유재석(메뚜기)",
    reports: "0",
    comments: "3",
    lifeSaves: "4",
    courage: "6",
    notHelpFul: "8",
    sending: "15",
    approver: "관리자1",
  },
  {
    id: 2,
    classification: "학폭",
    isAllow: "승인대기",
    religion: "상관없음",
    title: "제목 1",
    file: "240808.m4a",
    date: "2025.01.02",
    nickName: "추동훈(메뚜기)",
    reports: "1",
    comments: "3",
    lifeSaves: "6",
    courage: "11",
    notHelpFul: "8",
    sending: "15",
    approver: "관리자1",
  },
  
];

const LifeMessageTableAll = ({itemsPerPage}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const visibleRows = sampleData.slice(startIdx, endIdx);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Detail 팝오버 열기
  const handleCellClick = (e, row) => {
    setAnchorEl(e.currentTarget);
    setSelectedRow(row);
  };

  // Detail 팝오버 닫기
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper>
      <TableContainer>
        <Table size="small" sx={{tableLayout:"fixed"}}>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "#fff", width: "30px", border: "1px solid #ccc" }}>번호</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "60px", border: "1px solid #ccc" }}>분류</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "60px", border: "1px solid #ccc" }}>승인여부</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "60px", border: "1px solid #ccc" }}>종교</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "100px", border: "1px solid #ccc" }}>제목</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "80px", border: "1px solid #ccc" }}>파일명</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "80px", border: "1px solid #ccc" }}>등록일시</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "50px", border: "1px solid #ccc" }}>작성자 닉네임</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "40px", border: "1px solid #ccc" }}>신고수</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "30px", border: "1px solid #ccc" }}>답글</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "30px", border: "1px solid #ccc" }}>생명살림</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "50px", border: "1px solid #ccc" }}>큰용기,위안</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "50px", border: "1px solid #ccc" }}>별 도움안됨</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "30px", border: "1px solid #ccc" }}>발송 회수</TableCell>
              <TableCell align="center" sx={{ color: "#fff", width: "50px", border: "1px solid #ccc" }}>결재인</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover sx={{cursor: "pointer"}} onClick={(e) => handleCellClick(e, row)}>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.id}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.classification}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.isAllow}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.religion}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.title}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.file}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.date}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.nickName}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.reports}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.comments}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.lifeSaves}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.courage}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.notHelpFul}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.sending}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{row.approver}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <LifeMessageDetail
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        rowData={selectedRow}
      />

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

export default LifeMessageTableAll;
