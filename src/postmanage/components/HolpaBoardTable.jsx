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
const HolpaBoardTable = () => {
  const { data, onClick } = useOutletContext();
  return (
    <Box sx={{ width: "1150px", margin: "50px auto" }}>
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
            borderCollapse: "collapse",
            "& .MuiTableCell-root": {
              border: "1px solid #ccc",
            },
          }}
        >
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow sx={{ height: "45px" }}>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "5%",
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
                  width: "10%",
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
                  width: "15%",
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
                  width: "10%",
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
                  width: "12%",
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
                  width: "6%",
                }}
              >
                추천
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                }}
              >
                신고
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
                }}
              >
                댓글수
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "6%",
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
                  width: "6%",
                }}
              >
                마음수
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "8%",
                }}
              >
                상태총점
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  width: "12%",
                }}
              >
                생명메시지발송
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                textAlign: "center",
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
