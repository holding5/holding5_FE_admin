import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useOutletContext } from "react-router-dom";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useState } from "react";
const dataNumOption = [
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];
const CatsEyeTable = () => {
  const { data, onClickPage } = useOutletContext();
  const [locOption, setLocOption] = useState("all");
  const [dataNum, setDataNum] = useState(25);

  const handleChnageLoc = (e) => {
    setLocOption(e.target.value);
  };

  const handleChangedNum = (e) => {
    setDataNum(e.target.value);
  };
  return (
    <Box>
      <TableContainer>
        <Table
          size="small"
          sx={{
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            <col style={{ width: "5%" }} /> {/* 번호 */}
            <col style={{ width: "10%" }} /> {/* 지역 */}
            <col style={{ width: "17%" }} /> {/* 내용 (너비 축소) */}
            <col style={{ width: "9%" }} /> {/* 신고자닉네임 */}
            <col style={{ width: "8%" }} /> {/* 작성일 */}
            <col style={{ width: "7%" }} /> {/* 응원 */}
            <col style={{ width: "7%" }} /> {/* 신고 */}
            <col style={{ width: "8%" }} /> {/* 댓글수 */}
            <col style={{ width: "7%" }} /> {/* 신고처 - 지역 */}
            <col style={{ width: "7%" }} /> {/* 신고처 - 학교 */}
            <col style={{ width: "7%" }} /> {/* 신고처 - 경찰 (너비 확대) */}
            <col style={{ width: "8%" }} /> {/* 검색수 */}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Select
                  value={locOption}
                  onChange={handleChnageLoc}
                  size="small"
                  fullWidth
                >
                  <MenuItem value={locOption}>전체</MenuItem>
                </Select>
              </TableCell>
              <TableCell colSpan={8}></TableCell>
              <TableCell>
                <Box sx={{ width: "80px" }}>
                  <Select
                    value={dataNum}
                    onChange={handleChangedNum}
                    size="small"
                    fullWidth
                  >
                    {dataNumOption.map((option) => (
                      <MenuItem value={option.value} key={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                height: "45px",
                "& .MuiTableCell-root": {
                  textAlign: "center",
                  fontSize: "12px",
                  borderCollapse: "collapse",
                  border: "1px solid #ccc",
                },
              }}
            >
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                번호
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                지역
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                내용
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                신고자닉네임
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>작성일</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>응원</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>신고</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>댓글수</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                colSpan={3}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                신고처
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>검색수</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
            </TableRow>

            <TableRow
              sx={{
                height: "45px",
                borderCollapse: "collapse",
                "& .MuiTableCell-root": {
                  textAlign: "center",
                  fontSize: "12px",

                  border: "1px solid #ccc",
                },
              }}
            >
              <TableCell
                align="center"
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>지역</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>학교</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>경찰</span>
                  <UnfoldMoreIcon sx={{ fontSize: "1.5rem" }} />
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                textAlign: "center",
                fontSize: "13px",

                borderCollapse: "collapse",
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
                onClick={onClickPage}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                    textAlign: "left",
                  }}
                >
                  {item.content}
                </TableCell>
                <TableCell>{item.reporterNickname}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.cheerCount}</TableCell>
                <TableCell>{item.reportCount}</TableCell>
                <TableCell>{item.commentCount}</TableCell>
                <TableCell>{item.reportChannels.region}</TableCell>
                <TableCell>{item.reportChannels.school}</TableCell>
                <TableCell>{item.reportChannels.police}</TableCell>

                <TableCell>{item.searchCount}</TableCell>
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

export default CatsEyeTable;
