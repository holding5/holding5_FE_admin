import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  Link as MuiLink,
} from "@mui/material";
import React from "react";

const ReportInfoCard = () => {
  const nav = useNavigate();

  return (
    <Paper
      sx={{
        mt: 4,
        mb: 2,
        cursor: "pointer",
        backgroundColor: "rgba(236,236,236,1)",
        border: "1px solid black",
        borderRadius: 0,
        "&:hover": {
          backgroundColor: "rgba(220,220,220,1)",
          borderColor: "rgba(15, 13, 13, 1)",
          boxShadow: "0px 4px 8px rgba(18, 18, 18, 0.2)",
          transform: "translateY(-2px)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <Box sx={{ px: 2, pt: 1 }}>
        {/* 첫 번째 줄 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Typography variant="body1" fontWeight="bold">
            아르망{" "}
            <MuiLink component="span" sx={{ color: "skyblue" }}>
              (aa@hanmail.net)
            </MuiLink>
          </Typography>

          <Typography fontWeight="bold">[도배]</Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography>
            신고 시점:{" "}
            <Typography component="span" sx={{ color: "red" }}>
              2024.06.07 01:23:00
            </Typography>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 1,
            mb: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "#123456",
              color: "white",
              px: 2.5,
              py: 0.5,
              borderRadius: "20px",
              minWidth: "80px",
              textAlign: "center",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            자동정지
          </Box>

          <Typography sx={{ flexGrow: 1 }} noWrap>
            죽어 죽어 죽어 죽어 죽어 죽어 죽어...
          </Typography>

          <Typography>
            영구제명 시점:{" "}
            <Typography component="span" sx={{ color: "red" }}>
              2024.06.07 01:23:00
            </Typography>
          </Typography>

          <Checkbox sx={{ p: 0, ml: 1 }} />
        </Box>
      </Box>

      {/* 하단 바 */}
      <Box
        sx={{
          backgroundColor: "#a8d0ff",
          py: 1,
          px: 2,
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        신고 총 12건 : 언어폭력{" "}
        <Typography component="span" sx={{ color: "blue", mx: 0.5 }}>
          2
        </Typography>
        건 / 도배{" "}
        <Typography component="span" sx={{ color: "blue", mx: 0.5 }}>
          3
        </Typography>
        건 / 부적절한 언어사용{" "}
        <Typography component="span" sx={{ color: "blue", mx: 0.5 }}>
          1
        </Typography>
        건 / 음담패설, 성적희롱{" "}
        <Typography component="span" sx={{ color: "blue", mx: 0.5 }}>
          6
        </Typography>
        건
      </Box>
    </Paper>
  );
};

export default ReportInfoCard;
