import userData from "../modules/UserData";
import { Box, Stack } from "@mui/material";
import UserCard from "./UserCard";
import Pagination from "@mui/material/Pagination";

const UserGrid = () => {
  const userdata = userData;

  return (
    <Box component="section">
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        {userdata.map((item) => {
          return (
            <UserCard
              key={item.id}
              img={item.img}
              name={item.name}
              nickName={item.nickName}
            />
          );
        })}
      </Stack>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", mb: "10px" }}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default UserGrid;
