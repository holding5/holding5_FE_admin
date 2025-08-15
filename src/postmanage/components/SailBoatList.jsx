import SailBoatCard from "./SailBoatCard";
import { Box, Select, MenuItem, Pagination } from "@mui/material";
const SailBoatList = () => {
  return (
    <Box sx={{ width: "90%" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 4, mt: 4 }}
      >
        <Select sx={{ width: 90, height: 40 }}>
          <MenuItem></MenuItem>
        </Select>
        <Select sx={{ width: 90, height: 40, mr: 10 }}>
          <MenuItem>25</MenuItem>
          <MenuItem>50</MenuItem>
          <MenuItem>100</MenuItem>
        </Select>
      </Box>
      <SailBoatCard />
      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 2 }}
        showFirstButton
        showLastButton
        count={10}
        page={1}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default SailBoatList;
