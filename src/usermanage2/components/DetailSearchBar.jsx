// src/pages/components/DetailSearchBar.jsx
import React, { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import * as maps from "../../constant/codeMaps"; // ✅ codeMaps 사용
import { labelMapper } from "../../utils/LabelMapper"; // ✅ 라벨 표시는 여기로

const FormRow = ({ label, children }) => (
  <Box
    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, minWidth: 300 }}
  >
    <Typography sx={{ width: 90, fontSize: 14 }}>{label}</Typography>
    {children}
  </Box>
);

/** props: { defaultValues?, onApply(filters), onReset? } */
const DetailSearchBar = ({ defaultValues = {}, onApply, onReset }) => {
  // ✅ value를 항상 "코드(ENUM 키)"로 들고간다
  const [gender, setGender] = useState(defaultValues.gender ?? "");
  const [ageGroup, setAgeGroup] = useState(defaultValues.ageGroup ?? ""); // maps.ageGroupMap 키: "0"|"1"|"2"
  const [religion, setReligion] = useState(defaultValues.religion ?? "");
  const [rank, setRank] = useState(defaultValues.rank ?? ""); // 보류(전송X)
  const [status, setStatus] = useState(defaultValues.status ?? "");
  const [attendanceMin, setAttendanceMin] = useState(
    defaultValues.attendanceMin ?? 0
  ); // 보류(전송X)
  const [attendanceMax, setAttendanceMax] = useState(
    defaultValues.attendanceMax ?? 365
  ); // 보류(전송X)
  const [attendanceAvrgMin, setAttendanceAvrgMin] = useState(
    defaultValues.attendanceAvrgMin ?? 0
  ); // 보류(전송X)
  const [attendanceAvrgMax, setAttendanceAvrgMax] = useState(
    defaultValues.attendanceAvrgMax ?? 31
  ); // 보류(전송X)
  const [scoreMin, setScoreMin] = useState(defaultValues.scoreMin ?? 0); // 보류(전송X)
  const [scoreMax, setScoreMax] = useState(defaultValues.scoreMax ?? 1000); // 보류(전송X)
  const [joinDateStart, setJoinDateStart] = useState(
    defaultValues.createdFrom ?? ""
  );
  const [joinDateEnd, setJoinDateEnd] = useState(defaultValues.createdTo ?? "");

  // ageGroupMap 키("0","1","2") → BE ENUM(ELEMENTARY/MIDDLE/HIGH) 브릿지
  const AGE_GROUP_BRIDGE = { 0: "ELEMENTARY", 1: "MIDDLE", 2: "HIGH" };

  const compact = (obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== "" && v != null)
    );

  // ✅ API에 보낼 페이로드(스펙 항목만 전송)
  const makePayload = () =>
    compact({
      gender, // MAN | WOMAN
      religion, // NONE | BUDDHIST | CHRISTIAN | CATHOLIC
      status, // ACTIVE | SUSPENDED | BANNED
      ageGroup: AGE_GROUP_BRIDGE[ageGroup], // "0/1/2" → ENUM
      createdFrom: joinDateStart || undefined,
      createdTo: joinDateEnd || undefined,
    });

  const handleApply = () => onApply?.(makePayload());

  const handleReset = () => {
    setGender("");
    setAgeGroup("");
    setReligion("");
    setRank("");
    setStatus("");
    setAttendanceMin(0);
    setAttendanceMax(365);
    setAttendanceAvrgMin(0);
    setAttendanceAvrgMax(31);
    setScoreMin(0);
    setScoreMax(1000);
    setJoinDateStart("");
    setJoinDateEnd("");
    onReset?.();
    onApply?.({}); // 전송 파라미터 비움
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 1.5,
        p: 2,
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        backgroundColor: "#fff",
        mb: 1.5,
      }}
    >
      {/* 왼쪽 그룹 */}
      <Box>
        {/* 성별: maps.genderMap 키를 value로 */}
        <FormRow label="성별">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              displayEmpty // ✅ 빈값 표시 허용
              renderValue={(v) => (v ? labelMapper("genderMap", v) : "전체")}
            >
              <MenuItem value="">전체</MenuItem>
              {Object.keys(maps.genderMap).map((k) => (
                <MenuItem key={k} value={k}>
                  {labelMapper("genderMap", k)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormRow>

        {/* 구간구분: 현재 맵 키가 "0/1/2" → 표시만 라벨, 전송은 브릿지에서 ENUM으로 */}
        <FormRow label="구간구분">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              displayEmpty // ✅ 빈값 표시 허용
              renderValue={(v) => (v ? labelMapper("ageGroupMap", v) : "전체")}
            >
              <MenuItem value="">전체</MenuItem>
              {Object.keys(maps.ageGroupMap).map((k) => (
                <MenuItem key={k} value={k}>
                  {labelMapper("ageGroupMap", k)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormRow>

        {/* 종교 */}
        <FormRow label="종교">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              displayEmpty // ✅ 빈값 표시 허용
              renderValue={(v) => (v ? labelMapper("religionMap", v) : "전체")}
            >
              <MenuItem value="">전체</MenuItem>
              {Object.keys(maps.religionMap).map((k) => (
                <MenuItem key={k} value={k}>
                  {labelMapper("religionMap", k)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormRow>

        {/* 출첵누적 (UI 유지/전송 보류)
        <FormRow label="출첵누적">
          <TextField
            size="small"
            type="number"
            sx={{ width: 80 }}
            value={attendanceMin}
            onChange={(e) => setAttendanceMin(+e.target.value)}
          />
          <Typography>~</Typography>
          <TextField
            size="small"
            type="number"
            sx={{ width: 80 }}
            value={attendanceMax}
            onChange={(e) => setAttendanceMax(+e.target.value)}
          />
        </FormRow> */}

        {/* 출첵 월평균 (UI 유지/전송 보류)
        <FormRow label="출첵 월평균">
          <TextField
            size="small"
            type="number"
            sx={{ width: 80 }}
            value={attendanceAvrgMin}
            onChange={(e) => setAttendanceAvrgMin(+e.target.value)}
          />
          <Typography>~</Typography>
          <TextField
            size="small"
            type="number"
            sx={{ width: 80 }}
            value={attendanceAvrgMax}
            onChange={(e) => setAttendanceAvrgMax(+e.target.value)}
          />
        </FormRow> */}
      </Box>

      {/* 오른쪽 그룹 */}
      <Box>
        {/* 홀파등급 (UI 유지/전송 보류)
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
        </FormRow> */}

        {/* 홀파스코어 (UI 유지/전송 보류)
        <FormRow label="홀파스코어">
          <TextField
            size="small"
            type="number"
            sx={{ width: 80 }}
            value={scoreMin}
            onChange={(e) => setScoreMin(+e.target.value)}
          />
          <Typography>~</Typography>
          <TextField
            size="small"
            type="number"
            sx={{ width: 80 }}
            value={scoreMax}
            onChange={(e) => setScoreMax(+e.target.value)}
          />
        </FormRow> */}

        {/* 가입일 → createdFrom/createdTo로 전송 */}
        <FormRow label="가입일">
          <TextField
            size="small"
            type="date"
            sx={{ width: 150 }}
            value={joinDateStart}
            onChange={(e) => setJoinDateStart(e.target.value)}
          />
          <Typography>~</Typography>
          <TextField
            size="small"
            type="date"
            sx={{ width: 150 }}
            value={joinDateEnd}
            onChange={(e) => setJoinDateEnd(e.target.value)}
          />
        </FormRow>

        {/* 현상태 */}
        <FormRow label="현상태">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty // ✅ 빈값 표시 허용
              renderValue={(v) => (v ? labelMapper("statusMap", v) : "전체")}
            >
              <MenuItem value="">전체</MenuItem>
              {Object.keys(maps.statusMap).map((k) => (
                <MenuItem key={k} value={k}>
                  {labelMapper("statusMap", k)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormRow>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button onClick={handleReset} size="small">
            초기화
          </Button>
          <Button onClick={handleApply} variant="contained" size="small">
            적용
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DetailSearchBar;
