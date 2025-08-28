import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const RELIGION_OPTIONS = ["기독교", "불교", "천주교", "무교", "상관없음"];

const ReligionSelector = ({ selectedReligions, onChange }) => {
  const handleChange = (religion) => {
    if (selectedReligions.includes(religion)) {
      onChange(selectedReligions.filter((r) => r !== religion));
    } else {
      onChange([...selectedReligions, religion]);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Typography fontWeight="bold" mb={1}>종교 선택</Typography>
      <FormGroup row sx={{ gap: 2 }}>
        {RELIGION_OPTIONS.map((religion) => (
          <FormControlLabel
            key={religion}
            control={
              <Checkbox
                size="small"
                checked={selectedReligions.includes(religion)}
                onChange={() => handleChange(religion)}
              />
            }
            label={<Typography fontSize="14px">{religion}</Typography>}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default ReligionSelector;
