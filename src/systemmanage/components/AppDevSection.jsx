// AppDevSection.jsx
import { useState } from "react";
import { Box } from "@mui/material";
import AppDevList from "./AppDevList";
import { getAppDevMembers } from "../utils/api";
import LeadingMessageInput from "./LeadingMessageInput";

const AppDevSection = () => {
  const groups = getAppDevMembers(); // { role: "총괄", members: [...] } 배열

  // ✅ 이끄는 말 상태 추가
  const [lead, setLead] = useState({ enabled: false, text: "" });

  return (
    <Box>
      {/* 이끄는 말 입력 */}
      <LeadingMessageInput value={lead} onChange={setLead} />

      {/* 그룹별 개발자 리스트 */}
      {groups.map((g) => (
        <AppDevList key={g.role} title={g.role} items={g.members} />
      ))}
    </Box>
  );
};

export default AppDevSection;
