import { Tabs, Tab } from "@mui/material";

const HopeMessageTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="전체" value="all" />
      <Tab label="가입환영인사" value="accession" />
      <Tab label="생일축하인사" value="birth" />
      <Tab label="시험격려" value="test" />
      <Tab label="입력" value="create" />
    </Tabs>
  );
}

export default HopeMessageTabsNav;

