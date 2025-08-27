import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Stack
} from "@mui/material";

const SimpleSchoolRegisterDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>학교 등록</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
          <TextField label="학교명" size="small" fullWidth />
          <TextField label="전화번호" size="small" fullWidth />
          <TextField label="주소" size="small" fullWidth />

          <FormControl size="small" fullWidth>
            <Select defaultValue="">
              <MenuItem value="">시도교육청</MenuItem>
              <MenuItem value="경북교육청">경북교육청</MenuItem>
              <MenuItem value="서울교육청">서울교육청</MenuItem>
              {/* 필요 시 더 추가 */}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <Select defaultValue="">
              <MenuItem value="">교육지원청</MenuItem>
              <MenuItem value="구미지원청">구미지원청</MenuItem>
              <MenuItem value="포항지원청">포항지원청</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: "#D97904",
            "&:hover": { backgroundColor: "#c36e00" }
          }}
        >
          학교 등록하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleSchoolRegisterDialog;
