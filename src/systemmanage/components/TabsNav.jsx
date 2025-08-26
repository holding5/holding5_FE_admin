import { Tabs, Tab } from "@mui/material";

const TabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="오피니언해피인" value="opinion" />
      <Tab label="앱개발" value="appdev" />
      <Tab label="후원" value="support" />
    </Tabs>
  );
}

export default TabsNav;

