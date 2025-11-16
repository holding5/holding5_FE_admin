// src/pages/ReportedPostDetailPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import ReportedPostContent from "../components/ReportedPostContent";
import ReportedPostComments from "../components/ReportedPostComments";
import useReportedUserContents from "../hooks/useReportedUserContents";

import { labelMapper } from "../../utils/LabelMapper";

const REPORT_TYPE_OPTIONS = [
  { value: "", label: "신고 유형 전체" },
  {
    value: "SPAMMING",
    label: labelMapper("dominantReportTypeMap", "SPAMMING"),
  },
  {
    value: "INAPPROPRIATE_LANGUAGE_USE",
    label: labelMapper("dominantReportTypeMap", "INAPPROPRIATE_LANGUAGE_USE"),
  },
  {
    value: "LANGUAGE_VIOLENCE",
    label: labelMapper("dominantReportTypeMap", "LANGUAGE_VIOLENCE"),
  },
  {
    value: "SEXUAL_HARASSMENT",
    label: labelMapper("dominantReportTypeMap", "SEXUAL_HARASSMENT"),
  },
];

const ReportedPostDetailPage = () => {
  // /reported/detail/user/:userId/post/:postId
  const { userId, postId } = useParams();
  const numericPostId = Number(postId);
  const numericUserId = Number(userId);

  // 🔹 해당 유저의 신고된 컨텐츠 전체 조회 + 필터 상태
  const { items, loading, error, reportType, setReportType } =
    useReportedUserContents(userId, {
      initialOrder: "desc",
    });

  const [index, setIndex] = useState(0);

  // 데이터 로딩 후, postId 기준으로 현재 인덱스 맞추기
  useEffect(() => {
    if (!items.length) return;

    const foundIndex = items.findIndex(
      (item) => item.post?.id === numericPostId
    );

    setIndex(foundIndex >= 0 ? foundIndex : 0);
  }, [items, numericPostId]);

  const total = items.length;

  const handlePrev = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(total - 1, prev + 1));
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value || "");
    // 필터 바뀌면 첫 번째 항목부터 보도록 초기화
    setIndex(0);
  };

  // ---- 상태별 렌더링 ----
  if (loading) {
    return (
      <Box
        component="section"
        sx={{ flexGrow: 1, mt: 3, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
        <Container>
          <Typography color="error">
            신고된 게시글을 불러오는 중 오류가 발생했습니다.
          </Typography>
        </Container>
      </Box>
    );
  }

  // total이 0이면 safeIndex는 0, current는 null
  const safeIndex = total ? Math.min(index, total - 1) : 0;
  const current = total ? items[safeIndex] : null;

  // ReportedPostContent가 post.userInfo를 쓰도록 합쳐서 전달
  const mergedPost = current?.post
    ? { ...current.post, userInfo: current.userInfo }
    : null;

  return (
    <Box component="section" sx={{ flexGrow: 1, mt: 3 }}>
      <Container>
        {/* 상단 헤더 + 네비게이션 (항상 노출) */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="report-type-label">신고 유형</InputLabel>
            <Select
              labelId="report-type-label"
              label="신고 유형"
              value={reportType ?? ""}
              onChange={handleReportTypeChange}
            >
              {REPORT_TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">
              {total ? safeIndex + 1 : 0} / {total}
            </Typography>
            <IconButton
              size="small"
              onClick={handlePrev}
              disabled={safeIndex === 0 || total === 0}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={safeIndex === total - 1 || total === 0}
            >
              <ArrowForward />
            </IconButton>
          </Stack>
        </Stack>

        {/* 본문 영역 */}
        {total === 0 && (
          <Typography>
            해당 조건에 해당하는 신고된 게시글이 없습니다.
          </Typography>
        )}

        {total > 0 && !mergedPost && (
          <Typography>존재하지 않는 게시글입니다.</Typography>
        )}

        {total > 0 && mergedPost && (
          <>
            {/* 게시글 본문 */}
            <ReportedPostContent
              post={mergedPost}
              postReports={current.postReports || []}
              highlightUserId={numericUserId}
            />

            {/* 댓글 목록 */}
            <ReportedPostComments
              comments={current.comments || []}
              commentReports={current.commentReports || []}
              highlightUserId={numericUserId}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default ReportedPostDetailPage;
