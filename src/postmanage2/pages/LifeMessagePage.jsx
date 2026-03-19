import { Stack, Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import LifeMessageTabsNav from "../components/LifeMessageTabsNav";
import MessageStatBox from "../components/MessageStatBox";
import LifeMessageTable from "../components/LifeMessageTable";
import LifeMessageInputForm from "../components/LifeMessageInputForm";
import { useLifeMessageStats } from "../hooks/useLifeMessages";

const LifeMessagePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ 통계 API 연결
  const {
    stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useLifeMessageStats({
    endpoint: "/admin/messages/life/stats",
  });

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 3 }}>
        <LifeMessageTabsNav value={activeTab} onChange={setActiveTab} />

        {activeTab === "create" ? (
          <Box sx={{ mt: 3 }}>
            <LifeMessageInputForm onSuccess={() => refetchStats()} />
          </Box>
        ) : (
          <>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 2, ml: 2 }}
            >
              <MessageStatBox
                label="전체 생명메시지"
                count={stats?.total ?? 0}
                color="#1976d2"
              />
              <MessageStatBox
                label="승인 메시지"
                count={stats?.approved ?? 0}
                color="#f39c12"
              />
              <MessageStatBox
                label="거절 메시지"
                count={stats?.rejected ?? 0}
                color="#c0392b"
              />
              <MessageStatBox
                label="대기 메시지"
                count={stats?.pending ?? 0}
                color="#7f8c8d"
              />

              {statsLoading && <CircularProgress size={18} />}
            </Stack>

            {statsError && (
              <Typography sx={{ ml: 2, mt: 1 }} color="error" fontSize={12}>
                통계 조회 실패: {statsError?.message ?? "unknown error"}
              </Typography>
            )}

            <Box sx={{ mt: 2 }}>
              {/* ✅ 탭 필터 전달 (all/approved/rejected/pending 등) */}
              <LifeMessageTable filter={activeTab} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LifeMessagePage;
