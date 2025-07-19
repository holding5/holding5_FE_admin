import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const GroupMemberCard = ({ groupId, id, img, name, nickName, showCheckbox, checked, onCheck }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
        mb: "20px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {showCheckbox && (
        <Checkbox
          checked={checked}
          onChange={() => onCheck(id)}
          sx={{ alignSelf: "flex-start" }}
        />
      )}

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
