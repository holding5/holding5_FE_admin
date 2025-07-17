import { Box, Typography } from "@mui/material";

const GroupMemberCard = ({ groupId, id, img, name, nickName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
        mb: "20px",
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={img}
        alt={name}
        sx={{
          width: "150px",
          height: "150px",
          borderRadius: "100px",
          mb: 1,
        }}
      ></Box>
      <Typography>{name}</Typography>
      <Typography>{`(${nickName}).`}</Typography>
    </Box>
  );
};

export default GroupMemberCard;
