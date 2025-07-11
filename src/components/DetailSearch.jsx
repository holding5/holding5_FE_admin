import React from "react";
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
            <Select defaultValue="">
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="male">남</MenuItem>
              <MenuItem value="female">여</MenuItem>
            </Select>
          </FormControl>
        </FormRow>

        <FormRow label="구간구분">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
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
          <TextField size="small" type="number" sx={{ width: 80 }} defaultValue={0} />
          <Typography>~</Typography>
          <TextField size="small" type="number" sx={{ width: 80 }} defaultValue={365} />
        </FormRow>

        <FormRow label="출첵 월평균">
          <TextField size="small" type="number" sx={{ width: 80 }} defaultValue={0} />
          <Typography>~</Typography>
          <TextField size="small" type="number" sx={{ width: 80 }} defaultValue={31} />
        </FormRow>

        <FormRow label="종교">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="religion1">불교</MenuItem>
              <MenuItem value="religion2">기독교</MenuItem>
              <MenuItem value="religion3">무교</MenuItem>
            </Select>
          </FormControl>
        </FormRow>
      </Box>

      <Box>
        <FormRow label="홀파등급">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
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
          <TextField size="small" type="number" sx={{ width: 80 }} defaultValue={0} />
          <Typography>~</Typography>
          <TextField size="small" type="number" sx={{ width: 80 }} />
        </FormRow>

        <FormRow label="가입일">
          <TextField
            size="small"
            type="date"
            sx={{ width: 150 }}
            InputLabelProps={{ shrink: true }}
          />
          <Typography>~</Typography>
          <TextField
            size="small"
            type="date"
            sx={{ width: 150 }}
            InputLabelProps={{ shrink: true }}
          />
        </FormRow>

        <FormRow label="현상태">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="state1">활동중</MenuItem>
              <MenuItem value="state2">휴면</MenuItem>
              <MenuItem value="state3">일시정지</MenuItem>
              <MenuItem value="state4">영구퇴출</MenuItem>
            </Select>
          </FormControl>
        </FormRow>
      </Box>
    </Box>
  );
};

export default DetailSearch;
