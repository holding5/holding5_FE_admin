import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, Stack, Divider, Paper, Button } from "@mui/material";
import {
  useHappyinApplicationProfile,
  useHappyinProfile,
  useHappyinApplicationActions,
} from "../hooks/useHappyins";
import { labelMapper } from "../../utils/LabelMapper";
import { formatPhone } from "../../utils/formatPhone";
import AdminModal from "./AdminModal";

const InfoItem = ({ label, value }) => (
  <Box sx={{ bgcolor: "grey.50", borderRadius: 1, p: 1.25 }}>
    <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.25 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: 15, fontWeight: 500, color: "text.primary" }}>
      {value || "-"}
    </Typography>
  </Box>
);

const TextItem = ({ label, value, minRows = 3 }) => (
  <Box sx={{ bgcolor: "grey.50", borderRadius: 1, p: 1.25 }}>
    <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.5 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: 14,
        color: "text.primary",
        whiteSpace: "pre-wrap",
        minHeight: `${minRows * 1.6}em`,
        maxHeight: "7.5em",
        overflowY: "auto",
        lineHeight: 1.6,
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 2 },
      }}
    >
      {value || "-"}
    </Typography>
  </Box>
);

const getFileNameFromUrl = (url) => {
  if (!url) return "";
  try {
    const u = new URL(url);
    const last = u.pathname.split("/").pop() || "";
    return decodeURIComponent(last);
  } catch {
    const parts = String(url).split("/");
    try {
      return decodeURIComponent(parts.pop() || url);
    } catch {
      return parts.pop() || url;
    }
  }
};

const HappyUserApplicationProfile = () => {
  const { id } = useParams();

  const {
    form,
    loading: appLoading,
    error: appError,
    refetch: refetchApplication,
  } = useHappyinApplicationProfile(id);
  const { rawStatus, rawRoles, refetch: refetchUser } = useHappyinProfile(id);
  const {
    approveApplication,
    rejectApplication,
    loading: actionLoading,
  } = useHappyinApplicationActions();

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const isPending = form?.status === "DIP";

  const handleApprove = async () => {
    if (!window.confirm("정말 이 해피인 신청을 승인하시겠습니까?")) return;
    try {
      await approveApplication(
        Number(id),
        "해피인으로 승인되었습니다. 활약 기대합니다!",
      );
      await Promise.all([refetchUser(), refetchApplication()]);
      alert("승인 처리되었습니다.");
    } catch {
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async () => {
    if (!window.confirm("정말 이 해피인 신청을 거절하시겠습니까?")) return;
    try {
      await rejectApplication(
        Number(id),
        "해피인 신청이 거절되었습니다. 양해 부탁드립니다.",
      );
      await Promise.all([refetchUser(), refetchApplication()]);
      alert("거절 처리되었습니다.");
    } catch {
      alert("거절 처리 중 오류가 발생했습니다.");
    }
  };

  if (appLoading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;
  if (appError)
    return <Box sx={{ p: 3 }}>신청 정보를 불러오지 못했습니다.</Box>;

  return (
    <Paper sx={{ p: 2.5, maxWidth: 1500, mx: "auto" }}>
      {/* 상단 기본 정보 그리드 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          mb: 2,
        }}
      >
        <InfoItem label="전화번호" value={formatPhone(form.phoneNumber)} />
        <InfoItem label="직장명" value={form.jobTitle} />
        <InfoItem
          label="신청 구분"
          value={labelMapper("serviceRoleMap", form.serviceRole ?? "")}
        />
        <InfoItem
          label="그룹 카테고리"
          value={labelMapper("groupCategoryMap", form.groupCategory ?? "")}
        />
        <InfoItem label="그룹 코드" value={form.groupCode} />
        <InfoItem
          label="신청 상태"
          value={
            form.status === "DIP"
              ? "대기중"
              : form.status === "ACTIVATED"
                ? "승인"
                : "거절"
          }
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 텍스트 영역들 */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 1 }}
      >
        <TextItem label="학력사항" value={form.academicBackground} />
        <TextItem label="경력사항" value={form.career} />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1, mb: 1 }}>
        <TextItem label="인사말" value={form.greetingMessage} />
        <TextItem label="자기소개" value={form.selfIntroduction} />
        <TextItem label="신청동기" value={form.motivation} />
        <TextItem label="활동계획" value={form.actionPlan} />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 첨부파일 */}
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
        <Stack spacing={1}>
          {(form.mediaUrls ?? []).length === 0 ? (
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
              첨부된 파일이 없습니다.
            </Typography>
          ) : (
            (form.mediaUrls ?? []).map((url, idx) => (
              <Button
                key={idx}
                size="small"
                href={url}
                target="_blank"
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: 14,
                }}
              >
                {getFileNameFromUrl(url) || url}
              </Button>
            ))
          )}
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 하단 버튼 */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
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
          onClick={(e) => setAdminAnchorEl(e.currentTarget)}
        >
          행정관리
        </Button>
      </Stack>

      <AdminModal
        anchorEl={adminAnchorEl}
        onClose={() => setAdminAnchorEl(null)}
        userId={id}
        currentStatus={rawStatus}
        currentRoles={rawRoles}
        onDone={async () => {
          await Promise.all([refetchUser(), refetchApplication()]);
        }}
      />
    </Paper>
  );
};

export default HappyUserApplicationProfile;
