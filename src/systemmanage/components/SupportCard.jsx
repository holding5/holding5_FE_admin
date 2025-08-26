import { Card, CardContent, Typography } from "@mui/material";

const SupportCard = ({ name, logo }) => {
  return (
    <Card sx={{ p: 1, textAlign: "center" }}>
      {/* 로고는 필요 시 <Avatar variant="square" />로 변경 */}
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body2" fontWeight={600}>{name}</Typography>
      </CardContent>
    </Card>
  );
}

export default SupportCard;
