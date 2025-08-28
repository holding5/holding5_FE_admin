import { Stack, Box } from "@mui/material";
import { useState } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import CongratulatoryMessageTabsNav from "../components/CongratulatoryMessageTabsNav";
import MessageStatBox from "../components/MessageStatBox";
import CongratulatoryMessageTable from "../components/CongratulatoryMessageTable"; // ✅ 테이블 import
import CongratulatoryMessageInputForm from "../components/CongratulatoryMessageInputForm"; // ✅ 입력폼 import
import { congratulatoryMessageMock } from "../utils/CongratulatoryMessageMock";

const allCount = congratulatoryMessageMock.length;
const accessionCount = congratulatoryMessageMock.filter(msg => msg.classification === "가입환영").length;
const birthCount = congratulatoryMessageMock.filter(msg => msg.classification === "생일축하").length;
const testCount = congratulatoryMessageMock.filter(msg => msg.classification === "시험격려").length;


const CongratulatoryMessagePage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      {/* 검색바 */}
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }}>
        <ContentSearchbar />
      </Stack>

      {/* 탭 메뉴 */}
      <Box sx={{ mt: 3 }}>
        <CongratulatoryMessageTabsNav value={activeTab} onChange={setActiveTab} />

        {/* create 탭이면 입력폼 렌더 */}
        {activeTab === "create" ? (
          <Box sx={{ mt: 3 }}>
            <CongratulatoryMessageInputForm />
          </Box>
        ) : (
          <>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, ml: 2 }}>
              <MessageStatBox label="전체 축하메시지" count={allCount} color="#1976d2" />
              <MessageStatBox label="가입환영인사" count={accessionCount} color="#f39c12" />
              <MessageStatBox label="생일축하인사" count={birthCount} color="#c0392b" />
              <MessageStatBox label="시험격려" count={testCount} color="#29e913ff" />
            </Stack>

            <Box sx={{ mt: 2 }}>
              {/* ✅ 테이블에 필터값 전달 */}
              <CongratulatoryMessageTable filter={activeTab} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CongratulatoryMessagePage;
