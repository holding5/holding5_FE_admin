import {
  Popover,
  Box,
  Typography,
  TextField,
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
  Grid,
} from "@mui/material";
import { useState } from "react";

const AdminModal = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);
  const [selectedValue, setSelectedValue] = useState("suspend");

  // 활동변경 체크박스들의 상태를 관리하기 위한 state
  const [activityChecks, setActivityChecks] = useState({
    dreamIn: false,
    opinionHappyIn: false,
    generalHappyIn: false,
    peerHappyIn: false,
    groupHappyIn: false,
  });

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // 활동변경 체크박스 변경 핸들러
  const handleActivityCheckChange = (event) => {
    setActivityChecks({
      ...activityChecks,
      [event.target.name]: event.target.checked,
    });
  };

  const handleApply = () => {
    console.log("선택된 조치:", selectedValue);
    console.log("활동 변경 상태:", activityChecks);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      {/* 2. 배경색을 베이지톤으로 수정 */}
      <Box sx={{ p: 3, width: "600px", backgroundColor: "#f5f5dc" }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          행정 관리
        </Typography>

        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
          <Grid container spacing={1.5} alignItems="center">
            {/* 즉시 징계 해지 */}
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <FormControlLabel
                  value="release"
                  control={<Radio />}
                  label="즉시 징계 해지"
                />
              </Grid>
            </Grid>

            {/* 일시정지 */}
            <Grid item container xs={12} alignItems="center">
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
                    sx={{ width: 120, backgroundColor: "white" }}
                    placeholder="2024.08.23"
                    disabled={selectedValue !== "suspend"}
                  />
                  <Typography>~</Typography>
                  <TextField
                    size="small"
                    sx={{ width: 120, backgroundColor: "white" }}
                    placeholder="2024.08.29"
                    disabled={selectedValue !== "suspend"}
                  />
                  <Typography sx={{ ml: 1 }}>(06일)</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox disabled={selectedValue !== "suspend"} />
                    }
                    label="즉시 정지"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12}>
                <FormControlLabel
                  value="expel"
                  control={<Radio />}
                  label="영구퇴출"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} alignItems="center">
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
                        name="dreamIn"
                        checked={activityChecks.dreamIn}
                        onChange={handleActivityCheckChange}
                        disabled={selectedValue !== "changeActivity"}
                      />
                    }
                    label="드림인"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="opinionHappyIn"
                        checked={activityChecks.opinionHappyIn}
                        onChange={handleActivityCheckChange}
                        disabled={selectedValue !== "changeActivity"}
                      />
                    }
                    label="오피니언해피인"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="generalHappyIn"
                        checked={activityChecks.generalHappyIn}
                        onChange={handleActivityCheckChange}
                        disabled={selectedValue !== "changeActivity"}
                      />
                    }
                    label="(일반)해피인"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="peerHappyIn"
                        checked={activityChecks.peerHappyIn}
                        onChange={handleActivityCheckChange}
                        disabled={selectedValue !== "changeActivity"}
                      />
                    }
                    label="또래해피인"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="groupHappyIn"
                        checked={activityChecks.groupHappyIn}
                        onChange={handleActivityCheckChange}
                        disabled={selectedValue !== "changeActivity"}
                      />
                    }
                    label="그룹해피인"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            {selectedValue === "changeActivity" &&
              activityChecks.groupHappyIn && (
                <Grid item container xs={12} alignItems="center">
                  <Grid item xs={2.5} /> {/* 왼쪽 여백을 위한 빈 Grid */}
                  <Grid item xs={9.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        placeholder="그룹명"
                        size="small"
                        sx={{ width: 120, backgroundColor: "white" }}
                      />
                      <Button variant="contained" size="small">
                        찾기
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              )}

            {/* 등급 */}
            <Grid item container xs={12} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="rank"
                  control={<Radio />}
                  label="등급:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Select
                    size="small"
                    defaultValue="bronze1"
                    sx={{ minWidth: 120, backgroundColor: "white" }}
                    disabled={selectedValue !== "rank"}
                  >
                    <MenuItem value="bronze1">브론즈1 V</MenuItem>
                  </Select>
                  <Typography>등급스코어</Typography>
                  <TextField
                    size="small"
                    defaultValue="0"
                    sx={{ width: 120, backgroundColor: "white" }}
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

            <Grid item container xs={12} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="token"
                  control={<Radio />}
                  label="홀파토큰:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    defaultValue="0"
                    sx={{ width: 120, backgroundColor: "white" }}
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

            {/* 카운셀러 */}
            <Grid item container xs={12} alignItems="center">
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
                      <Checkbox disabled={selectedValue !== "counselor"} />
                    }
                    label="임명"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox disabled={selectedValue !== "counselor"} />
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
            onClick={handleApply}
            sx={{
              padding: "6px 24px",
              backgroundColor: "#36454F",
              "&:hover": { backgroundColor: "#495D6A" },
            }}
          >
            등록하기
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              padding: "6px 24px",
              backgroundColor: "#8B4513",
              "&:hover": { backgroundColor: "#A0522D" },
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
