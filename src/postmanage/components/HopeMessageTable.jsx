import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const visibleRows = [];
const columns = [
  { field: "id", headerName: "번호", width: "30px", align: "center" },
  {
    field: "classification",
    headerName: "분류",
    width: "60px",
    align: "center",
    filterable: true,
    filterOptions: [
      // 'filteroption' -> 'filterOptions' 오타 수정
      { value: "all", label: "전체" },
      { value: "bullying_violence", label: "왕따/학교폭력" },
      { value: "academic_issues", label: "성적/학업문제" },
      { value: "relationship_issues", label: "친구/이성문제" },
      {
        value: "family_teacher_conflict",
        label: "부모님과 갈등/선생님과 갈등",
      },
      { value: "financial_issues", label: "가정형편/경제" },
      { value: "appearance_issues", label: "외모문제" },
    ],
  },
  {
    field: "isAllow",
    headerName: "입력",
    width: "60px",
    align: "center",
    filterable: true,
    filterOptions: [
      { value: "all", label: "전체" },
      { value: "app", label: "앱" },
      { value: "web", label: "웹" },
    ],
  },
  {
    field: "religion",
    headerName: "종교",
    width: "60px",
    align: "center",
    filterable: true,
    filterOptions: [
      { value: "all", label: "전체" },
      { value: "everyone", label: "모두에게" },
      { value: "christianity", label: "기독교" },
      { value: "buddhism", label: "불교" },
      { value: "catholicism", label: "천주교" },
      { value: "etc", label: "기타" },
      { value: "none", label: "무교" },
    ],
  },
  { field: "title", headerName: "제목/내용", width: "100px", align: "center" },
  { field: "file", headerName: "파일명", width: "80px", align: "center" },
  { field: "date", headerName: "등록일시", width: "80px", align: "center" },
  {
    field: "nickName",
    headerName: "작성자 닉네임",
    width: "50px",
    align: "center",
  },
  { field: "reports", headerName: "신고수", width: "50px", align: "center" },
  { field: "comments", headerName: "답글", width: "30px", align: "center" },
  {
    field: "lifeSaves",
    headerName: "생명살림",
    width: "50px",
    align: "center",
  },
  {
    field: "courage",
    headerName: "큰용기,위안",
    width: "50px",
    align: "center",
  },
  { field: "ex", headerName: "비고", width: "40px", align: "center" },
];

const HopeMessageTable = ({ filters, onChangeFilter }) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const cnt = 10;
  const nav = useNavigate();

  return (
    <Box>
      <TableContainer>
        <Table size="small" sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  sx={{
                    color: "#fff",
                    width: col.width,
                  }}
                >
                  {col.filterable ? (
                    <Select
                      value={filters[col.field]}
                      onChange={onChangeFilter}
                    >
                      {col.filterOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>

            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    color: "#fff",
                    width: col.width,
                    align: col.align,
                    border: "1px solid #ccc",
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id} hover sx={{ cursor: "pointer" }}>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.id}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.classification}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.isAllow}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.religion}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.title}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.file}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.date}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.nickName}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.reports}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.comments}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.lifeSaves}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.courage}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.notHelpFul}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.sending}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>
                  {row.approver}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          count={cnt}
          page={page} // 현재 페이지 state
          onChange={handlePageChange} // 페이지 변경 핸들러
          showFirstButton // '<<' 첫 페이지 버튼 표시
          showLastButton // '>>' 마지막 페이지 버튼 표시
          variant="outlined" // 테두리 스타일
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default HopeMessageTable;
