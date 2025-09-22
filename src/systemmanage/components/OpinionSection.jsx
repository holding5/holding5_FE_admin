// OpinionSection/OpinionSection.jsx
import { useState } from "react";
import OpinionFilters from "./OpinionFilters";
import OpinionList from "./OpinionList";
import { fetchOpinionPeople } from "../utils/api";
import LeadingMessageInput from "./LeadingMessageInput";

const OpinionSection = () => {
  const [filters, setFilters] = useState({
    category: "전체",
    sort: "가나다순", // 기본 정렬
  });

  const [lead, setLead] = useState({ enabled: false, text: "" });

  // 실제로는 SWR/React Query로 대체 권장
  const data = fetchOpinionPeople(filters);

  return (
    <>
      <LeadingMessageInput value={lead} onChange={setLead} sx={{ mb: 3 }} />
      <OpinionFilters value={filters} onChange={setFilters} />
      <OpinionList items={data} />
    </>
  );
};

export default OpinionSection;
