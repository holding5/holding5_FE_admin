import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Link as MuiLink,
  Paper,
  Checkbox,
} from "@mui/material";
import React from "react";
const BannedUserCard = ({ userData }) => {
  const nav = useNavigate();
  return (
    <Paper
      sx={{
        display: "flex",
        py: 1.5,
        mb: 2,
        cursor: "pointer",
        backgroundColor: "rgba(236,236,236,1)",
        border: "1px solid black",
        borderRadius: 0,
        "&:hover": {
          backgroundColor: "rgba(220,220,220,1)",
          borderColor: "rgba(15, 13, 13, 1)",
          boxShadow: "0px 4px 8px rgba(18, 18, 18, 0.2)",
          transform: "translateY(-2px)",
          transition: "all 0.3s ease-in-out",
        },
      }}
      onClick={() => {
        nav("detail");
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: "90%",
          padding: "10px 20px",
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ display: "flex", gap: 15 }}>
              <MuiLink sx={{ color: "RGB(0, 123, 255)" }} to={"detail"}>
                {userData.nickname}
              </MuiLink>
              <Typography component="span">[영구제명]</Typography>
            </Typography>
          </Box>
          <Box>
            <Typography>
              영구제명 시점 :&nbsp;
              <Typography component="span" sx={{ color: "rgb(236,0,0)" }}>
                {userData.banTime}
              </Typography>
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            신고 총 {userData.reports.total}건 :&nbsp;
            {userData.reports.details.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.type}&nbsp;
                <MuiLink component={RouterLink}>{item.count}건</MuiLink>
                {idx < userData.reports.details.length - 1 && " / "}
              </React.Fragment>
            ))}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Checkbox />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default BannedUserCard;
