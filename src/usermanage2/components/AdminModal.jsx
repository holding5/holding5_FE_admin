import {
  Popover,
  Box,
  Typography,
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
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { submitAdminAction } from "../../api/submitAdminAction";
import { labelMapper } from "../../utils/LabelMapper";

/**
 * @param {{
 *  anchorEl: HTMLElement|null,
 *  onClose: () => void,
 *  userId: number|string,
 *  onDone: () => void,
 *  currentStatus?: "ACTIVATED"|"SUSPENDED"|"BANNED"|"DEACTIVATED"|null,
 *  currentRoles?: string[] // e.g., ["DREAMIN","BASIC_HAPPYIN"]
 * }} props
 */
const AdminModal = ({
  anchorEl,
  onClose,
  userId,
  onDone,
  currentStatus = null,
  currentRoles = [],
}) => {
  const open = Boolean(anchorEl);
  const [selectedValue, setSelectedValue] = useState("SUSPENDED");

  // 일시정지 시작/종료 기본값
  const today = new Date();
  const [suspendStartDate, setSuspendStartDate] = useState(today);
  const [suspendEndDate, setSuspendEndDate] = useState(
    new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  // 서비스 역할 enum 키
  const ROLE_KEYS = [
    "DREAMIN",
    "BASIC_HAPPYIN",
    "STAR_HAPPYIN",
    "TEEN_HAPPYIN",
    "GROUP_HAPPYIN",
  ];

  // 활동변경: 단일 선택
  const [selectedRoleKey, setSelectedRoleKey] = useState(null); // e.g. "DREAMIN"

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRoleCheckChange = (event) => {
    const { name, checked } = event.target; // name: DREAMIN, BASIC_HAPPYIN, ...
    if (checked) {
      setSelectedRoleKey(name); // 새로 선택
    } else if (selectedRoleKey === name) {
      setSelectedRoleKey(null); // 다시 누르면 해제
    }
  };

  const yyyyMMdd = (date) => dayjs(date).format("YYYY-MM-DD");

  // 상태 판단
  const isSuspended = currentStatus === "SUSPENDED";
  const isBanned = currentStatus === "BANNED";

  const canRelease = isSuspended || isBanned;
  const canSuspend = !isSuspended && !isBanned;
  const canBan = !isBanned;

  // 선택된 역할 리스트 (단일 선택이지만 기존 로직 재사용)
  const selectedRolesList = useMemo(
    () => (selectedRoleKey ? [selectedRoleKey] : []),
    [selectedRoleKey]
  );

  // 현재 역할과 동일한 단일 선택인지
  const isSameRoleSelection =
    selectedRolesList.length === 1 &&
    (currentRoles ?? []).includes(selectedRolesList[0]);

  // 선택된 액션 유효성
  const isActionValid = useMemo(() => {
    if (selectedValue === "DISCIPLINE_RELEASED") return canRelease;
    if (selectedValue === "SUSPENDED") return canSuspend;
    if (selectedValue === "BANNED") return canBan;
    if (selectedValue === "ROLE_CHANGED") {
      return selectedRolesList.length > 0 && !isSameRoleSelection;
    }
    return true;
  }, [
    selectedValue,
    canRelease,
    canSuspend,
    canBan,
    selectedRolesList,
    isSameRoleSelection,
  ]);

  // 제출
  const handleApply = async () => {
    if (!isActionValid) {
      const msg =
        selectedValue === "DISCIPLINE_RELEASED"
          ? "현재 상태에서는 징계 해제를 할 수 없습니다."
          : selectedValue === "SUSPENDED"
          ? "이미 일시정지 상태이거나 영구정지 상태입니다."
          : selectedValue === "BANNED"
          ? "이미 영구정지 상태입니다."
          : selectedValue === "ROLE_CHANGED" && isSameRoleSelection
          ? "현재 역할과 동일합니다. 다른 역할을 선택해주세요."
          : "선택한 조치를 수행할 수 없습니다.";
      alert(msg);
      return;
    }

    /** @type {{actionType: string, suspensionStartDate?: string, suspensionEndDate?: string, newServiceRole?: string}} */
    const payload = { actionType: selectedValue };

    if (selectedValue === "SUSPENDED") {
      payload.suspensionStartDate = yyyyMMdd(suspendStartDate);
      payload.suspensionEndDate = yyyyMMdd(suspendEndDate);
    }

    if (selectedValue === "ROLE_CHANGED") {
      if (selectedRolesList.length === 0) {
        alert("활동을 하나 선택해주세요.");
        return;
      }
      payload.newServiceRole = selectedRolesList[0];
    }

    console.log(
      "📤 AdminActionRequest payload:",
      JSON.stringify(payload, null, 2)
    );

    try {
      await submitAdminAction(userId, payload);
      alert("행정 조치가 완료되었습니다.");
      onDone?.();
      onClose?.();
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
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.paper",
            border: "1.5px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            boxShadow: 3,
          },
        },
      }}
    >
      <Box sx={{ p: 3, width: 600 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            pl: 1.5,
            borderLeft: "4px solid",
            borderColor: "primary.main",
          }}
        >
          행정 관리
        </Typography>

        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
          <Grid container spacing={1.5} alignItems="center">
            {/* 징계 해제 */}
            <Grid item xs={12}>
              <FormControlLabel
                value="DISCIPLINE_RELEASED"
                control={<Radio />}
                label="즉시 징계 해지"
                disabled={!canRelease}
              />
              {!canRelease && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  (일시정지/영구정지 상태에서만 가능)
                </Typography>
              )}
            </Grid>

            {/* 일시정지 */}
            <Grid item container xs={12} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  value="SUSPENDED"
                  control={<Radio />}
                  label="일시정지:"
                  disabled={!canSuspend}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DatePicker
                    label="시작일"
                    value={dayjs(suspendStartDate)}
                    onChange={(newValue) =>
                      newValue && setSuspendStartDate(newValue.toDate())
                    }
                    disabled={selectedValue !== "SUSPENDED" || !canSuspend}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { backgroundColor: "white", width: 150 },
                      },
                    }}
                  />
                  <Typography>~</Typography>
                  <DatePicker
                    label="종료일"
                    value={dayjs(suspendEndDate)}
                    onChange={(newValue) =>
                      newValue && setSuspendEndDate(newValue.toDate())
                    }
                    disabled={selectedValue !== "SUSPENDED" || !canSuspend}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { backgroundColor: "white", width: 150 },
                      },
                    }}
                  />
                  <Typography sx={{ ml: 1 }}>
                    (
                    {Math.max(
                      1,
                      Math.round(
                        (suspendEndDate - suspendStartDate) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}
                    일)
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            {/* 영구정지 */}
            <Grid item xs={12}>
              <FormControlLabel
                value="BANNED"
                control={<Radio />}
                label="영구정지"
                disabled={!canBan}
              />
              {!canBan && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  (이미 영구정지 상태)
                </Typography>
              )}
            </Grid>

            {/* 활동변경 */}
            <Grid item container xs={12} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  value="ROLE_CHANGED"
                  control={<Radio />}
                  label="활동변경:"
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="DREAMIN"
                        checked={selectedRoleKey === "DREAMIN"}
                        onChange={handleRoleCheckChange}
                        disabled={selectedValue !== "ROLE_CHANGED"}
                      />
                    }
                    label={labelMapper("serviceRoleMap", "DREAMIN")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="BASIC_HAPPYIN"
                        checked={selectedRoleKey === "BASIC_HAPPYIN"}
                        onChange={handleRoleCheckChange}
                        disabled={selectedValue !== "ROLE_CHANGED"}
                      />
                    }
                    label={labelMapper("serviceRoleMap", "BASIC_HAPPYIN")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="STAR_HAPPYIN"
                        checked={selectedRoleKey === "STAR_HAPPYIN"}
                        onChange={handleRoleCheckChange}
                        disabled={selectedValue !== "ROLE_CHANGED"}
                      />
                    }
                    label={labelMapper("serviceRoleMap", "STAR_HAPPYIN")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="TEEN_HAPPYIN"
                        checked={selectedRoleKey === "TEEN_HAPPYIN"}
                        onChange={handleRoleCheckChange}
                        disabled={selectedValue !== "ROLE_CHANGED"}
                      />
                    }
                    label={labelMapper("serviceRoleMap", "TEEN_HAPPYIN")}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="GROUP_HAPPYIN"
                        checked={selectedRoleKey === "GROUP_HAPPYIN"}
                        onChange={handleRoleCheckChange}
                        disabled={selectedValue !== "ROLE_CHANGED"}
                      />
                    }
                    label={labelMapper("serviceRoleMap", "GROUP_HAPPYIN")}
                  />
                </FormGroup>

                {selectedValue === "ROLE_CHANGED" && isSameRoleSelection && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    현재 역할과 동일합니다. 다른 역할을 선택해주세요.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </RadioGroup>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleApply}
            disabled={!isActionValid}
            sx={{ px: 4 }}
          >
            등록하기
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{ px: 4 }}
          >
            닫기
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};

export default AdminModal;
