import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Checkbox,
  FormGroup,
  Button,
  Stack,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import AdminModal from "./AdminModal";

const SignUpDetailSign = ({ userData }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const onClickModalOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onClickModalClose = () => {
    setAnchorEl(null);
  };

  const renderContent = (item) => {
    switch (item.type) {
      case "select":
        return (
          <FormControl>
            <Select value={item.value}>
              {item.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "readonly-textfield":
        return (
          <TextField
            fullWidth
            multiline
            rows={2}
            value={item.value}
            slotProps={{ readOnly: true }}
            variant="outlined"
          />
        );
    }
  };
  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Stack spacing={2}>
        {userData.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            spacing={2}
            sx={{ alignItems: "flex-start" }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ width: "130px", flexShrink: 0, pt: 1 }} // 고정 너비 지정
            >
              {item.label}
            </Typography>

            <Box sx={{ flexGrow: 1 }}>{renderContent(item)}</Box>
          </Stack>
        ))}
      </Stack>

      <Stack spacing={2}></Stack>

      <Stack
        direction="row"
        justifyContent="center"
        sx={{ gridColumn: "1 /span 2", mb: "10px", mt: "0px" }}
        spacing={1}
      >
        <Button
          sx={{
            backgroundColor: "RGB(23, 107, 187)",
            color: "white",
            padding: "5px 30px",
          }}
        >
          수정
        </Button>
        <Button
          sx={{
            backgroundColor: "RGB(230, 126, 34)",
            color: "white",
            padding: "5px 30px",
          }}
        >
          삭제
        </Button>
        <Button
          sx={{
            backgroundColor: "RGB(111, 161, 57)",
            color: "white",
            padding: "5px 50px",
          }}
          onClick={onClickModalOpen}
        >
          행정관리
        </Button>
      </Stack>

      <AdminModal anchorEl={anchorEl} onClose={onClickModalClose} />
    </Box>
  );
};

export default SignUpDetailSign;
