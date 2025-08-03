import {
  Box,
  Grid,
  Avatar,
  Typography,
  Link,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import ContentSearchbar from "../../components/ContentSearchbar";
const RankManageDetailPage = () => {
  const historyData = [
    {
      date: "2025.06.26",
      content:
        "출석 5점 / 댓글 3점 / 좋아요 2점 / 본문글 1점 / 극복수기 10점 …… 총30점",
      highlight: "본문글 1점",
    },
    {
      date: "2025.06.25",
      content:
        "출석 5점 / 댓글 3점 / 좋아요 2점 / 본문글 1점 / 극복수기 10점 …… 총30점",
      highlight: "본문글 1점",
    },
    {
      date: "2025.06.24",
      content: "실버1",
      highlight: "실버2 승격",
      isPromotion: true,
    },
    {
      date: "2025.06.21",
      content:
        "출석 5점 / 댓글 3점 / 좋아요 2점 / 본문글 1점 / 극복수기 10점 …… 총30점",
      highlight: "본문글 1점",
    },
    {
      date: "2025.06.22",
      content:
        "출석 5점 / 댓글 3점 / 좋아요 2점 / 본문글 1점 / 극복수기 10점 …… 총30점",
      highlight: "본문글 1점",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          width: "11rem",
          height: "2.5rem",
          backgroundColor: "#A0522D",
          display: "flex",
          borderRadius: "18px",
          justifyContent: "center",
          alignItems: "center",
          my: "2rem",
          ml: "2rem",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "bold" }}>
          등급관리 상세
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: "2rem" }}>
        <ContentSearchbar />
      </Box>
      <Paper
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          border: "1px solid #ddd",
        }}
        variant="outlined"
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            {/* 왼쪽: 아바타 */}
            <Avatar sx={{ width: 56, height: 56 }} />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" fontWeight="bold">
                액츠
              </Typography>

              <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    등급: 실버2
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={1.5}>
                  <Typography variant="body2" color="text.secondary">
                    스코어: 130
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <Typography variant="body2" color="text.secondary">
                    시작일: 2024.01.23
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <Typography variant="body2" color="text.secondary">
                    총누적스코어: 267
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <Typography variant="body2" color="text.secondary">
                    총출석일: 289일
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    등수: 12345 / 34567
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    최근 365기준 :{" "}
                    <Typography component="span" fontWeight="bold">
                      총출석일 : 210 일
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    월평균출석일: 130 일
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ position: "relative" }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            히스토리 라인
          </Typography>
          <List sx={{ p: 0 }}>
            {historyData.map((item) => (
              <ListItem key={item.id} sx={{ py: 0.5, px: 0 }}>
                <Typography variant="body2" component="span">
                  {item.date} :{" "}
                </Typography>
                {item.isPromotion ? (
                  <>
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ mx: 0.5, fontSize: "0.875rem" }}
                    >
                      {item.content}
                    </Link>
                    <Typography
                      variant="body2"
                      component="span"
                      color="primary"
                    >
                      {item.highlight}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                    {item.content.replace("본문글 1점", "")}
                    <Link href="#" underline="hover">
                      본문글 1점
                    </Link>
                  </Typography>
                )}
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton size="small">
              <ArrowDropUp />
            </IconButton>
            <IconButton size="small">
              <ArrowDropDown />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 3. 하단 수정 패널 */}
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">등급수정:</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select value="실버2">
                <MenuItem value="실버2">실버2</MenuItem>
                <MenuItem value="골드1">골드1</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ ml: 2 }}>
              스코어수정:
            </Typography>
            <TextField size="small" defaultValue="130" sx={{ width: 100 }} />
            <Button variant="contained" sx={{ ml: 1 }}>
              수정
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RankManageDetailPage;
