import { Box, Typography } from "@mui/material";

const SailBoatCard = () => {
  return (
    <Box sx={{ display: "flex", borderRadius: "1px solid white   " }}>
      <Box
        sx={{
          minHeight: "180px",
          width: "80px",
          bgcolor: "#17375e",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "1.3rem" }}>진</Typography>
        <Typography sx={{ fontSize: "1.3rem" }}>행</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            bgcolor: "gray",
            minHeight: "110px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-around", pt: 2 }}>
            <Typography>아르망</Typography>
            <Typography>[진행]</Typography>
            <Typography>[응원수 우선]</Typography>
            <Typography>[현재 응원수:34개]</Typography>
            <Typography>실행 시점: 2024.06.07 01:23:00</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            bgcolor: "#cfe2f3",
            gap: 5,
            height: "70px",
            alignItems: "center",
            pl: 2,
          }}
        >
          <Typography>현재:</Typography>
          <Typography>56명에게 전달</Typography>
          <Typography>124km 달림</Typography>
          <Typography>신고</Typography>
          <Typography>0건</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SailBoatCard;
