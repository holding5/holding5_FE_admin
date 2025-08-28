import { Tabs, Tab } from "@mui/material";

const LifeMessageTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="전체" value="all" />
      <Tab label="승인/대기" value="allow" />
      <Tab label="거절/보류" value="refusal" />
      <Tab label="생명메시지 입력" value="create" />
    </Tabs>
  );
}

export default LifeMessageTabsNav;

