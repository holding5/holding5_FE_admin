import { Box, List, Typography } from "@mui/material";
import ContentSearchbar from "../../components/ContentSearchbar";
import colors from "../../constant/colors";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const data = [
  {
    id: 1243,
    classification: "일반 극복수기",
    content:
      "경제적으로 정말 힘들었는데, 작은 성공들을 쌓아가며 이겨낼 수 있었습니다. 포기하지 마세요!",
    user: "희망을찾아서",
    createdAt: "2025.08.11",
    good: 15,
    report: 0,
    comment: 4,
    comment_hope: 8,
    life: 3,
    hope: 5,
    others: 2,
  },
  {
    id: 1244,
    classification: "일반 극복수기",
    content:
      "경제적으로 정말 힘들었는데, 작은 성공들을 쌓아가며 이겨낼 수 있었습니다. 포기하지 마세요!",
    user: "희망을찾아서",
    createdAt: "2025.08.11",
    good: 15,
    report: 0,
    comment: 4,
    comment_hope: 8,
    life: 3,
    hope: 5,
    others: 2,
  },
];

const ListHeader = () => {
  return (
    <>
      <Box sx={{ position: "relative", minHeight: "120px" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ContentSearchbar />
        </Box>

        <Typography
          sx={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(200px)",
            fontSize: "1.1rem",
            whiteSpace: "nowrap",
          }}
        >
          {"게시물 관리 > 극복 수기"}
        </Typography>
      </Box>
      <Box sx={{ pl: 5 }}>
        <Box
          sx={{
            backgroundColor: colors.GREY,
            display: "inline-block",
            px: 9,
            py: 1,
            borderRadius: 1.2,
          }}
        >
          <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
            극복수기
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const DetailHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <ContentSearchbar />

      <Typography
        sx={{
          fontSize: "1.1rem",
          whiteSpace: "nowrap",
        }}
      >
        {"게시물관리 > 극복수기 > 극복수기 상세"}
      </Typography>
    </Box>
  );
};

const OverComingPage = () => {
  const location = useLocation();
  const isDetail = location.pathname.includes("/detail");
  const nav = useNavigate();

  const onClickPage = () => {
    nav("/overcoming/detail");
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box sx={{ mt: 3.5 }}>
        {!isDetail ? <ListHeader /> : <DetailHeader />}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Outlet context={{ data, onClickPage }} />
      </Box>
    </Box>
  );
};

export default OverComingPage;
