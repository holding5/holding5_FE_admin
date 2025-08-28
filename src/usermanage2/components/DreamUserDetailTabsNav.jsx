import { Tabs, Tab } from "@mui/material";

const DreamUserDetailTabsNav = ({ value, onChange }) => {
  const handle = (_, v) => onChange(v);
  return (
    <Tabs value={value} onChange={handle}>
      <Tab label="신상정보" value="profile" />
      <Tab label="게시물활동" value="posts" />
      <Tab label="활동평가" value="evaluation" />
    </Tabs>
  );
}

export default DreamUserDetailTabsNav;

