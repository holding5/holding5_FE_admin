import { Avatar, Box, Button, Link, Paper, Typography } from "@mui/material";

const HolpaMainCard = () => {
  return (
    // 1. 카드의 전체적인 틀 (Paper 사용)
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2, maxWidth: "1000px" }}>
      {/* 2. 상단: 유저 정보와 날짜 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        {/* 2-1. 좌측: 아바타와 텍스트 정보 */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: "#3A5A94", mr: 1.5, width: 48, height: 48 }}
          >
            {/* 아바타 내용, 비워두거나 첫 글자 사용 */}
          </Avatar>
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
                실버2
              </Typography>
              <Typography variant="body2">가벼운 이야기</Typography>
            </Box>
          </Box>
        </Box>

        {/* 2-2. 우측: 날짜 */}
        <Typography variant="caption" color="text.secondary">
          2025-11-30
        </Typography>
      </Box>

      {/* 3. 중단: 게시물 본문 */}
      <Typography variant="body2" sx={{ my: 3, color: "text.secondary" }}>
        나는 홀딩파이브가 참 좋습니다. 여기 와서 친구들에게 위로와 행복을 전할
        수 있어서 좋습니다. 정상 운영이 된다는 사실만으로도 정말 행복합니다.
        그래서 정말 좋아요
      </Typography>

      {/* 4. 하단: 링크와 액션 버튼 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 4-1. 좌측: 링크 */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="#" underline="hover" sx={{ fontSize: "0.8rem" }}>
            준비된 음성이 없습니다.
          </Link>
          <Link href="#" underline="hover" sx={{ fontSize: "0.8rem" }}>
            준비된 사진이 없습니다.
          </Link>
        </Box>

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

export default HolpaMainCard;
