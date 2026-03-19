import { Stack, Box } from "@mui/material";
import { useState } from "react";
import BoatTable from "../components/BoatTable";

const BoatPage = () => {
  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 1 }}>
      <Box sx={{ mt: 1 }}>
        <BoatTable />
      </Box>
    </Box>
  );
};

export default BoatPage;
