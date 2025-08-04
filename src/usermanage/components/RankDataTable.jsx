import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";

import { useContext } from "react";
import { RankPageData } from "../pages/RankManagePage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const affiliationOptions = [
  { value: "all", label: "전체" },
  { value: "happyin", label: "(일반)해피인" },
  { value: "dreamin", label: "드림인" },
];

const ageGroupOptions = [
  { value: "all", label: "전체" },
  { value: "elementary", label: "초등학생" },
  { value: "middle", label: "중학생" },
  { value: "high", label: "고등학생" },
  { value: "20s", label: "20대" },
  { value: "30s", label: "30대" },
  { value: "40s_or_more", label: "40대이상" },
];

const rankOptions = [
  { value: "all", label: "전체" },
  { value: "happyin", label: "(일반)해피인" },
  { value: "dreamin", label: "드림인" },
];
const periodOptions = [
  { value: "1m", label: "1개월" },
  { value: "2m", label: "2개월" },
  { value: "3m", label: "3개월" },
  { value: "4m", label: "4개월" },
  { value: "5m", label: "5개월" },
  { value: "6m", label: "6개월" },
  { value: "7m", label: "7개월" },
  { value: "8m", label: "8개월" },
  { value: "9m", label: "9개월" },
  { value: "10m", label: "10개월" },
  { value: "11m", label: "11개월" },
  { value: "1y", label: "1년" },
];

const RankDataTable = () => {
  const { userData, columns } = useContext(RankPageData);
  const [affiliation, setAffiliation] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [rank, setRank] = useState("all");
  const [period, setPeriod] = useState("1m");

  const handleAffiliationChange = (event) => {
    setAffiliation(event.target.value);
    // TODO: 소속분류 필터링 로직 실행
  };

  const handleAgeGroupChange = (event) => {
    setAgeGroup(event.target.value);
    // TODO: 나이대 필터링 로직 실행
  };

  const handleRankChange = (event) => {
    setRank(event.target.value);
    // TODO: 등급 필터링 로직 실행
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const nav = useNavigate();
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
              <TableCell></TableCell>

              <TableCell>
                <Select
                  value={affiliation}
                  onChange={handleAffiliationChange}
                  size="small"
                  fullWidth
                >
                  {affiliationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={ageGroup}
                  onChange={handleAgeGroupChange}
                  size="small"
                  fullWidth
                >
                  {ageGroupOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={rank}
                  onChange={handleRankChange}
                  size="small"
                  fullWidth
                >
                  {rankOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell colSpan={3}></TableCell>
              <TableCell>
                <Select
                  value={period}
                  onChange={handlePeriodChange}
                  size="small"
                  fullWidth
                >
                  {periodOptions.map((option) => (
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
                  <span>닉네임</span>
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
                  <span>소속분류</span>
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
                  <span>나이대</span>
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
                  <span>등급</span>
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
                  <span>등급스코어</span>
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
                  <span>통합누적스코어</span>
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
                  <span>시작일</span>
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
                  <span>출석</span>
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
              "& .MuiTableCell-root": {
                textAlign: "center",
                fontSize: "14px",
                whiteSpace: "nowrap",
                border: "1px solid #ccc",
              },
            }}
          >
            {userData.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  nav("/rankmanagedetail");
                }}
                sx={{
                  height: "45px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nickname}</TableCell>
                <TableCell>{item.affiliation}</TableCell>
                <TableCell>{item.ageGroup}</TableCell>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.gradeScore}</TableCell>
                <TableCell>{item.totalScore}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.change}</TableCell>
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

export default RankDataTable;
