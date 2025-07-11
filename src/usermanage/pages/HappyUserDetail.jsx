import { Button, InputBase, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContentSearchbar from "../../components/ContentSearchbar";
const HappyUserDetail = () => {
  const nav = useNavigate();

  return (
    <Box component="section">
      <Stack direction="row">
        <Button
          onClick={() => {
            nav(-1);
          }}
          sx={{ backgroundColor: "rgba(7, 209, 245, 1)" }}
        >
          back
        </Button>
        <ContentSearchbar />
      </Stack>
    </Box>
  );
};

export default HappyUserDetail;
