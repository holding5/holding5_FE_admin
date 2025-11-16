import { Stack, Box } from "@mui/material";
import { useState } from "react";
import HolpaTable from "../components/HolpaTable";

const HolpaPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 1, p: 2 }}>
        <HolpaTable />
      </Box>
    </Box>
  );
};

export default HolpaPage;
