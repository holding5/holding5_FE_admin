import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, Stack, Divider, Paper, Button } from "@mui/material";
import { useDreaminProfile } from "../hooks/useDreamins";
import AdminModal from "./AdminModal";
import { formatPhone } from "../../utils/formatPhone";

// 라벨+값 단일 항목
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

const DreamUserProfile = () => {
  const { id } = useParams();
  const { form, histories, loading, refetch, rawStatus, rawRoles } =
    useDreaminProfile(id);

  const [adminAnchorEl, setAdminAnchorEl] = useState(null);

  if (loading || !form) return <Box sx={{ p: 3 }}>불러오는 중...</Box>;

  // 닉네임 이니셜 (첫 글자)
  const initial = (form.nickname || form.name || "?").charAt(0);

  return (
    <Paper sx={{ p: 2.5, maxWidth: 1500, mx: "auto" }}>
      {/* 상단 프로필 헤더 */}
      <Box
        sx={{
          bgcolor: "#E6F1FB",
          borderRadius: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            bgcolor: "#185FA5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 500,
            color: "#E6F1FB",
            flexShrink: 0,
          }}
        >
          {initial}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#042C53" }}>
            {form.nickname || "-"}
          </Typography>
          <Typography sx={{ fontSize: 15, color: "#185FA5" }}>
            {form.email || "-"} · {formatPhone(form.phoneNumber) || "-"}
          </Typography>
        </Box>
      </Box>

      {/* 정보 그리드 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          mb: 2,
        }}
      >
        <InfoItem label="이름" value={form.name} />
        <InfoItem label="성별" value={form.gender} />
        <InfoItem label="생년월일" value={form.birthdate} />
        <InfoItem label="종교" value={form.religion} />
        <InfoItem label="직업" value={form.job} />

        <InfoItem label="학교" value={form.school} />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 경력 변경 이력 */}
      <Typography variant="h6" gutterBottom>
        경력 변경 이력
      </Typography>
      <Box
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },
        }}
      >
        <Stack spacing={1.5}>
          {histories.map((h, idx) => (
            <Box key={idx} sx={{ fontSize: 14, lineHeight: 1.35 }}>
              {new Date(h.createdAt).toLocaleString()} - {h.content}
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="flex-end">
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
          await refetch();
        }}
      />
    </Paper>
  );
};

export default DreamUserProfile;
