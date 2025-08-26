// StatTile.jsx
import { Box, Typography, TextField } from "@mui/material";

const StatTile = ({ label, value }) => {
  return (
    <Box
      sx={{
        width: 110, // ✅ 카드 폭 (원하는 크기로 조절)
        border: "1px solid #cfd8dc",
        borderRadius: 1,
        background: "#0b2b47", // 상단 배경
        p: 1,
      }}
    >
      {/* 라벨 */}
      <Typography
        sx={{
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          mb: 0.5,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>

      {/* 값 */}
      <TextField
        size="small"
        fullWidth
        value={value ?? ""}
        inputProps={{ readOnly: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#fff",           // ✅ 밝은 배경
            borderRadius: "4px",
            fontWeight: 600,
          },
          "& .MuiOutlinedInput-input": {
            color: "#111",             // ✅ 진한 글자색
            textAlign: "center",       // ✅ 중앙정렬 (옵션)
          },
        }}
      />
    </Box>
  );
};

export default StatTile;
