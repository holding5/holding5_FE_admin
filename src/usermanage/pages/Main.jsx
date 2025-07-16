import HappyManageImg from "./HappyManageImg";
import UserSelectButton from "../../components/UserSelectButton";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Box component="div" sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <UserSelectButton />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
