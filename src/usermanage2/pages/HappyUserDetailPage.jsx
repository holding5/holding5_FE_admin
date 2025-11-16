import { Box } from "@mui/material";
import { useState } from "react";
import HappyUserDetailTabsNav from "../components/HappyUserDetailTabsNav";

import HappyUserProfile from "../components/HappyUserProfile";
import HappyUserPosts from "../components/HappyUserPosts";
import DreamUserEvaluation from "../components/DreamUserEvaluation";

const HappyUserDetailPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ mt: 1 }}>
        <HappyUserDetailTabsNav value={activeTab} onChange={setActiveTab} />

        <Box sx={{ mt: 2 }}>
          {activeTab === "profile" && <HappyUserProfile />}
          {activeTab === "posts" && <HappyUserPosts />}
          {activeTab === "evaluation" && <DreamUserEvaluation />}
        </Box>
      </Box>
    </Box>
  );
};

export default HappyUserDetailPage;
