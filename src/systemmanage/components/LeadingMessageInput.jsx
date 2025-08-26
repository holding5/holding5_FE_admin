// components/LeadingMessageInput.jsx
import { Stack, Switch, FormControlLabel, TextField, Button, Collapse } from "@mui/material";

const MAX_LEN = 100;

export default function LeadingMessageInput({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <Stack spacing={1}>
      <FormControlLabel
        label="이끄는 말 사용"
        control={
          <Switch
            checked={value.enabled || false}
            onChange={(e) => set({ enabled: e.target.checked })}
          />
        }
      />

      <Collapse in={!!value.enabled}>
        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ pl: 4, mb: 3 }}>
          <TextField
            value={value.text || ""}
            onChange={(e) => set({ text: e.target.value.slice(0, MAX_LEN) })}
            placeholder="100자 이내로 입력하세요"
            size="small"
            fullWidth
            multiline
            inputProps={{ maxLength: MAX_LEN }}
            helperText={`${(value.text || "").length}/${MAX_LEN}`}
          />
          <Button
            variant="contained"
            onClick={() => set({ apply: true })}
            disabled={!(value.text || "").trim()}
          >
            적용
          </Button>
        </Stack>
      </Collapse>
    </Stack>
  );
}
