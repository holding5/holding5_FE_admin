import { Box, Typography, Paper } from "@mui/material";

const InputMentNotice = () => {
  return (
    <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f9f9f9", my: 2 }}>
      <Typography variant="body2" sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
        해피인 여러분 안녕하세요 ^^
        {"\n"}여기는 극한 고통으로 버려 끝에 선 위기의 청소년들에게 생명을 불어 넣는 메시지를 입력하는 곳입니다.
        {"\n"}입력한 내용은 정제된 조건에 따라 자동으로 발송되게 됩니다.
        {"\n"}위기의 순간 어떤님의 마음으로 준비한 해피인의 메시지가 청소년들에게 절망을 넘어 희망과 용기를
        얻을 수 있도록 정성껏 입력해 주시면 감사하겠습니다.
      </Typography>
    </Paper>
  );
};

export default InputMentNotice;
