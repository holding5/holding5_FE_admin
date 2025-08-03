import { FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";

const TopicSelector = ({ topics, selectedTopics, onChange }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>주제 카테고리</Typography>
      <FormGroup row>
        {topics.map((topic) => (
          <FormControlLabel
            key={topic}
            control={
              <Checkbox
                checked={selectedTopics.includes(topic)}
                onChange={() => onChange(topic)}
              />
            }
            label={topic}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default TopicSelector;
