import { Typography, Grid } from "@mui/material";
import PersonCard from "./PersonCard";

const AppDevList = ({ title, items }) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>{title}</Typography>
      <Grid container spacing={2}>
        {items.map(m => (
          <Grid item key={m.id} xs={6} sm={4} md={3} lg={2}>
            <PersonCard name={m.name} image={m.photoUrl} caption={m.stack?.join(", ")} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AppDevList;
