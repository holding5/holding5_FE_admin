import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

const OverComingCommentCard = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, maxWidth: "900px" }}>
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
                {"경상북도 > 구미시"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary">
          2025-11-30
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ my: 3, color: "text.secondary" }}>
        나는 홀딩파이브가 참 좋습니다. 여기 와서 친구들에게 위로와 행복을 전할
        수 있어서 좋습니다. 정상 운영이 된다는 사실만으로도 정말 행복합니다.
        그래서 정말 좋아요
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end ",
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

export default OverComingCommentCard;
