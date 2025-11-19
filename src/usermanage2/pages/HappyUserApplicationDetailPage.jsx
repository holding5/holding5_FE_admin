import { Box } from "@mui/material";
import { useState } from "react";
import HappyUserApplicationTabsNav from "../components/HappyUserApplicationTabsNav";
import HappyUserApplicationProfile from "../components/HappyUserApplicationProfile";
import DreamUserProfile from "../components/DreamUserProfile";
import HappyUserPosts from "../components/HappyUserPosts";
import DreamUserEvaluation from "../components/DreamUserEvaluation";

const HappyUserApplicationDetailPage = () => {
  const [activeTab, setActiveTab] = useState("application");

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Box sx={{ mt: 1 }}>
        <HappyUserApplicationTabsNav
          value={activeTab}
          onChange={setActiveTab}
        />

        <Box sx={{ mt: 2 }}>
          {activeTab === "profile" && <DreamUserProfile />}
          {activeTab === "posts" && <HappyUserPosts />}
          {activeTab === "evaluation" && <DreamUserEvaluation />}
          {activeTab === "application" && <HappyUserApplicationProfile />}
        </Box>
      </Box>
    </Box>
  );
};

export default HappyUserApplicationDetailPage;
