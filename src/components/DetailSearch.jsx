import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const FormRow = ({ label, children }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      mb: 1,
      minWidth: 300,
    }}
  >
    <Typography sx={{ width: "90px", fontSize: 14 }}>{label}</Typography>
    {children}
  </Box>
);

const DetailSearch = () => {
  const [gender, setGender ] = useState(""); // 성별
  const [ageGroup, setAgeGroup ] = useState(""); // 나이 그룹
  const [religion, setReligion ] = useState(""); // 종교
  const [rank, setRank] = useState(""); // 홀파 등급
  const [status, setStatus] = useState(""); // 상태
  const [attendanceMin, setAttendanceMin] = useState(0); // 출석 최소
  const [attendanceMax, setAttendanceMax] = useState(365); // 출석 최대
  const [attendanceAvrgMin, setAttendanceAvrgMin] = useState(0); // 출석 월평균 최소
  const [attendanceAvrgMax, setAttendanceAvrgMax] = useState(31); // 출석 월평균 최대
  const [scoreMin, setScoreMin] = useState(0); // 홀파 스코어 최소
  const [scoreMax, setScoreMax] = useState(1000); // 홀파 스코어 최대(최대값 모름)
  const [joinDateStart, setJoinDateStart] = useState(""); // 가입일
  const [joinDateEnd, setJoinDateEnd] = useState(""); // 가입일

  return (
    <Box
      sx={{
        border: "2px solid #800080",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        backgroundColor: "#fff",
      }}
    >
      <Box>
        <FormRow label="성별">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="male">남</MenuItem>
              <MenuItem value="female">여</MenuItem>
            </Select>
          </FormControl>
        </FormRow>

        <FormRow label="구간구분">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="age1">초등</MenuItem>
              <MenuItem value="age2">중등</MenuItem>
              <MenuItem value="age3">고등</MenuItem>
              <MenuItem value="age4">20대</MenuItem>
              <MenuItem value="age5">30대</MenuItem>
              <MenuItem value="age6">40대 이상</MenuItem>
            </Select>
          </FormControl>
        </FormRow>

        <FormRow label="출첵누적">
          <TextField size="small" type="number" sx={{ width: 80 }} value={attendanceMin} onChange={(e) => setAttendanceMin(e.target.value)} />
          <Typography>~</Typography>
          <TextField size="small" type="number" sx={{ width: 80 }} value={attendanceMax} onChange={(e) => setAttendanceMax(e.target.value)} />
        </FormRow>

        <FormRow label="출첵 월평균">
          <TextField size="small" type="number" sx={{ width: 80 }} value={attendanceAvrgMin} onChange={(e) => setAttendanceAvrgMin(e.target.value)} />
          <Typography>~</Typography>
          <TextField size="small" type="number" sx={{ width: 80 }} value={attendanceAvrgMax} onChange={(e) => setAttendanceAvrgMax(e.target.value)} />
        </FormRow>

        <FormRow label="종교">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={religion} onChange={(e) => setReligion(e.target.value)}>
              <MenuItem value="">무교</MenuItem>
              <MenuItem value="religion1">불교</MenuItem>
              <MenuItem value="religion2">기독교</MenuItem>
              <MenuItem value="religion3">천주교</MenuItem>
              <MenuItem value="religion4">기타</MenuItem>
            </Select>
          </FormControl>
        </FormRow>
      </Box>

      <Box>
        <FormRow label="홀파등급">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={rank} onChange={(e) => setRank(e.target.value)}>
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="rank1">브론즈</MenuItem>
              <MenuItem value="rank2">실버</MenuItem>
              <MenuItem value="rank3">골드</MenuItem>
              <MenuItem value="rank4">플래티넘</MenuItem>
              <MenuItem value="rank5">다이아몬드</MenuItem>
              <MenuItem value="rank6">레전드</MenuItem>
            </Select>
          </FormControl>
        </FormRow>

        <FormRow label="홀파스코어">
          <TextField size="small" type="number" sx={{ width: 80 }} value={scoreMin} onChange={(e) => setScoreMin(e.target.value)} />
          <Typography>~</Typography>
          <TextField size="small" type="number" sx={{ width: 80 }} value={scoreMax} onChange={(e) => setScoreMax(e.target.value)} />
        </FormRow>

        <FormRow label="가입일">
          <TextField
            size="small"
            type="date"
            sx={{ width: 150 }}
            value={joinDateStart}
            onChange={(e) => setJoinDateStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Typography>~</Typography>
          <TextField
            size="small"
            type="date"
            sx={{ width: 150 }}
            value={joinDateEnd}
            onChange={(e) => setJoinDateEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </FormRow>

        <FormRow label="현상태">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="status1">활동중</MenuItem>
              <MenuItem value="status2">휴면</MenuItem>
              <MenuItem value="status3">일시정지</MenuItem>
              <MenuItem value="status4">영구퇴출</MenuItem>
            </Select>
          </FormControl>
        </FormRow>
      </Box>
    </Box>
  );
};

export default DetailSearch;
