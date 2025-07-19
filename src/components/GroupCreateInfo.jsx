import { Box, Stack, Typography, TextField } from "@mui/material";

const GroupCreateInfo = () => {
  const labelStyle = { width: "80px", fontWeight: 600 };

  return (
    <Box
      sx={{
        backgroundColor: "#e6f0f5",
        p: 2,
        borderRadius: 2,
        width: "420px",
      }}
    >
      {[
        ["소속", "소속 학교"],
        ["그룹명", "그룹명 입력"],
        ["소속인원", "숫자 입력"],
        ["개설일", "연도-월-일"],
        ["종료일", "연도-월-일"],
        ["대표자", "대표자명"],
        ["그룹코드", "자동 생성될 코드"],
      ].map(([label, placeholder]) => (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }} key={label}>
          <Typography sx={labelStyle}>{label}</Typography>
          <TextField
            placeholder={placeholder}
            size="small"
            fullWidth
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
        </Stack>
      ))}
    </Box>
  );
};

export default GroupCreateInfo;
