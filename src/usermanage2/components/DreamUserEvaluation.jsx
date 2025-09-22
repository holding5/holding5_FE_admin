import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useDreaminEvaluation from "../../hooks/useDreaminEvaluation";

const DreamUserEvaluation = () => {
  const { id } = useParams();
  const memberId = id;

  const [option, setOption] = useState("all");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const { data, loading, error, fetchByPeriod } = useDreaminEvaluation(memberId);

  const onChangeOption = (e) => {
    setOption(e.target.value);
  };

  const handleSearch = () => {
  if (!startDate || !endDate) return;

  const from = startDate.format("YYYY-MM-DD");
  const to = endDate.format("YYYY-MM-DD");

  fetchByPeriod(from, to);
};

  const header1Style = {
    color: "white",
    fontSize: "1rem",
    backgroundColor: "rgb(104, 58, 172)",
    borderRadius: "3px",
    width: "12rem",
    height: "2.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const header2Style = {
    color: "white",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 134, 47, 1)",
    borderRadius: "3px",
    width: "12rem",
    height: "2.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const header3Style = {
    color: "white",
    fontSize: "1rem",
    backgroundColor: "rgb(62, 131, 151)",
    borderRadius: "3px",
    width: "12rem",
    height: "2.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const mainStyle = {
    color: "rgba(116, 116, 116, 1)",
    fontSize: "1rem",
    backgroundColor: "rgba(209, 209, 209, 1)",
    borderRadius: "3px",
    width: "12rem",
    height: "2.2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgb(236,236,236)",
    boxSizing: "border-box",
  };

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 3, pl: 8 }}>
        <Stack direction="row" spacing={3} sx={{ pl: "3rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <FormControl size="small">
              <Select
                value={option}
                onChange={onChangeOption}
                sx={{
                  backgroundColor: "rgba(164, 83, 16, 1)",
                  color: "white",
                  width: "6.5rem",
                  textAlign: "center",
                  height: "2rem",
                }}
              >
                <MenuItem value="all">전체</MenuItem>
                <MenuItem value="holpa">홀파담벼락</MenuItem>
                <MenuItem value="text">댓글</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>기간 : </Typography>
          </Box>

          <DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} slotProps={{ textField: { size: "small" } }} sx={{ width: "10rem" }} format="YYYY-MM-DD" />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">~</Typography>
          </Box>
          <DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} slotProps={{ textField: { size: "small" } }} sx={{ width: "10rem" }} format="YYYY-MM-DD" />

          <Button 
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#27374D", "&:hover": { backgroundColor: "#1a2533" } }}>
            검색
          </Button>
        </Stack>

        {/* 벽 + 댓글 */}
        <Stack direction="row" gap={2} sx={{ mt: "2rem" }}>
          <Box sx={header1Style}><Typography>카테고리</Typography></Box>
          <Box sx={header1Style}><Typography>게시 수</Typography></Box>
          <Box sx={header1Style}><Typography>게시반응(좋아요)</Typography></Box>
          <Box sx={header1Style}><Typography>신고 건수</Typography></Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}><Typography>홀파담벼락</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.wall?.postCount}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.wall?.likeCount}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.wall?.reportCount}</Typography></Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}><Typography>댓글</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.comment?.postCount}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.comment?.likeCount}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.comment?.reportCount}</Typography></Box>
        </Stack>

        {/* 스코어 등급 출석 */}
        <Stack direction="row" gap={2} sx={{ mt: "2rem" }}>
          <Box sx={header3Style}><Typography>홀파 스코어</Typography></Box>
          <Box sx={header3Style}><Typography>홀파 등급</Typography></Box>
          <Box sx={header1Style}><Typography>출석수(누적1년)</Typography></Box>
          <Box sx={header1Style}><Typography>월평균 출석률</Typography></Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}><Typography>{data?.hpaScore}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.grade}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.attendanceCount}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.monthlyAttendanceRate}</Typography></Box>
        </Stack>

        {/* 가입일, 총 출석 */}
        <Stack direction="row" gap={2} sx={{ mt: "2rem" }}>
          <Box sx={header2Style}><Typography>최초 가입일</Typography></Box>
          <Box sx={header2Style}><Typography>총 출석일</Typography></Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem", mb: "2rem" }}>
          <Box sx={mainStyle}><Typography>{data?.createdAt}</Typography></Box>
          <Box sx={mainStyle}><Typography>{data?.totalAttendanceDays}</Typography></Box>
        </Stack>
      </Paper>
    </LocalizationProvider>
  );
};

export default DreamUserEvaluation;
