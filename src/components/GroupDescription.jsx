import { Box, Typography, Stack } from "@mui/material";
import GroupInfoData from "../modules/GroupInfoData";

const GroupDescription = ({ groupId }) => {
  const group = GroupInfoData.find((g) => g.groupId === groupId);

  if (!group?.description) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#e6f0f5",
        p: 2,
        borderRadius: 2,
        width: "100%",
        maxWidth: 600,
        mt: 3,
        minHeight: "190px",
      }}
    >
      <Typography fontWeight="bold" mb={1}>
        [개설목적 및 주최]
      </Typography>
      <Typography whiteSpace="pre-line">
        {group.description}
      </Typography>
    </Box>
  );
};

export default GroupDescription;
