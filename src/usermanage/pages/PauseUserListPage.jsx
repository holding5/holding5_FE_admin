import {
  Box,
  Button,
  Paper,
  Typography,
  Checkbox,
  Breadcrumbs,
  Stack,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PauseUserListPage = () => {
  const nav = useNavigate();
  const users = [
    {
      name: "스코어의 남자",
      status: "일시 정지중",
      statusColor: "black",
      suspensionDate: "2024.06.07 01:23:00",
      suspensionElapsed: 13,
      releaseDate: "2024.07.06",
      remainingDays: 17,
      reportCount: 6,
      verbal: 2,
      spam: 3,
      inappropriate: 1,
    },
    {
      name: "팔불출",
      status: "일시 정지중",
      statusColor: "black",
      suspensionDate: "2024.06.07 01:23:00",
      suspensionElapsed: 13,
      releaseDate: "2024.07.06",
      remainingDays: 17,
      reportCount: 6,
      verbal: 2,
      spam: 3,
      inappropriate: 1,
    },
    {
      name: "어메이징",
      status: "조기해제",
      statusColor: "black",
      suspensionDate: "2024.06.07 01:23:00",
      suspensionElapsed: 13,
      releaseDate: "2024.07.06",
      remainingDays: 17,
      reportCount: 6,
      verbal: 2,
      spam: 3,
      inappropriate: 1,
    },
    {
      name: "코코바지",
      status: "만기해제",
      statusColor: "black",
      suspensionDate: "2024.06.07 01:23:00",
      suspensionElapsed: 13,
      releaseDate: "2024.07.06",
      remainingDays: 17,
      reportCount: 6,
      verbal: 2,
      spam: 3,
      inappropriate: 1,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Button variant="contained" color="warning">
          정지해지
        </Button>
        <Button variant="contained" color="error">
          영구제명
        </Button>
      </Stack>

      {users.map((user) => (
        <Box
          sx={{
            display: "flex",
            mb: "15px",
            minHeight: "150px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#27374D",

              display: "flex",
              color: "white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              width: "60px",
            }}
          ></Box>

          <Stack
            spacing={2}
            sx={{
              backgroundColor: "rgb(236,236,236)",
              border: "1px solid rgb(180,180,180)",
              padding: "10px 20px",
              width: "80%",
            }}
          >
            <Stack direction="row" gap={2}>
              <Box
                onClick={() => {
                  nav("/pausedmanage/detail");
                }}
                sx={{
                  cursor: "pointer",
                  color: "rgba(0, 72, 255, 1)",
                  minWidth: "150px",
                }}
              >
                <Typography variant="h6">{user.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{`[${user.status}]`}</Typography>
              </Box>
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography>
                일시정지 시점 :{" "}
                <Typography component="span" sx={{ color: "red" }}>
                  {user.suspensionDate}
                </Typography>
              </Typography>
              <Typography>
                [정지시로부터 :{" "}
                <Typography component="span" sx={{ color: "red" }}>
                  {user.suspensionElapsed}
                </Typography>
                일 경과]
              </Typography>
              <Typography>
                [자동해제: {user.releaseDate} 잔여일{" "}
                <Typography component="span" sx={{ color: "red" }}>
                  {user.remainingDays}일
                </Typography>
                ]
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography>신고 총 {user.reportCount}건 : </Typography>
              <Typography>언어폭력 {user.verbal}건 / </Typography>
              <Typography>도배 {user.spam}건 / </Typography>
              <Typography>부적절한 언어사용 {user.inappropriate}건 </Typography>
            </Stack>

            <Stack
              direction="row"
              sx={{ justifyContent: "flex-end", width: "100%" }}
            >
              <Checkbox sx={{ height: "2rem" }} />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default PauseUserListPage;
