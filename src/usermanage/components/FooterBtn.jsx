import { Stack, Button } from "@mui/material";
const FooterBtn = ({
  leftText,
  midText,
  rightText,
  leftClick,
  midClick,
  rightClick,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ gridColumn: "1 /span 2", mb: "10px", mt: "0px" }}
      spacing={1}
    >
      <Button
        sx={{
          backgroundColor: "RGB(23, 107, 187)",
          color: "white",
          padding: "5px 30px",
        }}
        onClick={leftClick}
      >
        {leftText}
      </Button>
      <Button
        sx={{
          backgroundColor: "RGB(230, 126, 34)",
          color: "white",
          padding: "5px 30px",
        }}
        onClick={midClick}
      >
        {midText}
      </Button>
      <Button
        sx={{
          backgroundColor: "RGB(111, 161, 57)",
          color: "white",
          padding: "5px 50px",
        }}
        onClick={rightClick}
      >
        {rightText}
      </Button>
    </Stack>
  );
};

export default FooterBtn;
