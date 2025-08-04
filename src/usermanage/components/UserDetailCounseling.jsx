import {
  Box,
  Select,
  MenuItem,
  Stack,
  Typography,
  Link,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useState } from "react";

const data = [
  {
    id: 55,
    status: "대기중",
    topic: "공통",
    religion: "상관없음",
    content: "그래도 행복을 꿈꿔야 합니다.",
    counselor: "할미꽃소녀",
    date: "2024.03.12",
    author: "어리버리청춘",
    rating: 4.8,
  },
  {
    id: 54,
    status: "진행중",
    topic: "성적, 학업문제",
    religion: "기독교",
    content: "",
    counselor: "미정",
    date: "",
    author: "어리버리청춘",
    rating: 5.0,
  },
  {
    id: 53,
    status: "상담중",
    topic: "부모갈등",
    religion: "기독교",
    content: "",
    counselor: "크로크다일",
    date: "",
    author: "어리버리청춘",
    rating: 4.7,
  },
  {
    id: 52,
    status: "진행중",
    topic: "공통",
    religion: "무관",
    content: "",
    counselor: "미정",
    date: "",
    author: "어리버리청춘",
    rating: 4.5,
  },
  {
    id: 51,
    status: "상담종료",
    topic: "선생님과 갈등",
    religion: "불교",
    content: "",
    counselor: "해피로드",
    date: "",
    author: "어리버리청춘",
    rating: 4.1,
  },
  {
    id: 50,
    status: "상담종료",
    topic: "외모문제",
    religion: "천주교",
    content: "",
    counselor: "",
    date: "",
    author: "어리버리청춘",
    rating: 3.8,
  },
  {
    id: 49,
    status: "상담종료",
    topic: "왕따, 폭력문제",
    religion: "기독교",
    content: "",
    counselor: "",
    date: "",
    author: "어리버리청춘",
    rating: 2.4,
  },
];

const statusOptions = [
  { value: "all", label: "전체" },
  { value: "pause", label: "대기중" },
  { value: "excute", label: "진행중" },
  { value: "excute", label: "상담중" },
  { value: "done", label: "상담종료" },
];

const classificationOptions = [
  { value: "all", label: "전체" },
  { value: "total", label: "공통" },
  { value: "study", label: "성적,학업문제" },
  { value: "parent", label: "부모갈등" },
  { value: "teacher", label: "선생님과 갈등" },
  { value: "face", label: "외모문제" },
  { value: "fight", label: "왕따, 폭력문제" },
];

const religionOptions = [
  { value: "all", label: "전체" },
  { value: "none", label: "상관없음" },
  { value: "church", label: "기독교" },
  { value: "chun", label: "천주교" },
  { value: "bool", label: "불교" },
  { value: "atheist", label: "무교" },
];

const UserDetailCounseling = () => {
  const [status, setStatus] = useState("all");
  const [classification, setClassification] = useState("all");
  const [religion, setReligion] = useState("all");

  return (
    <Box sx={{ width: "1150px", margin: "50px auto" }}>
      <TableContainer>
        <Table
          size="small"
          sx={{
            tableLayout: "fixed",
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ p: 1 }}>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ backgroundColor: "#fff" }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <Select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ backgroundColor: "#fff" }}
                >
                  {classificationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <Select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ backgroundColor: "#fff" }}
                >
                  {religionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell colSpan={5} />
            </TableRow>

            <TableRow
              sx={{
                height: "45px",
                backgroundColor: "#1976d2",
                borderCollapse: "collapse",

                "& .MuiTableCell-root": {
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",

                  border: "1px solid #ccc",
                },
              }}
            >
              <TableCell align="center" sx={{ width: "5%" }}>
                NO
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>상태</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>주제</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>종교</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "12%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>제목/내용</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>내담자</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>등록일시</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>닉네임</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>평점/내담자후기</span>
                  <UnfoldMoreIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              borderCollapse: "collapse",
              "& .MuiTableCell-root": {
                fontSize: "14px",
                whiteSpace: "nowrap",
                textAlign: "center",

                border: "1px solid #ccc",
              },
            }}
          >
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  height: "45px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.topic}</TableCell>
                <TableCell>{item.religion}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.content}
                </TableCell>
                <TableCell>{item.counselor}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={10}
        page={1}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default UserDetailCounseling;
