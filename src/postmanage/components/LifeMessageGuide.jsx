import { Box, Typography, Paper } from "@mui/material";

const LifeMessageGuide = () => {
  return (
    <Paper sx={{ p: 3, mb: 4, backgroundColor: "#f9f9f9" }} elevation={1}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        해피인 여러분 안녕하세요 ^^
      </Typography>
      <Typography variant="body1" paragraph>
        여기는 극한 고통으로 벼랑 끝에 선 위기의 청소년들에게생명을 불어 넣는 메시지를 입력하는 곳입니다.
      </Typography>
      <Typography variant="body1" paragraph>
        입력한 내용은 정해진 조건에 따라 자동으로 발송되게 됩니다.
        위기의 순간 어머니의 마음으로 준비한 해피인의 메시지가 청소년들에게 절망을 넘어 희망과 용기를 얻을 수 있도록 정성껏 입력해 주시면 감사하겠습니다.  
      </Typography>
    </Paper>
  );
}

export default LifeMessageGuide;
