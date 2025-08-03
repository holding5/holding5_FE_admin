import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useOutletContext } from "react-router-dom";
const CatsEyeTable = () => {
  const { data, onClick } = useOutletContext();

  return (
    <Box sx={{ width: "1150px", margin: "50px auto" }}>
      <TableContainer>
        <Table
          size="small"
          sx={{
            tableLayout: "fixed",
            borderCollapse: "collapse",
            "& .MuiTableCell-root": {
              border: "1px solid #ccc",
            },
          }}
        >
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            {/* 첫 번째 헤더 줄 */}
            <TableRow sx={{ height: "45px" }}>
              <TableCell
                align="center"
                rowSpan={2} // 두 줄을 차지
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "5%",
                  backgroundColor: "#1976d2",
                }}
              >
                번호
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "10%",
                  backgroundColor: "#1976d2",
                }}
              >
                지역
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "25%", // 너비 조정
                  backgroundColor: "#1976d2",
                }}
              >
                내용
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "10%",
                  backgroundColor: "#1976d2",
                }}
              >
                신고자닉네임
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "10%",
                  backgroundColor: "#1976d2",
                }}
              >
                작성일
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                  backgroundColor: "#1976d2",
                }}
              >
                응원
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                  backgroundColor: "#1976d2",
                }}
              >
                신고
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                  backgroundColor: "#1976d2",
                }}
              >
                댓글수
              </TableCell>
              <TableCell
                align="center"
                colSpan={3} // 세 칸을 차지
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#1976d2",
                }}
              >
                신고처
              </TableCell>
              <TableCell
                align="center"
                rowSpan={2}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "7%",
                  backgroundColor: "#1976d2",
                }}
              >
                검색수
              </TableCell>
            </TableRow>

            <TableRow sx={{ height: "45px" }}>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                  backgroundColor: "#1976d2",
                }}
              >
                지역
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                  backgroundColor: "#1976d2",
                }}
              >
                학교
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                  backgroundColor: "#1976d2",
                }}
              >
                경찰
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                textAlign: "center",
                fontSize: "13px", // 가독성을 위해 폰트 사이즈 살짝 조정
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
                onClick={() => onClick(item.id)} // onClick에 id를 넘겨주는 방식으로 수정
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px", // 내용이 길어질 경우를 대비해 maxWidth 추가
                    textAlign: "left", // 내용은 왼쪽 정렬이 더 자연스러움
                  }}
                >
                  {item.content}
                </TableCell>
                <TableCell>{item.reporterNickname}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.cheerCount}</TableCell>
                <TableCell>{item.reportCount}</TableCell>
                <TableCell>{item.commentCount}</TableCell>
                {/* 신고처 하위 항목들 */}
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
