import { Button } from "@mui/material";

const SignUpDetailButton = ({ color, text, onClickChangeContent, value }) => {
  return (
    <Button
      value={value}
      onClick={onClickChangeContent}
      sx={{ backgroundColor: color, color: "white" }}
    >
      {text}
    </Button>
  );
};

export default SignUpDetailButton;
