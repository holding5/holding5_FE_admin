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
  Divider,
  Grid,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { submitAdminAction } from "../../api/submitAdminAction";

const DreamAdminModal = ({ anchorEl, onClose, userId, onDone }) => {
  const open = Boolean(anchorEl);
  const [selectedValue, setSelectedValue] = useState("SUSPENDED");

  // 일지정시 시작일, 종료일 자동 설정
  const today = new Date();
  const [suspendStartDate, setSuspendStartDate] = useState(today);
  const [suspendEndDate, setSuspendEndDate] = useState(
    new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

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

  const yyyyMMdd = (date) => dayjs(date).format("YYYY-MM-DD");

  // BANNED, DISCIPLINE_RELEASED는 추가 payload 없이 actionType만 보내면 됨.
  const handleApply = async () => {
    const payload = {
      actionType: selectedValue,
    };

    if (selectedValue === "SUSPENDED") {
      payload.actionType = "SUSPENDED"; // 서버 enum에 맞게 변경
      payload.suspensionStartDate = yyyyMMdd(suspendStartDate);
      payload.suspensionEndDate = yyyyMMdd(suspendEndDate);
    }

    if (selectedValue === "ROLE_CHANGED") {
      const selectedRoles = Object.entries(activityChecks)
        .filter(([_, isChecked]) => isChecked)
        .map(([role]) => {
          switch (role) {
            case "dreamIn":
              return "DREAMIN";
            case "opinionHappyIn":
              return "STAR_HAPPYIN";
            case "generalHappyIn":
              return "HAPPYIN";
            case "peerHappyIn":
              return "GROUP_HAPPYIN"; // ← 이것과 아래는 구분 필요시 수정
            case "groupHappyIn":
              return "GROUP_HAPPYIN";
            default:
              return null;
          }
        })
        .filter(Boolean);

      // payload.newServiceRole = selectedRoles;
      if (selectedRoles.length === 0) {
        alert("활동을 하나 이상 선택해주세요.");
        return;
      }

      payload.newServiceRole = selectedRoles[0];
    }

    console.log("📤 보내는 payload:", JSON.stringify(payload, null, 2)); // 행정관리 로그 확인용 (일시정지 500에러)

    try {
      await submitAdminAction(userId, payload);
      alert("행정 조치가 완료되었습니다.");
      onDone();
      onClose();
    } catch (error) {
      console.error("행정 처리 실패", error);
      if (error.response) {
        console.log("📦 서버 응답 데이터:", error.response.data);
      }
      alert("행정 처리 중 오류가 발생했습니다.");
    }
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
                  value="DISCIPLINE_RELEASED"
                  control={<Radio />}
                  label="즉시 징계 해지"
                />
              </Grid>
            </Grid>

            {/* 일시정지 */}
            <Grid item container xs={12} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="SUSPENDED"
                  control={<Radio />}
                  label="일시정지:"
                />
              </Grid>
              <Grid item xs={9.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DatePicker
                    label="시작일"
                    value={dayjs(suspendStartDate)}
                    onChange={(newValue) =>
                      setSuspendStartDate(newValue.toDate())
                    }
                    disabled={selectedValue !== "SUSPENDED"}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { backgroundColor: "white", width: 140 },
                      },
                    }}
                  />
                  <Typography>~</Typography>
                  <DatePicker
                    label="종료일"
                    value={dayjs(suspendEndDate)}
                    onChange={(newValue) =>
                      setSuspendEndDate(newValue.toDate())
                    }
                    disabled={selectedValue !== "SUSPENDED"}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { backgroundColor: "white", width: 140 },
                      },
                    }}
                  />
                  <Typography sx={{ ml: 1 }}>(06일)</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox disabled={selectedValue !== "SUSPENDED"} />
                    }
                    label="즉시 정지"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12}>
                <FormControlLabel
                  value="BANNED"
                  control={<Radio />}
                  label="영구퇴출"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} alignItems="center">
              <Grid item xs={2.5}>
                <FormControlLabel
                  value="ROLE_CHANGED"
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
                        disabled={selectedValue !== "ROLE_CHANGED"}
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
                        disabled={selectedValue !== "ROLE_CHANGED"}
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
                        disabled={selectedValue !== "ROLE_CHANGED"}
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
                        disabled={selectedValue !== "ROLE_CHANGED"}
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
                        disabled={selectedValue !== "ROLE_CHANGED"}
                      />
                    }
                    label="그룹해피인"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            {selectedValue === "ROLE_CHANGED" &&
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

export default DreamAdminModal;
