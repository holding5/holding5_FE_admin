import { Tabs, Tab } from "@mui/material";

const SchoolPoliceTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="회원학교" value="school" />
      <Tab label="회원경찰서" value="police" />
    </Tabs>
  );
}

export default SchoolPoliceTabsNav;

