import { Tabs, Tab } from "@mui/material";

const ReportedPostTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="홀파담벼락" value="holpa" />
      <Tab label="돛단배" value="boat" />
      <Tab label="홀파상담방" value="counsel" />
      <Tab label="생명메시지/희망메시지" value="message" />
    </Tabs>
  );
};

export default ReportedPostTabsNav;
