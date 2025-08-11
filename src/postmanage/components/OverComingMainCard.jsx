import { Avatar, Box, Button, Link, Paper, Typography } from "@mui/material";
import colors from "../../constant/colors";

const OverComingMainCard = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, maxWidth: "1000px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: "#3A5A94", mr: 1.5, width: 48, height: 48 }}
          ></Avatar>
          <Box>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>로즈마리</Typography>
              <Typography variant="body2" color="text.secondary">
                {`드림인 > 중학생`}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#D9A629",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                골드2
              </Typography>
              <Typography variant="body2">캐츠아이</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Button
            sx={{ backgroundColor: colors.SKY, py: 0.6, px: 3, color: "white" }}
          >
            이전 사연보기
          </Button>

          <Typography variant="caption" color="text.secondary">
            2025-11-30
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ my: 3, color: "text.secondary" }}>
        형곡중학교에서 2025년 3월2일에 피해자 1명을 가해자 3명을 식당 뒷편에서
        주먹으로 때렸다. 피해자는 이들로부터 지속적으로 괴롭힘을 당하고 있고
        가해자는 전혀 양심의 가책을 느끼지 못하는 것 같다. 가해자 너희들 정말
        그러지 마라 우리들이 다 지켜 보고 있다.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            응원해요 3
          </Typography>
          <Typography variant="body2" color="text.secondary">
            댓글 3
          </Typography>
          <Typography variant="body2" color="text.secondary">
            신고 3
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#F47D32",
              "&:hover": {
                bgcolor: "#D96D29",
              },
            }}
          >
            삭제
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OverComingMainCard;
