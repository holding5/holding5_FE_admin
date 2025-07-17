import groupMemberData from "../modules/GroupMemberData";
import { Box, Stack } from "@mui/material";
import GroupMemberCard from "./GroupMemberCard.";
import Pagination from "@mui/material/Pagination";
import { useState, useRef } from "react";

const GroupMemberGrid = ({ groupId }) => {
  const memberData = groupMemberData.filter(
    (member) => member.groupId == String(groupId)
  );
  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(memberData.length);
  const totalPages = Math.ceil(totalItem / itemsPerPage);
  const onChange = (e, value) => {
    setPage(value);
  };
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const sliceUserData = memberData.slice(startIdx, endIdx);

  return (
    <Box component="section">
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        {sliceUserData.map((item) => {
          return (
            <GroupMemberCard
              key={item.Id}
              groupId={item.groupId}
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

export default GroupMemberGrid;
