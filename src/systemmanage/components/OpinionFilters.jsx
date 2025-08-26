// OpinionSection/OpinionFilters.jsx
import { Box, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const OpinionFilters = ({ value, onChange }) => {
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>직업카테고리</InputLabel>
          <Select
            label="직업카테고리"
            value={value.category}
            onChange={(e) => set({ category: e.target.value })}
          >
            {["전체", "배우", "가수", "운동선수", "작가"].map((v) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>정렬</InputLabel>
          <Select
            label="정렬"
            value={value.sort}
            onChange={(e) => set({ sort: e.target.value })}
          >
            {["가입순", "최신순", "인지도순", "가나다순"].map((v) => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default OpinionFilters;
