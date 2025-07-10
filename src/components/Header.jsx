import "./Header.css";
import Searchbar from "./Searchbar";
import logoImage from "../assets/holding5.png";
import PersonIcon from "@mui/icons-material/Person";
import { Stack, Typography } from "@mui/material";

const Header = () => {
  return (
    <header className="Header">
      <section className="icon_section">
        <img src={logoImage} />
      </section>
      <Searchbar />
      <section className="text_section">홍길동 해피인님 반갑습니다.</section>
      <section className="mypage_section">
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon />
          <Typography>마이페이지</Typography>
        </Stack>
      </section>
    </header>
  );
};

export default Header;
