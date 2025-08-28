import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InputActions = ({ onSubmit }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
      <Stack direction="row" spacing={2}>
        <Button variant="text" color="inherit" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          등록
        </Button>
      </Stack>
    </Box>
  );
};

export default InputActions;
