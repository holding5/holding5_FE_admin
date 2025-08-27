import {
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Menu,
  Box,
} from "@mui/material";
import { useState, useRef } from "react";
import ContentSearchbar from "../../components/ContentSearchbar";
import HelperTabsNav from "../components/HelperTabsNav";
import OpinionSection from "../components/OpinionSection";
import AppDevSection from "../components/AppDevSection";
import SupportSection from "../components/SupportSection";

const HelpersPage = () => {
  const [activeTab, setActiveTab] = useState("opinion");
  

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Stack direction="row" spacing={6} marginLeft="330px" sx={{ gap: "65px" }} >
        <ContentSearchbar />
      </Stack>

      <Box sx={{ mt: 3 }}>
      <HelperTabsNav value={activeTab} onChange={setActiveTab} />
      <Box sx={{ mt: 5, ml: 5, mr: 5 }}>
        {activeTab === "opinion" && <OpinionSection />}
        {activeTab === "appdev"  && <AppDevSection />}
        {activeTab === "support" && <SupportSection />}
      </Box>
      </Box>
    </Box>
  );
};

export default HelpersPage;