import groupMemberData from "../modules/GroupMemberData";
import { Box, Stack } from "@mui/material";
import GroupMemberCard from "./GroupMemberCard.";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const GroupMemberGrid = ({ groupId }) => {
  const location = useLocation();
  const isManageMode = location.pathname.includes("/manage/");

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

  const [checkedIds, setCheckedIds] = useState([]);
  const handleCheck = (id) => {
    setCheckedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleCheckAll = () => {
    if(checkedIds.length === sliceUserData.length){
      setCheckedIds([]);
    }
    else {
      setCheckedIds(sliceUserData.map((u) => u.id));
    }
  }


  return (
    <Box component="section">
      {/* 관리하기 버튼 클릭 시 체크박스 */}
      {isManageMode && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, px: 2 }}>
          <Checkbox
            checked={
              checkedIds.length > 0 &&
              checkedIds.length === sliceUserData.length
            }
            onChange={handleCheckAll}
          />
          <Typography>전체선택</Typography>
        </Box>
      )}

      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        {sliceUserData.map((item) => {
          return (
            <GroupMemberCard
              key={item.id}
              groupId={item.groupId}
              id={item.id}
              img={item.img}
              name={item.name}
              nickName={item.nickName}
              showCheckbox={isManageMode}
              checked={checkedIds.includes(item.id)}
              onCheck={handleCheck}
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
