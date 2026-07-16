import { Tabs, Tab } from "@mui/material";

const SchoolPoliceTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="학교" value="school" />
      <Tab label="경찰서" value="police" />
    </Tabs>
  );
};

export default SchoolPoliceTabsNav;
