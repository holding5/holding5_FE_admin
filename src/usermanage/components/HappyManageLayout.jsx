import UserSelectButton from "../../components/UserSelectButton";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
const HappyManageLayout = () => {
  return (
    <Box>
      <UserSelectButton></UserSelectButton>
      <Outlet></Outlet>
    </Box>
  );
};

export default HappyManageLayout;
