import "./Header.css";
import Searchbar from "./Searchbar";
import logoImage from "../assets/holding5.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Stack, Typography } from "@mui/material";

const Header = () => {
  return (
    <header className="Header">
      <section className="left_group">
        <img src={logoImage} />
        <Searchbar />
      </section>
      <section className="right_group">
        <Typography sx={{ mt: 4 }}>
          <span style={{ color: "#00BFFF", fontWeight: "bold" }}>홍길동</span>{" "}
          해피인님 반갑습니다.
        </Typography>

        <Stack direction="column" alignItems="center" spacing={1}>
          <div className="mypage">
            <PersonOutlineIcon sx={{ white: "black", fontSize: 30 }} />
            <Typography>마이페이지</Typography>
          </div>
        </Stack>
      </section>
    </header>
  );
};

export default Header;
