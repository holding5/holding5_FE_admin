import GroupData from "../modules/GroupData";
import { Box, Stack } from "@mui/material";
import GroupCard from "./GroupCard";
import Pagination from "@mui/material/Pagination";
import { useState, useRef } from "react";

const GroupGrid = () => {
  const groupData = GroupData;
  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(GroupData.length);
  const totalPages = Math.ceil(totalItem / itemsPerPage);
  const onChange = (e, value) => {
    setPage(value);
  };
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const sliceUserData = groupData.slice(startIdx, endIdx);

  return (
    <Box component="section">
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        {sliceUserData.map((item) => {
          return (
            <GroupCard
              key={item.id}
              id={item.id}
              img={item.img}
              school={item.school}
              department={item.department}
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

export default GroupGrid;
