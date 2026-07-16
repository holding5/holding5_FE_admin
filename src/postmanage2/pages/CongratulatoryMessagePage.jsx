import { Stack, Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import CongratulatoryMessageTabsNav from "../components/CongratulatoryMessageTabsNav";
import MessageStatBox from "../components/MessageStatBox";
import CongratulatoryMessageTable from "../components/CongratulatoryMessageTable";
import CongratulatoryMessageInputForm from "../components/CongratulatoryMessageInputForm";
import { useCelebrationCounts } from "../hooks/useCelebrationMessages";

const CongratulatoryMessagePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ 유형별 건수 통계 (실 API)
  const { counts, countsLoading, countsError, refetchCounts } = useCelebrationCounts();

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ mt: 3 }}>
        <CongratulatoryMessageTabsNav value={activeTab} onChange={setActiveTab} />

        {activeTab === "create" ? (
          <Box sx={{ mt: 3 }}>
            <CongratulatoryMessageInputForm onSuccess={() => refetchCounts()} />
          </Box>
        ) : (
          <>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 2, ml: 2 }}
            >
              <MessageStatBox label="전체 축하메시지" count={counts.all} color="#1976d2" />
              <MessageStatBox label="가입환영인사" count={counts.signup} color="#f39c12" />
              <MessageStatBox label="생일축하인사" count={counts.birthday} color="#c0392b" />
              <MessageStatBox label="시험격려" count={counts.exam} color="#29e913ff" />
              {countsLoading && <CircularProgress size={18} />}
              {countsError && (
                <Typography sx={{ fontSize: 12, color: "error.main" }}>
                  통계 조회 실패
                </Typography>
              )}
            </Stack>

            <Box sx={{ mt: 2 }}>
              <CongratulatoryMessageTable filter={activeTab} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CongratulatoryMessagePage;
