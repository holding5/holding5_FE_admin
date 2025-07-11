import { Box, Typography } from "@mui/material";
const UserCard = ({ img, name, nickName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
        mb: "20px",
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
          cursor: "pointer",
        }}
      ></Box>
      <Typography>{name}</Typography>
      <Typography>{`(${nickName}).`}</Typography>
    </Box>
  );
};

export default UserCard;
