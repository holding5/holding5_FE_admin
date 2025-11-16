import { Stack, Box } from "@mui/material";
import { useState } from "react";
import DreamUserDetailTabsNav from "../components/DreamUserDetailTabsNav";

import DreamUserProfile from "../components/DreamUserProfile";
import DreamUserPosts from "../components/DreamUserPosts";
import DreamUserEvaluation from "../components/DreamUserEvaluation";

const DreamUserDetailPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ mt: 1 }}>
        <DreamUserDetailTabsNav value={activeTab} onChange={setActiveTab} />

        <Box sx={{ mt: 2 }}>
          {activeTab === "profile" && <DreamUserProfile />}
          {activeTab === "posts" && <DreamUserPosts />}
          {activeTab === "evaluation" && <DreamUserEvaluation />}
        </Box>
      </Box>
    </Box>
  );
};

export default DreamUserDetailPage;
