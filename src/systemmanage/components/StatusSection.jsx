import { Grid, Stack, Typography } from "@mui/material";
import StatTile from "./StatTile";
import PeriodSearch from "./PeriodSearch";

const StatusSection = ({ scope, badgeText, metrics, values, onSearch }) => {
  return (
    <Stack spacing={1.5} sx={{ my: 2 }}>
      {/* ⬆️ 라벨을 위쪽에 배치 */}
      <Typography
        sx={{
          display: "inline-block",
          px: 1.5,
          py: 0.6,
          borderRadius: 1,
          bgcolor: "#e67e22",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          width: "fit-content",
        }}
      >
        {badgeText}
      </Typography>

      {/* ⬇️ 라벨 밑에 통계 + 기간검색 한 줄 */}
      <Grid container alignItems="center" spacing={2}>
        {/* 통계 카드 */}
        <Grid item xs>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              flexWrap: "nowrap",
              overflowX: "auto", // 화면이 좁으면 가로 스크롤
              "&::-webkit-scrollbar": { height: 6 },
            }}
          >
            {metrics.map((m) => (
              <StatTile
                key={m.key}
                label={m.label}
                value={values[m.key]}
                width={160} // 카드 폭 줄이기
              />
            ))}
          </Stack>
        </Grid>

        {/* 날짜 검색 */}
        <Grid item>
          <PeriodSearch
            mode={
              scope.includes("month")
                ? "month"
                : scope.includes("year")
                ? "year"
                : "day"
            }
            onSearch={(range) => onSearch?.(scope, range)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default StatusSection;
