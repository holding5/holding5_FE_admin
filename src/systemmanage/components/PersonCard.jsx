import { Card, CardContent, Avatar, Typography } from "@mui/material";

const PersonCard = ({ image, name, caption }) => {
  return (
    <Card sx={{ p: 1, textAlign: "center" }}>
      <Avatar src={image} sx={{ width: 84, height: 84, mx: "auto", mb: 1 }} />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" fontWeight={600}>{name}</Typography>
        {caption && <Typography variant="caption">{caption}</Typography>}
      </CardContent>
    </Card>
  );
}

export default PersonCard;
