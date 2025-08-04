import { useState } from "react";
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

const data = [
  {
    id: 55,
    category: "생명메시지",
    classification: "공통",
    religion: "상관없음",
    content: "그래도 행복을 꿈꿔야 합니다.",
    file: "240405067.m4a",
    date: "2024.03.12",
    author: "어리버리청춘",
  },
  {
    id: 54,
    category: "희망메시지",
    classification: "성적, 학업문제",
    religion: "기독교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 53,
    category: "홀파담벼락",
    classification: "부모갈등",
    religion: "기독교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 52,
    category: "",
    classification: "공통",
    religion: "무관",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 51,
    category: "",
    classification: "선생님과 갈등",
    religion: "불교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 50,
    category: "",
    classification: "외모문제",
    religion: "천주교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 49,
    category: "",
    classification: "왕따, 폭력문제",
    religion: "기독교",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 48,
    category: "",
    classification: "공통",
    religion: "무관",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
  {
    id: 47,
    category: "",
    classification: "공통",
    religion: "상관없음",
    content: "",
    file: "",
    date: "",
    author: "어리버리청춘",
  },
];

const categoryOptions = [
  { value: "all", label: "전체" },
  { value: "life", label: "생명메시지" },
  { value: "hope", label: "희망메시지" },
  { value: "holpa", label: "홀파담벼락" },
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

const UserDetailPosts = () => {
  const [category, setCategory] = useState("all");
  const [classification, setClassification] = useState("all");
  const [religion, setReligion] = useState("all");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClassificationChange = (event) => {
    setClassification(event.target.value);
  };

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };
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
            <TableRow sx={{ height: "45px" }}>
              <TableCell></TableCell>

              <TableCell>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  size="small"
                  fullWidth
                >
                  {categoryOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={classification}
                  onChange={handleClassificationChange}
                  size="small"
                  fullWidth
                >
                  {classificationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={religion}
                  onChange={handleReligionChange}
                  size="small"
                  fullWidth
                >
                  {religionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell colSpan={4}></TableCell>
            </TableRow>

            <TableRow
              sx={{
                height: "45px",
                backgroundColor: "#1976d2",
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
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>카테고리</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>분류</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "10%" }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>종교</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "12%" }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>제목/내용</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>파일명</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>등록일시</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ width: "6%" }}>
                닉네임
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                textAlign: "center",

                fontSize: "14px",
                whiteSpace: "nowrap",
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
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.classification}</TableCell>
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
                <TableCell>{item.file}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.author}</TableCell>
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

export default UserDetailPosts;
