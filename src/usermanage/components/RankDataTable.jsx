import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box, // Box 추가
  FormControl, // FormControl 추가
  Select, // Select 추가
  MenuItem, // MenuItem 추가
  IconButton, // IconButton 추가
  Typography, // Typography 추가
  Pagination,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material"; // 아이콘 추가
import { useContext } from "react";
import { RankPageData } from "../pages/RankManagePage"; // 경로는 실제 프로젝트에 맞게 확인해주세요

const RankDataTable = () => {
  const { userData, columns } = useContext(RankPageData);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={`${col.field}-filter`}
                  sx={{ p: 1, borderBottom: "1px solid #e0e0e0" }}
                >
                  {col.filterable ? (
                    <FormControl size="small" fullWidth>
                      <Select displayEmpty value="전체">
                        <MenuItem value="전체">{col.headerName}</MenuItem>
                        {col.filterOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>

            <TableRow sx={{ backgroundColor: "#4682B4" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    borderRight: "1px solid #5a94c6",
                    width: col.width,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
                      {col.headerName}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <IconButton size="small" sx={{ p: 0, height: "12px" }}>
                        <ArrowDropUp sx={{ color: "#95b9d3" }} />
                      </IconButton>
                      <IconButton size="small" sx={{ p: 0, height: "12px" }}>
                        <ArrowDropDown sx={{ color: "#95b9d3" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {userData.map((row, idx) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: idx % 2 === 0 ? " #f2f2f2" : "#ffffff",
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.field} align={col.headerAlign || "left"}>
                    {col.renderCell
                      ? col.renderCell({ row, value: row[col.field] })
                      : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          color="primary"
          showFirstButton // '<<' 첫 페이지로 가는 버튼 표시
          showLastButton // '>>' 마지막 페이지로 가는 버튼 표시
        />
      </Box>
    </Box>
  );
};

export default RankDataTable;
