import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HappyManageImg from "../components/HappyManageImg";
import UserTable from "../components/UserTable";
import { Box } from "@mui/material";
const Main = () => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <UserTable />
      </Box>
    </Box>
  );
};

export default Main;
