// components/SelectGroup.jsx
import {
  Stack, Grid, FormControlLabel, Checkbox, TextField, ToggleButton, ToggleButtonGroup,
  Chip, Typography, Divider, Switch, Autocomplete
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

const RELIGIONS = ["기독교", "천주교", "불교", "무교", "기타"];
const GRADES = ["초등", "중등", "고등", "20대", "30대", "40대 이상"];
const HAPPIN_TYPE1 = ["일반해피인", "또래해피인", "오피니언해피인", "그룹해피인"];
// TODO: 세부 분류(별표1)는 프로젝트 상수로 교체
const HAPPIN_TYPE2_SAMPLE = ["사회/정치", "경제/경영", "문화/예술", "미디어/콘텐츠"];
const COUNSELOR_TYPE1 = ["일반(해피인) 카운셀러", "또래해피인 카운셀러", "그룹해피인 카운셀러"];

export default function SelectGroup({ value, onChange }) {
  const v = value;

  const set = (patch) => onChange({ ...v, ...patch });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <Typography variant="subtitle1">발송 그룹대상자 선정</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={v.audience}
              onChange={(_, nv) => nv && set({ audience: nv })}
              size="small"
            >
              <ToggleButton value="dreamin">드림인</ToggleButton>
              <ToggleButton value="happin">해피인</ToggleButton>
              <ToggleButton value="both">전체</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={v.combine}
              onChange={(_, nv) => nv && set({ combine: nv })}
              size="small"
            >
              <ToggleButton value="intersect">교집합</ToggleButton>
              <ToggleButton value="union">합집합</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* 나이 */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <ToggleButtonGroup
                color="primary"
                exclusive
                value={v.ageType}
                onChange={(_, nv) => nv && set({ ageType: nv })}
                size="small"
              >
                <ToggleButton value="man">만나이</ToggleButton>
                <ToggleButton value="yeon">연나이</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                type="number"
                label="나이(From)"
                size="small"
                value={v.ageRange[0]}
                onChange={(e) =>
                  set({ ageRange: [Number(e.target.value), v.ageRange[1]] })
                }
                sx={{ width: 120 }}
              />
              <TextField
                type="number"
                label="나이(To)"
                size="small"
                value={v.ageRange[1]}
                onChange={(e) =>
                  set({ ageRange: [v.ageRange[0], Number(e.target.value)] })
                }
                sx={{ width: 120 }}
              />
            </Stack>
          </Grid>

          {/* 종교 */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              size="small"
              options={RELIGIONS}
              value={v.religion}
              onChange={(_, nv) => set({ religion: nv })}
              renderInput={(params) => <TextField {...params} label="종교" />}
            />
          </Grid>

          {/* 학년/연령대 */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              size="small"
              options={GRADES}
              value={v.grade}
              onChange={(_, nv) => set({ grade: nv })}
              renderInput={(params) => <TextField {...params} label="학년/연령대" />}
            />
          </Grid>

          {/* 해피인 분류 1/2 */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              size="small"
              options={HAPPIN_TYPE1}
              value={v.happinType1}
              onChange={(_, nv) => set({ happinType1: nv })}
              renderInput={(params) => <TextField {...params} label="해피인 분류 1" />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              size="small"
              options={HAPPIN_TYPE2_SAMPLE}
              value={v.happinType2}
              onChange={(_, nv) => set({ happinType2: nv })}
              renderInput={(params) => <TextField {...params} label="해피인 분류 2(별표1)" />}
            />
          </Grid>

          {/* 카운셀러 분류 */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              size="small"
              options={COUNSELOR_TYPE1}
              value={v.counselorType1}
              onChange={(_, nv) => set({ counselorType1: nv })}
              renderInput={(params) => <TextField {...params} label="카운셀러 분류 1" />}
            />
          </Grid>

          {/* 그룹별 발송 / 학교 검색 */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={v.groupSend}
                  onChange={(e) => set({ groupSend: e.target.checked })}
                />
              }
              label="그룹별 발송"
            />
            <Autocomplete
              disabled={!v.groupSend}
              size="small"
              options={["한양대학교", "영남대학교", "형곡중학교"]}
              value={v.school}
              onChange={(_, nv) => set({ school: nv })}
              renderInput={(params) => (
                <TextField {...params} label="학교명 검색" sx={{ mt: 1, maxWidth: 360 }} />
              )}
            />
          </Grid>

          {/* 예약 발송 */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={v.schedule.enabled}
                  onChange={(e) => set({ schedule: { ...v.schedule, enabled: e.target.checked } })}
                />
              }
              label="예약발송"
            />
            <DateTimePicker
              disabled={!v.schedule.enabled}
              value={v.schedule.at}
              onChange={(dt) => set({ schedule: { ...v.schedule, at: dt?.toDate?.() ?? dt } })}
              slotProps={{ textField: { size: "small", label: "예약 시간" } }}
              sx={{ mt: 1, maxWidth: 260 }}
            />
          </Grid>
        </Grid>

        {/* 현재 선택 요약 */}
        <Divider />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {v.religion.map((r) => <Chip key={r} label={`종교: ${r}`} />)}
          {v.grade.map((g) => <Chip key={g} label={`학년/연령: ${g}`} />)}
          {v.happinType1.map((h) => <Chip key={h} label={`해피인1: ${h}`} />)}
          {v.happinType2.map((h) => <Chip key={h} label={`해피인2: ${h}`} />)}
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
