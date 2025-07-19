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
import FooterBtn from "./FooterBtn";
const SignUpDetailSign = ({ userData }) => {
  const [approvalStatus, setApprovalStatus] = useState("approve");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAdminClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAnchorEl(null);
  };

  const approvalMessages = {
    approve:
      "해피인에 응모해 주셔서 감사합니다. 심사결과 귀하는 홀딩파이브 해피인에 적합한 것으로 판단되어 일반 해피인이 되셨습니다. 더욱 책임감을 가지고 청소년들을 사랑해 주시기를 부탁드립니다. 해피인에 대한 자세한 내용은 별도공지를 통해 전달해 드리겠습니다. 감사합니다.",
    reject:
      "죄송합니다. 귀하는 이번 홀딩파이브 해피인 모집에 적합하지 않은 것으로 판단되었습니다. 다음에 더 좋은 기회로 만나 뵙기를 바랍니다.",
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
    <Box sx={{ padding: "20px 40px" }}>
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
              sx={{ width: "130px", flexShrink: 0, pt: 1 }}
            >
              {item.label}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>{renderContent(item)}</Box>
          </Stack>
        ))}

        <Divider sx={{ borderColor: "lightgreen", my: 2 }} />

        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ width: "130px", flexShrink: 0, pt: 1 }}
          >
            직책/직분
          </Typography>
          <Box>
            <TextField
              fullWidth
              value="한국대학교 총장"
              slotProps={{ readOnly: true }}
              sx={{ backgroundColor: "#fff8e1" }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <FormControl sx={{ width: "130px", flexShrink: 0 }}>
            <RadioGroup
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value)}
            >
              <FormControlLabel
                value="approve"
                control={<Radio />}
                label="승인문장"
              />
              <FormControlLabel
                value="reject"
                control={<Radio />}
                label="거절문장"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={approvalMessages[approvalStatus]}
              slotProps={{ readOnly: true }}
              sx={{ backgroundColor: "#fff8e1" }}
            />
          </Box>
        </Stack>
        <FooterBtn
          leftText="승인"
          midText="거절"
          rightText="행정관리"
          rightClick={handleAdminClick}
        />
        <AdminModal anchorEl={anchorEl} onClose={handleAdminClose} />
      </Stack>
    </Box>
  );
};

export default SignUpDetailSign;
