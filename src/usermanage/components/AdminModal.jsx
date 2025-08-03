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
  Grid, // Grid 추가
} from "@mui/material";
import { useState } from "react";

const AdminModal = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);
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
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 3, width: "auto", minWidth: 650 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          행정 관리
        </Typography>

        {/* RadioGroup을 Grid 컨테이너로 감싸 각 행을 Grid 아이템으로 처리 */}
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
          <Grid container spacing={1} alignItems="center">
            {/* 1. 즉시 징계 해지 */}
            <Grid item xs={12}>
              <FormControlLabel
                value="release"
                control={<Radio />}
                label="즉시 징계 해지"
              />
            </Grid>

            {/* 2. 일시정지 */}
            <Grid item container xs={12} spacing={1} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="suspend"
                  control={<Radio />}
                  label="일시정지:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1} alignItems="center">
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
                    control={
                      <Checkbox disabled={selectedValue !== "suspend"} />
                    }
                    label="즉시 정지"
                  />
                </Stack>
              </Grid>
            </Grid>

            {/* 3. 영구퇴출 */}
            <Grid item container xs={12} spacing={1} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="expel"
                  control={<Radio />}
                  label="영구퇴출:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
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
              </Grid>
            </Grid>

            {/* 4. 활동변경 */}
            <Grid item container xs={12} spacing={1} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="changeActivity"
                  control={<Radio />}
                  label="활동변경:"
                />
              </Grid>
              <Grid item xs={9.5}>
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
              </Grid>
            </Grid>

            {/* 5. 등급 */}
            <Grid item container xs={12} spacing={1} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="rank"
                  control={<Radio />}
                  label="등급:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
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
              </Grid>
            </Grid>

            {/* 6. 홀파토큰 */}
            <Grid item container xs={12} spacing={1} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="token"
                  control={<Radio />}
                  label="홀파토큰:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
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
              </Grid>
            </Grid>

            {/* 7. 카운셀러 */}
            <Grid item container xs={12} spacing={1} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="counselor"
                  control={<Radio />}
                  label="카운셀러:"
                />
              </Grid>
              <Grid item xs={9.5}>
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
              </Grid>
            </Grid>
          </Grid>
        </RadioGroup>

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
