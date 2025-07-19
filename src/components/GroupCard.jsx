import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const GroupCard = ({ id, img, school, department }) => {
  const nav = useNavigate();

  const onClickDetail = () => {
    nav(`/happy-manage/group/detail/${id}`);
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
      <Typography>{school}</Typography>
      <Typography>{`(${department}).`}</Typography>
    </Box>
  );
};

export default GroupCard;
