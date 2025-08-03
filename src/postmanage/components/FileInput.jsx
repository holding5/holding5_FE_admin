import { Box, Typography, Button } from "@mui/material";

const FileInput = ({ onFileChange }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>첨부 파일</Typography>
      <Button
        variant="outlined"
        component="label"
      >
        파일 선택
        <input type="file" hidden onChange={onFileChange} />
      </Button>
    </Box>
  );
};

export default FileInput;
