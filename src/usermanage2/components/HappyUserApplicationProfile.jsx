import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import {
  useHappyinApplicationProfile,
  useHappyinProfile,
  useHappyinApplicationActions,
} from "../hooks/useHappyins";
import { labelMapper } from "../../utils/LabelMapper";
import AdminModal from "./AdminModal";

const HappyUserApplicationProfile = () => {
  const { id } = useParams();

  // 1) 신청 상세: 새 훅 사용
  const {
    form,
    loading: appLoading,
    error: appError,
    refetch: refetchApplication,
  } = useHappyinApplicationProfile(id);

  // 2) 행정관리 모달에서 쓸 유저 상태/권한은 기존 프로필 훅 재사용
  const { rawStatus, rawRoles, refetch: refetchUser } = useHappyinProfile(id);

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  const {
    approveApplication,
    rejectApplication,
    loading: actionLoading,
  } = useHappyinApplicationActions();

  const isPending = form?.status === "DIP";

  const handleApprove = async () => {
    if (!window.confirm("정말 이 해피인 신청을 승인하시겠습니까?")) return;

    try {
      await approveApplication(
        Number(id),
        "해피인으로 승인되었습니다. 활약 기대합니다!"
      );
      await Promise.all([refetchUser(), refetchApplication()]);
      alert("승인 처리되었습니다.");
    } catch (e) {
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async () => {
    if (!window.confirm("정말 이 해피인 신청을 거절하시겠습니까?")) return;

    try {
      await rejectApplication(
        Number(id),
        "해피인 신청이 거절되었습니다. 양해 부탁드립니다."
      );
      await Promise.all([refetchUser(), refetchApplication()]);
      alert("거절 처리되었습니다.");
    } catch (e) {
      alert("거절 처리 중 오류가 발생했습니다.");
    }
  };

  const handleAdminClick = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAdminAnchorEl(null);
  };

  if (appLoading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;
  if (appError)
    return <Box sx={{ p: 3 }}>신청 정보를 불러오지 못했습니다.</Box>;

  // 공통 readOnly 스타일
  const readOnlyProps = {
    InputProps: { readOnly: true },
    size: "small",
    margin: "dense",
    fullWidth: true,
  };

  // URL에서 마지막 파일명만 뽑고, 한글 디코딩까지
  const getFileNameFromUrl = (url) => {
    if (!url) return "";

    try {
      // 정식 URL이면
      const u = new URL(url);
      const pathname = u.pathname || "";
      const segments = pathname.split("/");
      const last = segments[segments.length - 1] || "";
      return decodeURIComponent(last);
    } catch (e) {
      // 혹시 URL 생성에서 에러 나면 그냥 문자열 기준으로 처리
      const parts = String(url).split("/");
      const last = parts[parts.length - 1] || url;
      try {
        return decodeURIComponent(last);
      } catch {
        return last;
      }
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* ===== 기본 정보 ===== */}
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="전화번호"
            value={form.phoneNumber ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="직장명"
            value={form.jobTitle ?? ""}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="신청 구분"
            value={labelMapper("serviceRoleMap", form.serviceRole ?? "")}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />

          <TextField
            label="그룹 카테고리"
            value={labelMapper("groupCategoryMap", form.groupCategory ?? "")}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
          <TextField
            label="그룹 코드"
            value={form.groupCode ?? "-"}
            {...readOnlyProps}
            sx={{ flex: 1 }}
          />
        </Stack>

        <Stack spacing={2} direction={"row"}>
          <TextField
            label="학력사항"
            value={form.academicBackground ?? ""}
            {...readOnlyProps}
            multiline
            minRows={3} // 최소 3줄 정도
            maxRows={6} // 선택: 너무 길면 스크롤
            sx={{ width: "100%" }}
          />

          <TextField
            label="경력사항"
            value={form.career ?? ""}
            {...readOnlyProps}
            multiline
            minRows={3} // 최소 3줄 정도
            maxRows={6} // 선택: 너무 길면 스크롤
            sx={{ width: "100%" }}
          />
        </Stack>

        <TextField
          label="인사말"
          value={form.greetingMessage ?? ""}
          {...readOnlyProps}
          multiline
          minRows={3} // 최소 3줄 정도
          maxRows={6} // 선택: 너무 길면 스크롤
          sx={{ width: "100%" }}
        />

        <TextField
          label="자기소개"
          value={form.selfIntroduction ?? ""}
          {...readOnlyProps}
          multiline
          minRows={3} // 최소 3줄 정도
          maxRows={6} // 선택: 너무 길면 스크롤
          sx={{ width: "100%" }}
        />

        <TextField
          label="신청동기"
          value={form.motivation ?? ""}
          {...readOnlyProps}
          multiline
          minRows={3} // 최소 3줄 정도
          maxRows={6} // 선택: 너무 길면 스크롤
          sx={{ width: "100%" }}
        />

        <TextField
          label="활동계획"
          value={form.actionPlan ?? ""}
          {...readOnlyProps}
          multiline
          minRows={3} // 최소 3줄 정도
          maxRows={6} // 선택: 너무 길면 스크롤
          sx={{ width: "100%" }}
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* ===== 첨부파일 ===== */}
      <Typography variant="subtitle1" gutterBottom>
        첨부파일
      </Typography>
      <Box
        sx={{
          maxHeight: 200,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },
        }}
      >
        <Stack spacing={1.5}>
          {(form.mediaUrls ?? []).length === 0 && (
            <Box sx={{ fontSize: 14, color: "text.secondary" }}>
              첨부된 파일이 없습니다.
            </Box>
          )}
          {(form.mediaUrls ?? []).map((url, idx) => {
            const fileName = getFileNameFromUrl(url);
            return (
              <Button
                key={idx}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: 14,
                }}
                size="small"
                href={url}
                target="_blank"
                title={url} // 툴팁으로 전체 URL 보고 싶으면
              >
                {fileName || url}
              </Button>
            );
          })}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ===== 행정 관리 버튼 ===== */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {/* ✅ 대기 상태일 때만 승인/거절 버튼 노출 */}
        {isPending && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleApprove}
              disabled={actionLoading}
            >
              승인
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReject}
              disabled={actionLoading}
            >
              거절
            </Button>
          </>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAdminClick}
        >
          행정관리
        </Button>
      </Stack>

      <AdminModal
        anchorEl={adminAnchorEl}
        onClose={handleAdminClose}
        userId={id}
        currentStatus={rawStatus}
        currentRoles={rawRoles}
        onDone={async () => {
          await Promise.all([
            refetchUser(), // 유저 상태/권한 갱신
            refetchApplication(), // 신청 상세 재조회
          ]);
        }}
      />
    </Paper>
  );
};

export default HappyUserApplicationProfile;
