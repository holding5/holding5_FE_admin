import {
  Grid,
  Paper,
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Menu,
  Button,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const PauseUserDetailEvaluation = ({ userData }) => {
  const [option, setOption] = useState("all");

  const onChangeOption = (e) => {
    setOption(e.target.value);
  };

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const options = [
    { value: "all", label: "전체" },
    { value: "life", label: "생명메시지" },
    { value: "hope", label: "희망메시지" },
    { value: "holpa", label: "홀파담벼락" },
    { value: "text", label: "댓글" },
  ];

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
    backgroundColor: "rgba(251, 27, 27, 1)",
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Stack direction="row" spacing={3} sx={{ pl: "3rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                <MenuItem value="life">생명메시지</MenuItem>
                <MenuItem value="hope">희망메시지</MenuItem>
                <MenuItem value="holpa">홀파담벼락</MenuItem>
                <MenuItem value="text">댓글</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>기간 : </Typography>
          </Box>

          <DatePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{ width: "10rem" }}
            format="YYYY-MM-DD"
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">~</Typography>
          </Box>

          <DatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{ width: "10rem" }}
            format="YYYY-MM-DD"
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#27374D",
              "&:hover": { backgroundColor: "#1a2533" },
            }}
          >
            검색
          </Button>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "2rem" }}>
          <Box sx={header1Style}>
            <Typography>카테고리</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>게시 수</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>게시반응(좋아요)</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>발송수 / 청취수</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}>
            <Typography>생명메시지</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>12</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>125</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>145</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}>
            <Typography>희망메시지</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>23</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>5678</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>566</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}>
            <Typography>홀파담벼락</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>2</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>56</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}>
            <Typography>댓글</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>35</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>5</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={header1Style}>
            <Typography>카운셀링 수</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>평점</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>홀파 스코어</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>홀파 등급</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}>
            <Typography>34</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>4.6</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>125</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>골드레벨2</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={header1Style}>
            <Typography>출석수(누적1년)</Typography>
          </Box>

          <Box sx={header1Style}>
            <Typography>월평균 출석률</Typography>
          </Box>

          <Box sx={{ width: "12rem", height: "2.2rem" }}>
            <Typography></Typography>
          </Box>

          <Box sx={header2Style}>
            <Typography>생명살린 수</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={mainStyle}>
            <Typography>160</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>20</Typography>
          </Box>
          <Box sx={{ width: "12rem", height: "2.2rem" }}>
            <Typography></Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>3</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem" }}>
          <Box sx={header3Style}>
            <Typography>홀파 해피인 스코어</Typography>
          </Box>

          <Box sx={header3Style}>
            <Typography>홀파 해피인 등급</Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} sx={{ mt: "1rem", mb: "1.2rem" }}>
          <Box sx={mainStyle}>
            <Typography>3250</Typography>
          </Box>
          <Box sx={mainStyle}>
            <Typography>골드레벨2</Typography>
          </Box>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default PauseUserDetailEvaluation;
