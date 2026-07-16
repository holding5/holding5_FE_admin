import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Avatar, CircularProgress, Typography, Alert,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useHelperList } from "../hooks/useContributors";

const columns = [
  { key: "imageUrl", label: "사진", width: "70px" },
  { key: "name", label: "이름", width: "120px" },
  { key: "nickname", label: "닉네임", width: "120px" },
  { key: "role", label: "역할", width: "100px" },
  { key: "content", label: "인사말", width: "320px" },
];

/** 해피인(스타 해피인) 읽기 전용 목록. 지정/해제는 회원관리에서 처리. */
const HelperReadonlyTab = () => {
  const { rows, totalPages, page, setPage, loading, error } = useHelperList();

  return (
    <>
      <Alert severity="info" sx={{ mb: 1, fontSize: 12 }}>
        해피인은 회원관리에서 <b>스타 해피인</b>으로 지정된 회원 목록입니다. (지정/해제는 회원관리에서)
      </Alert>
      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key} align="center"
                    sx={{ color: "#fff", width: col.width, border: "1px solid #ccc", fontSize: "12px", whiteSpace: "nowrap" }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}><CircularProgress size={22} /></TableCell></TableRow>
              )}
              {!loading && error && (
                <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography sx={{ fontSize: 12, color: "error.main" }}>목록 조회에 실패했습니다.</Typography>
                </TableCell></TableRow>
              )}
              {!loading && !error && rows.length === 0 && (
                <TableRow><TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>스타 해피인이 없습니다.</Typography>
                </TableCell></TableRow>
              )}
              {!loading && !error && rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="center" sx={{ border: "1px solid #ccc" }}>
                    <Avatar src={row.imageUrl} sx={{ width: 40, height: 40, mx: "auto" }} />
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.name}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.nickname}</TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #ccc", fontSize: "12px" }}>{row.role}</TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", fontSize: "12px", maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
          showFirstButton showLastButton
          count={totalPages || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
          variant="outlined" shape="rounded"
        />
      </Paper>
    </>
  );
};

export default HelperReadonlyTab;
