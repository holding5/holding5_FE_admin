import { Grid } from "@mui/material";
import PersonCard from "./PersonCard";

const OpinionList = ({ items }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2, mb: 5 }}>
      {items.map(p => (
        <Grid item key={p.id} xs={6} sm={4} md={3} lg={2}>
          <PersonCard name={p.name} image={p.photoUrl} caption={p.caption} />
        </Grid>
      ))}
    </Grid>
  );
}

export default OpinionList;
