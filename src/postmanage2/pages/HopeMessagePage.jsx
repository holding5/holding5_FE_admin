import { Stack, Box } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import HopeMessageTabsNav from "../components/HopeMessageTabsNav";
import MessageStatBox from "../components/MessageStatBox";
import HopeMessageTable from "../components/HopeMessageTable"; // ✅ 테이블 import
import HopeMessageInputForm from "../components/HopeMessageInputForm"; // ✅ 입력폼 import
import { hopeMessageMock } from "../utils/HopeMessageMock";

const allCount = hopeMessageMock.length;
const allowedCount = hopeMessageMock.filter(msg => msg.log === "희망" || msg.log === "희망>생명").length;
const rejectedCount = hopeMessageMock.filter(msg => msg.log === "삭제" || msg.log === "희망>거절").length;

const HopeMessagePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 검색바 */}
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }}>
        <ContentSearchbar />
      </Stack>

      {/* 탭 메뉴 */}
      <Box sx={{ mt: 3 }}>
        <HopeMessageTabsNav value={activeTab} onChange={setActiveTab} />

        {/* create 탭이면 입력폼 렌더 */}
        {activeTab === "create" ? (
          <Box sx={{ mt: 3 }}>
            <HopeMessageInputForm />
          </Box>
        ) : (
          <>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, ml: 2 }}>
              <MessageStatBox label="전체 희망메시지" count={allCount} color="#1976d2" />
              <MessageStatBox label="승인 메시지" count={allowedCount} color="#f39c12" />
              <MessageStatBox label="거절 메시지" count={rejectedCount} color="#c0392b" />
            </Stack>

            <Box sx={{ mt: 2 }}>
              {/* ✅ 테이블에 필터값 전달 */}
              <HopeMessageTable filter={activeTab} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HopeMessagePage;
