import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const options = [
  { value: "all", label: "전체" },
  { value: "bullying_violence", label: "왕따.학교폭력" },
  { value: "academic", label: "성적.학업문제" },
  { value: "relationships", label: "친구.이성문제" },
  { value: "conflict_parents", label: "부모님과 갈등" },
  { value: "conflict_teachers", label: "선생님과 갈등" },
  { value: "financial", label: "가정형편.경제문제" },
  { value: "appearance", label: "외모문제" },
  { value: "etc", label: "기타문제" },
  { value: "cats_eye", label: "캣츠아이" },
  { value: "overcoming_story", label: "극복수기" },
];

const dataOptions = [
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const HolpaBoardTable = () => {
  const { data, onClick } = useOutletContext();
  const [option, setOption] = useState("all");
  const [dataOption, setDataOptions] = useState(25);

  const handleChangeOption = (e) => {
    setOption(e.target.value);
  };

  const handleChangeDataOption = (e) => {
    setDataOptions(e.target.value);
  };
  return (
    <Box sx={{ margin: "50px auto" }}>
      <Box
        sx={{
          backgroundColor: "#27374D",
          display: "flex",
          color: "white",
          p: "10px 30px",
          fontSize: "20px",
          width: "100px",
          borderRadius: "5px",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "50px",
          mb: "50px",
        }}
      >
        <Typography>홀파담벼락</Typography>
      </Box>
      <TableContainer>
        <Table
          size="small"
          sx={{
            tableLayout: "fixed",
            width: "100%",
          }}
        >
          <colgroup>
            <col style={{ width: "5%" }} /> {/* 번호 */}
            <col style={{ width: "10%" }} /> {/* 분류 */}
            <col style={{ width: "15%" }} /> {/* 내용 */}
            <col style={{ width: "10%" }} /> {/* 작성자 */}
            <col style={{ width: "11%" }} /> {/* 작성일 */}
            <col style={{ width: "5%" }} /> {/* 추천 */}
            <col style={{ width: "5%" }} /> {/* 신고 */}
            <col style={{ width: "6%" }} /> {/* 댓글수 */}
            <col style={{ width: "6%" }} /> {/* 생각수 */}
            <col style={{ width: "8%" }} /> {/* 마음상태 */}
            <col style={{ width: "8%" }} /> {/* 상태총점 */}
            <col style={{ width: "11%" }} /> {/* 생명메시지발송 */}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Box sx={{ width: "100%" }}>
                  <Select
                    size="small"
                    value={option}
                    onChange={handleChangeOption}
                  >
                    {options.map((option) => (
                      <MenuItem value={option.value} key={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
              <TableCell colSpan={9}></TableCell>
              <TableCell>
                <Select
                  sx={{ width: "80%" }}
                  size="small"
                  value={dataOption}
                  onChange={handleChangeDataOption}
                >
                  {dataOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                height: "45px",
                backgroundColor: "#1976d2",
                borderCollapse: "collapse",
                "& .MuiTableCell-root": {
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                번호
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                분류
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                내용
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                작성자
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                작성일
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>추천</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>신고</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>댓글수</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                생각수
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                마음상태
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>상태총점</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <span>생명메시지발송</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              borderCollapse: "collapse",
              "& .MuiTableCell-root": {
                border: "1px solid #ccc",
                textAlign: "center",
                fontSize: "14px",
                whiteSpace: "nowrap",
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
                onClick={onClick}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.content}
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.likes}</TableCell>
                <TableCell>{item.reports}</TableCell>
                <TableCell>{item.commentCount}</TableCell>
                <TableCell>{item.thoughtCount}</TableCell>
                <TableCell>{item.heartCount}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.messageSent}</TableCell>
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

export default HolpaBoardTable;
