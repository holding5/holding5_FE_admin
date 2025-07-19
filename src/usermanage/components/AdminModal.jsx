import {
  Popover,
  Box,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
  Stack,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useState } from "react";

const AdminModal = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);

  // 현재 선택된 라디오 버튼의 값을 관리하는 state
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleApply = () => {
    console.log("선택된 조치:", selectedValue);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 3, width: "auto", minWidth: 650 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          행정 관리
        </Typography>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedValue} onChange={handleRadioChange}>
            {/* 1. 즉시 징계 해지 */}
            <FormControlLabel
              value="release"
              control={<Radio />}
              label="즉시 징계 해지"
            />

            {/* 2. 일시정지 */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <FormControlLabel
                value="suspend"
                control={<Radio />}
                label="일시정지:"
              />
              {/* 'suspend'가 선택되었을 때만 활성화 */}
              <TextField
                size="small"
                sx={{ width: 110 }}
                disabled={selectedValue !== "suspend"}
              />
              <Typography>~</Typography>
              <TextField
                size="small"
                sx={{ width: 110 }}
                disabled={selectedValue !== "suspend"}
              />
              <FormControlLabel
                control={<Checkbox disabled={selectedValue !== "suspend"} />}
                label="즉시 정지"
              />
            </Stack>

            {/* 4. 영구퇴출 */}
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="expel"
                control={<Radio />}
                label="영구퇴출:"
              />
              <TextField
                placeholder="그룹명"
                size="small"
                sx={{ width: 120 }}
                disabled={selectedValue !== "expel"}
              />
              <Button
                variant="contained"
                size="small"
                disabled={selectedValue !== "expel"}
              >
                찾기
              </Button>
            </Stack>

            {/* 5. 활동변경 */}
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                value="changeActivity"
                control={<Radio />}
                label="활동변경:"
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      disabled={selectedValue !== "changeActivity"}
                    />
                  }
                  label="드림인"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      disabled={selectedValue !== "changeActivity"}
                    />
                  }
                  label="오피니언해피인"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      disabled={selectedValue !== "changeActivity"}
                    />
                  }
                  label="(일반)해피인"
                />
              </FormGroup>
            </Stack>

            {/* 6. 등급 */}
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="rank"
                control={<Radio />}
                label="등급:"
              />
              <Select
                size="small"
                defaultValue="bronze1"
                sx={{ minWidth: 120 }}
                disabled={selectedValue !== "rank"}
              >
                <MenuItem value="bronze1">브론즈1 V</MenuItem>
              </Select>
              <TextField
                label="등급스코어"
                size="small"
                defaultValue="0"
                sx={{ width: 120 }}
                disabled={selectedValue !== "rank"}
              />
              <Button
                variant="contained"
                size="small"
                disabled={selectedValue !== "rank"}
              >
                적용
              </Button>
            </Stack>

            {/* 7. 홀파토큰 */}
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="token"
                control={<Radio />}
                label="홀파토큰:"
              />
              <TextField
                size="small"
                defaultValue="0"
                sx={{ width: 120 }}
                disabled={selectedValue !== "token"}
              />
              <Button
                variant="contained"
                size="small"
                disabled={selectedValue !== "token"}
              >
                적용
              </Button>
            </Stack>

            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                value="counselor"
                control={<Radio />}
                label="카운셀러:"
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      disabled={selectedValue !== "counselor"}
                    />
                  }
                  label="임명"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      disabled={selectedValue !== "counselor"}
                    />
                  }
                  label="해지"
                />
              </FormGroup>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "6px 24px" }}
            onClick={handleApply}
          >
            등록하기
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "#8B4513",
              "&:hover": { backgroundColor: "#A0522D" },
              padding: "6px 24px",
            }}
          >
            닫기
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};

export default AdminModal;
