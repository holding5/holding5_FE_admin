import { Paper, Grid, Typography, Box } from "@mui/material";

const SchoolStatistics = ({
  nationTotal = 11984,
  nationElem = 0,
  nationMid = 0,
  nationHigh = 0,
  registeredTotal = 120,
  registeredElem = 60,
  registeredMid = 30,
  registeredHigh = 30,
}) => {
  const labels = ["학교총수", "초등학교", "중학교", "고등학교"];

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {/* === Row 1: 대한민국 학교 === */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2.2}>
          <Typography sx={{ fontWeight: "bold" }}>현 대한민국 학교</Typography>
        </Grid>
        <Grid item xs={9.8}>
          <Grid container spacing={1}>
            {[nationTotal, nationElem, nationMid, nationHigh].map((value, idx) => (
              <Grid item xs={3} key={idx}>
                <Box sx={{ border: "1px solid #ccc", p: 1.2, textAlign: "center", fontSize: 12 }}>
                  <Typography sx={{ fontWeight: "bold" }}>{labels[idx]}</Typography>
                  <Typography>{value.toLocaleString()}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* === Row 2: 웹 회원 학교 === */}
      <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={2.2}>
          <Typography sx={{ fontWeight: "bold" }}>현 홀파 회원학교</Typography>
        </Grid>
        <Grid item xs={9.8}>
          <Grid container spacing={1}>
            {[registeredTotal, registeredElem, registeredMid, registeredHigh].map((value, idx) => (
              <Grid item xs={3} key={idx}>
                <Box sx={{ border: "1px solid #ccc", p: 1.2, textAlign: "center", fontSize: 12 }}>
                  <Typography sx={{ fontWeight: "bold" }}>{labels[idx]}</Typography>
                  <Typography>{value.toLocaleString()}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SchoolStatistics;
