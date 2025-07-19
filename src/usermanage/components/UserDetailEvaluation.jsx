import {
  Grid,
  Paper,
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Menu,
  Button,
} from "@mui/material";

const UserDetailEvaluation = () => {
  const options = [
    { value: "all", label: "전체" },
    { value: "life", label: "생명메시지" },
    { value: "hope", label: "희망메시지" },
    { value: "holpa", label: "홀파담벼락" },
    { value: "text", label: "댓글" },
  ];

  return (
    <Box>
      <Stack direction="row">
        <Button></Button>
      </Stack>
    </Box>
  );
};

export default UserDetailEvaluation;
