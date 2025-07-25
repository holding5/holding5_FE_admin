import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import LifeMessageSelectButton from "../components/LifeMessageSelectButton";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const LifeMessage = () => {
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
         <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LifeMessage;
