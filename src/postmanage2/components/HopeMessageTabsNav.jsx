import { Tabs, Tab } from "@mui/material";

const HopeMessageTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="전체" value="all" />
      <Tab label="승인" value="allow" />
      <Tab label="거절" value="refusal" />
      <Tab label="희망메시지 입력" value="create" />
    </Tabs>
  );
}

export default HopeMessageTabsNav;

