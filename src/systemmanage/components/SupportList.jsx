import { Grid } from "@mui/material";
import SupportCard from "./SupportCard";

const SupportList = ({ items }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {items.map(s => (
        <Grid item key={s.id} xs={6} sm={4} md={3} lg={2}>
          <SupportCard name={s.name} logo={s.logoUrl} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SupportList;
