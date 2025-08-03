import { FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";

const ReligionSelector = ({ religions, selectedReligions, onChange }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>종교 선택</Typography>
      <FormGroup row>
        {religions.map((religion) => (
          <FormControlLabel
            key={religion}
            control={
              <Checkbox
                checked={selectedReligions.includes(religion)}
                onChange={() => onChange(religion)}
              />
            }
            label={religion}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default ReligionSelector;
