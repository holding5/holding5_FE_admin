import { Stack, Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import HopeMessageTabsNav from "../components/HopeMessageTabsNav";
import MessageStatBox from "../components/MessageStatBox";
import HopeMessageTable from "../components/HopeMessageTable";
import HopeMessageInputForm from "../components/HopeMessageInputForm";
import { useHopeMessageStats } from "../hooks/useHopeMessages";

const HopeMessagePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ 통계 API 연결
  const { stats, statsLoading, statsError, refetchStats } = useHopeMessageStats(
    "/admin/messages/hope",
  );

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ mt: 1 }}>
        <HopeMessageTabsNav value={activeTab} onChange={setActiveTab} />

        {activeTab === "create" ? (
          <Box sx={{ mt: 3 }}>
            <HopeMessageInputForm onSuccess={() => refetchStats()} />
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
                label="전체 희망메시지"
                count={stats.total}
                color="#1976d2"
              />
              <MessageStatBox
                label="승인 메시지"
                count={stats.approved}
                color="#f39c12"
              />
              <MessageStatBox
                label="거절 메시지"
                count={stats.rejected}
                color="#c0392b"
              />

              <MessageStatBox
                label="대기 메시지"
                count={stats.pending}
                color="#9E9E9E"
              />

              {statsLoading && <CircularProgress size={18} />}
              {statsError && (
                <Typography sx={{ fontSize: 12, color: "error.main" }}>
                  통계 조회 실패
                </Typography>
              )}
            </Stack>

            <Box sx={{ mt: 2 }}>
              <HopeMessageTable filter={activeTab} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HopeMessagePage;
