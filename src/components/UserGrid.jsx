import userData from "../modules/UserData";
import { Box, Stack } from "@mui/material";
import UserCard from "./UserCard";
import Pagination from "@mui/material/Pagination";
import { useState, useRef } from "react";

const UserGrid = () => {
  const userdata = userData;
  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(userData.length);
  const totalPages = Math.ceil(totalItem / itemsPerPage);
  const onChange = (e, value) => {
    setPage(value);
  };
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const sliceUserData = userdata.slice(startIdx, endIdx);

  return (
    <Box component="section">
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        {sliceUserData.map((item) => {
          return (
            <UserCard
              key={item.id}
              id={item.id}
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
        count={totalPages}
        page={page}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default UserGrid;
