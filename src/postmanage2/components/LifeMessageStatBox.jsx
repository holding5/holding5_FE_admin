import { Box, Typography } from "@mui/material";

const LifeMessageStatBox = ({ label, count, color = "#1976d2" }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "6px",
        px: 2,
        py: 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        minWidth: 180,
      }}
    >
      <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: "18px", color }}>
        {count.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default LifeMessageStatBox;
