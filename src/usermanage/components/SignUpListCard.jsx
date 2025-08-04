import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpListCard = ({ userData }) => {
  const nav = useNavigate();
  const statusColors = {
    대기: "#27374D", // 이미지와 유사한 남색
    승인: "#4CAF50", // 녹색
    거절: "#F44336", // 빨강
    보류: "#FFC107", // 노랑
  };

  return (
    <Box
      sx={{
        display: "flex",
        mb: "15px",
        minHeight: "150px",
        cursor: "pointer",
      }}
      onClick={() => {
        nav(`/singupdetail/${userData.id}`);
      }}
    >
      <Box
        sx={{
          backgroundColor: statusColors[userData.state],
          display: "flex",
          color: "white",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          width: "60px",
        }}
      >
        {userData.state.split("").map((char, idx) => (
          <Typography key={idx} variant="inherit" sx={{ lineHeight: 1.2 }}>
            {char}
          </Typography>
        ))}
      </Box>

      <Stack
        spacing={2}
        sx={{
          backgroundColor: "rgb(236,236,236)",
          width: "80%",
          border: "1px solid rgb(180,180,180)",
          padding: "10px 20px",
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">{userData.name}</Typography>
          <Typography>{userData.type}</Typography>
          <Typography>{`${userData.birthDate}일생`}</Typography>
          <Typography>{userData.school}</Typography>
          <Typography>{userData.phone}</Typography>
        </Stack>

        <Typography>{`경력사항 : ${userData.career}`}</Typography>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Typography
            sx={{ flexGrow: 1, pr: "80px" }}
          >{`동기 및 자기소개 : ${userData.motivation}`}</Typography>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              flexShrink: 0,
              alignItems: "center",
              ml: -6,
              pr: "15px",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#3D5A80",
                color: "white",
                padding: "0px 15px",
              }}
            >
              첨부파일
            </Button>
            <Typography>{userData.applicationDate}</Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default SignUpListCard;
