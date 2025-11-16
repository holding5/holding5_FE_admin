import { Tabs, Tab } from "@mui/material";

const HappyUserTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="사진으로 보기" value="img" />
      <Tab label="리스트로 보기" value="list" />
    </Tabs>
  );
};

export default HappyUserTabsNav;
