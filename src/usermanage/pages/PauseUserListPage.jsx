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
const PauseUserListPage = () => {
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
      reportDetails: { verbal: 2, spam: 3, inappropriate: 1 },
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
      reportDetails: { verbal: 2, spam: 3, inappropriate: 1 },
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
      reportDetails: { verbal: 2, spam: 3, inappropriate: 1 },
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
      reportDetails: { verbal: 2, spam: 3, inappropriate: 1 },
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="warning">
            정지해지
          </Button>
          <Button variant="contained" color="error">
            영구제명
          </Button>
        </Stack>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link underline="hover" color="inherit" href="#">
            회원관리
          </Link>
          <Link underline="hover" color="inherit" href="#">
            일시정지회원관리
          </Link>
          <Typography color="text.primary">리스트</Typography>
        </Breadcrumbs>
      </Box>

      <Stack spacing={2}>
        {users.map((user, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Box
              sx={{
                width: "30px",
                backgroundColor: "primary.main",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            />

            <Box sx={{ p: 2, flexGrow: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Link
                  to="detail"
                  underline="hover"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "primary.main",
                  }}
                >
                  {user.name}
                </Link>
                <Typography
                  variant="body1"
                  sx={{ color: user.statusColor, fontWeight: "bold" }}
                >
                  [{user.status}]
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                일시정지 시작 :{" "}
                <Typography component="span" sx={{ color: "error.main" }}>
                  {user.suspensionDate}
                </Typography>
                {" [ 정지시로부터 : "}
                <Typography component="span" sx={{ color: "error.main" }}>
                  {user.suspensionElapsed}일 경과
                </Typography>
                {" ] [ 자동해제 : "}
                {user.releaseDate}
                <Typography component="span" sx={{ color: "error.main" }}>
                  {" "}
                  잔여일 {user.remainingDays}일
                </Typography>
                {" ]"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                신고 총 {user.reportCount}건 : 언어폭력{" "}
                <Link href="#" underline="hover">
                  {user.reportDetails.verbal}건
                </Link>{" "}
                / 도배{" "}
                <Link href="#" underline="hover">
                  {user.reportDetails.spam}건
                </Link>{" "}
                / 부적절한 언어사용{" "}
                <Link href="#" underline="hover">
                  {user.reportDetails.inappropriate}건
                </Link>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default PauseUserListPage;
