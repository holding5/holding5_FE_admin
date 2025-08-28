import { Stack, Box } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import LifeMessageTabsNav from "../components/LifeMessageTabsNav";
import MessageStatBox from "../components/MessageStatBox";
import LifeMessageTable from "../components/LifeMessageTable"; // ✅ 테이블 import
import LifeMessageInputForm from "../components/LifeMessageInputForm"; // ✅ 입력폼 import
import { lifeMessageMock } from "../utils/lifeMessageMock";

const allCount = lifeMessageMock.length;
const pendingCount = lifeMessageMock.filter(msg => msg.isAllow === "승인완료" || msg.isAllow === "승인대기").length;
const rejectingCount = lifeMessageMock.filter(msg => msg.isAllow === "거절" || msg.isAllow === "승인보류").length;

const LifeMessagePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 검색바 */}
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }}>
        <ContentSearchbar />
      </Stack>

      {/* 탭 메뉴 */}
      <Box sx={{ mt: 3 }}>
        <LifeMessageTabsNav value={activeTab} onChange={setActiveTab} />

        {/* create 탭이면 입력폼 렌더 */}
        {activeTab === "create" ? (
          <Box sx={{ mt: 3 }}>
            <LifeMessageInputForm />
          </Box>
        ) : (
          <>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, ml: 2 }}>
              <MessageStatBox label="전체 생명메시지" count={allCount} color="#1976d2" />
              <MessageStatBox label="승인/대기 메시지" count={pendingCount} color="#f39c12" />
              <MessageStatBox label="거절/보류 메시지" count={rejectingCount} color="#c0392b" />
            </Stack>

            <Box sx={{ mt: 2 }}>
              {/* ✅ 테이블에 필터값 전달 */}
              <LifeMessageTable filter={activeTab} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LifeMessagePage;
