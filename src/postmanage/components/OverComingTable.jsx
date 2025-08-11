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
const OverComingTable = () => {
  const { data, onClickPage } = useOutletContext();
  const [classification, setclassificationOption] = useState("all");
  const [dataNum, setDataNum] = useState(25);

  const handleChnageLoc = (e) => {
    setclassificationOption(e.target.value);
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
            <col style={{ width: "10%" }} /> {/* 분류 */}
            <col style={{ width: "15%" }} /> {/* 내용 (너비 축소) */}
            <col style={{ width: "8%" }} /> {/* 작성자 */}
            <col style={{ width: "8%" }} /> {/* 작성일 */}
            <col style={{ width: "7%" }} /> {/* 추천 */}
            <col style={{ width: "7%" }} /> {/* 신고 */}
            <col style={{ width: "8%" }} /> {/* 댓글수 */}
            <col style={{ width: "8%" }} /> {/* 극복영향 - 댓글위로 */}
            <col style={{ width: "8%" }} /> {/* 극복영향 - 생명메시지 */}
            <col style={{ width: "8%" }} />{" "}
            {/* 극복영향 - 희망메시지 (너비 확대) */}
            <col style={{ width: "8%" }} /> {/* 극복영향 - 남의사연*/}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Select
                  value={classification}
                  onChange={handleChnageLoc}
                  size="small"
                  fullWidth
                >
                  <MenuItem value={classification}>전체</MenuItem>
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
                분류
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
                작성자
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
                  <span>추천</span>
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
                colSpan={4}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                극복영향
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
                  <span>댓글위로</span>
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
                  <span>생명메시지</span>
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
                  <span>희망메시지</span>
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
                  <span>남의사연</span>
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
                <TableCell>{item.classification}</TableCell>
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
                <TableCell>{item.user}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.good}</TableCell>
                <TableCell>{item.report}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{item.comment_hope}</TableCell>
                <TableCell>{item.life}</TableCell>
                <TableCell>{item.hope}</TableCell>
                <TableCell>{item.others}</TableCell>
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

export default OverComingTable;
