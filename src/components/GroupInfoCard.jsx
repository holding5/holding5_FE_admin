import { Box, Stack, Typography } from "@mui/material";

const GroupInfoCard = ({
  logo,
  school,
  groupName,
  count,
  startDate,
  endDate,
  duration,
  leader,
}) => {
  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      sx={{
        backgroundColor: "#e6f0f5",
        p: 2,
        borderRadius: 2,
        width: "100%",
        maxWidth: 700,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="그룹 로고"
        sx={{ width: 100, height: 100, borderRadius: "8px" }}
      />

      <Box>
        {[
          ["소속", school],
          ["그룹명", groupName],
          ["소속인원", `${count}명`],
          ["개설일", startDate],
          ["종료일", `${endDate} (${duration})`],
          ["대표자", leader],
        ].map(([label, value]) => (
          <Stack key={label} direction="row" spacing={1} sx={{ mb: 0.5 }}>
            <Box sx={{ width: "80px", fontWeight: 500 }}>{label} :</Box>
            <Box>{value}</Box>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
};

export default GroupInfoCard;
