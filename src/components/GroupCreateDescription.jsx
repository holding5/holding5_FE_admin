import { Box, Typography, TextField } from "@mui/material";

const GroupCreateDescription = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e6f0f5",
        p: 2,
        borderRadius: 2,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontWeight="bold" mb={1}>
        [개설목적 및 취지]
      </Typography>
      <TextField
        placeholder='예: 청소년 상담 활동을 위한 그룹입니다...'
        multiline
        minRows={8}
        fullWidth
        sx={{ backgroundColor: "#fff", borderRadius: 1 }}
      />
    </Box>
  );
};

export default GroupCreateDescription;
