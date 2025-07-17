import { useParams } from "react-router-dom";
import GroupInfoData from "../modules/GroupInfoData";
import GroupInfoCard from "../components/GroupInfoCard";
import { Box, Typography } from "@mui/material";

const GroupInfo = ({ groupId }) => {

  const group = GroupInfoData.find((item) => item.groupId == String(groupId));

  if (!group) {
    return <Typography>존재하지 않는 그룹입니다.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <GroupInfoCard {...group} />
    </Box>
  );
};

export default GroupInfo;
