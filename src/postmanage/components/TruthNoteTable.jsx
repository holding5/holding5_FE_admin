import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

const TruthNoteTable = ({ mockData = [] }) => {
  const headerStyle = {
    textAlign: "center",
    color: "rgb(235,235,235)",
    backgroundColor: "#1976d2",
  };

  return (
    <Box>
      <TableContainer sx={{ maxHeight: "31.25rem" }}>
        <Table
          stickyHeader
          sx={{
            tableLayout: "fixed",
            borderCollapse: "collapse",
            "& .MuiTableCell-root": {
              border: "1px solid #ccc",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...headerStyle, width: "10%" }}>번호</TableCell>
              <TableCell sx={{ ...headerStyle, width: "25%" }}>
                닉네임
              </TableCell>
              <TableCell sx={headerStyle}>노트수/현재상태</TableCell>
              <TableCell sx={{ ...headerStyle, width: "15%" }}>
                처리상황
              </TableCell>
              <TableCell
                sx={{ width: "15%", border: "none !important" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.id}
                  </Box>
                </TableCell>

                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(19, 19, 245, 1)",
                    }}
                  >
                    {item.nickname}
                  </Box>
                </TableCell>

                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.noteCount} / {item.status}
                  </Box>
                </TableCell>

                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.processStatus}
                  </Box>
                </TableCell>

                <TableCell sx={{ padding: 0, border: "none !important" }}>
                  <Box
                    sx={{
                      height: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.processStatus === "복구대기" && (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "brown",
                          "&:hover": { backgroundColor: "darkred" },
                        }}
                      >
                        복구하기
                      </Button>
                    )}
                  </Box>
                </TableCell>
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

export default TruthNoteTable;
