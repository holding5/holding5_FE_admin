import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserCard = ({ id, img, name, nickName }) => {
  const nav = useNavigate();

  const onClickDetail = () => {
    nav(`/userdetail/${id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
        mb: "20px",
      }}
      onClick={onClickDetail}
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
