// PeriodSearch.jsx
import { Stack, Button } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMemo, useState } from "react";

const PeriodSearch = ({ mode = "day", onSearch }) => {
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs());
  const views = useMemo(
    () => (mode === "day" ? ["year", "month", "day"] : mode === "month" ? ["year", "month"] : ["year"]),
    [mode]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "nowrap" }}>
        <DatePicker
          value={from}
          onChange={setFrom}
          views={views}
          slotProps={{ textField: { size: "small", sx: { width: 140 } } }}  // ⬅️ 폭 축소
        />
        <span>—</span>
        <DatePicker
          value={to}
          onChange={setTo}
          views={views}
          slotProps={{ textField: { size: "small", sx: { width: 140 } } }}  // ⬅️ 폭 축소
        />
        <Button size="small" variant="contained" onClick={() => onSearch?.({ from, to })}>
          검색
        </Button>
      </Stack>
    </LocalizationProvider>
  );
};

export default PeriodSearch;
