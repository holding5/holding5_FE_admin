import HeaderSearchbar from "./HeaderSearchbar";
import logoImage from "../assets/holding5.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Stack, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const nav = useNavigate();
  const onClickHome = () => {
    nav("/");
  };
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "10px 10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ paddingLeft: "20px" }}
      >
        <Box
          component="img"
          src={logoImage}
          sx={{ height: 40 }}
          onClick={onClickHome}
        />
        <HeaderSearchbar />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography sx={{ mt: 1 }}>
          <Box
            component="span"
            sx={{ color: "#00BFFF", fontWeight: "bold", fontSize: "20px" }}
          >
            홍길동
          </Box>{" "}
          해피인님 반갑습니다.
        </Typography>

        <Stack alignItems="center" sx={{ cursor: "pointer" }}>
          <PersonOutlineIcon sx={{ fontSize: 30 }} />
          <Typography variant="caption">마이페이지</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
