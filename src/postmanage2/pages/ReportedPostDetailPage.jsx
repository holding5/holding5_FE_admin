// pages/ReportedPostDetailPage.jsx

import { useParams } from "react-router-dom";
import { reportedPostMock } from "../utils/ReportedPostMock";
import ReportedPostContent from "../components/ReportedPostContent";
import ReportedPostComments from "../components/ReportedPostComments";
import { Box, Container, Typography } from "@mui/material";

const ReportedPostDetailPage = () => {
  const { postId } = useParams();
  const post = reportedPostMock.find((p) => p.post_id === Number(postId));

  if (!post) {
    return <Typography>존재하지 않는 게시글입니다.</Typography>;
  }

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Container maxWidth="md">
        <ReportedPostContent post={post} />
        <ReportedPostComments comments={post.comments || []} />
      </Container>
    </Box>
  );
};

export default ReportedPostDetailPage;
