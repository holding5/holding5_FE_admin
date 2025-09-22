import { Stack, Button } from "@mui/material";

const SchoolRegisterButton = ({ onOpenMemberSchool, onOpenSchool }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        onClick={onOpenMemberSchool}
        sx={{
          backgroundColor: "#D97904",
          "&:hover": { backgroundColor: "#c36e00" },
        }}
      >
        회원 학교 등록
      </Button>

      <Button
        variant="contained"
        onClick={onOpenSchool}
        sx={{
          backgroundColor: "#3D5A80",
          "&:hover": { backgroundColor: "#324c6b" },
        }}
      >
        학교 등록
      </Button>
    </Stack>
  );
};

export default SchoolRegisterButton;
