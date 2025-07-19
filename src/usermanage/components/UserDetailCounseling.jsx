import {
  Box,
  Select,
  MenuItem,
  Stack,
  Link,
  Button,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// 샘플 데이터 (실제로는 API로부터 받아옵니다)
const sampleRows = [
  {
    id: 55,
    status: "대기중",
    topic: "공통",
    religion: "상관없음",
    content: "그래도 행복을 꿈꿔야 합니다.",
    counselor: "할미꽃소녀",
    date: "2024.03.12 16:24:24",
    author: "어리버리청춘",
    rating: 4.8,
  },
  {
    id: 54,
    status: "진행중",
    topic: "성적, 학업문제",
    religion: "기독교",
    content: "",
    counselor: "미정",
    date: "",
    author: "어리버리청춘",
    rating: 5.0,
  },
  {
    id: 53,
    status: "상담중",
    topic: "부모갈등",
    religion: "기독교",
    content: "",
    counselor: "크로크다일",
    date: "",
    author: "어리버리청춘",
    rating: 4.7,
  },
  {
    id: 52,
    status: "진행중",
    topic: "공통",
    religion: "무관",
    content: "",
    counselor: "미정",
    date: "",
    author: "어리버리청춘",
    rating: 4.5,
  },
  {
    id: 51,
    status: "상담종료",
    topic: "선생님과 갈등",
    religion: "불교",
    content: "",
    counselor: "해피로드",
    date: "",
    author: "어리버리청춘",
    rating: 4.1,
  },
  {
    id: 50,
    status: "상담종료",
    topic: "외모문제",
    religion: "천주교",
    content: "",
    counselor: "",
    date: "",
    author: "어리버리청춘",
    rating: 3.8,
  },
  {
    id: 49,
    status: "상담종료",
    topic: "왕따, 폭력문제",
    religion: "기독교",
    content: "",
    counselor: "",
    date: "",
    author: "어리버리청춘",
    rating: 2.4,
  },
];

const UserDetailCounseling = () => {
  // DataGrid의 컬럼을 정의합니다.
  const columns = [
    {
      field: "id",
      headerName: "NO",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    { field: "status", headerName: "상태", width: 100 },
    { field: "topic", headerName: "주제", width: 150 },
    { field: "religion", headerName: "종교", width: 120 },
    {
      field: "content",
      headerName: "제목 / 내용",
      width: 220,
      sortable: false,
    },
    {
      field: "counselor",
      headerName: "내담자",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <Link href="#" underline="always">
            {params.value}
          </Link>
        ) : (
          ""
        ),
    },
    { field: "date", headerName: "등록일시", width: 170 },
    {
      field: "author",
      headerName: "작성자 닉네임",
      width: 150,
      renderCell: (params) => (
        <Link href="#" underline="always">
          {params.value}
        </Link>
      ),
    },
    {
      field: "actions",
      headerName: "평점/내담후기",
      width: 180,
      sortable: false,
      align: "center",
      headerAlign: "center",
      // '평점'과 '후기보기' 버튼을 함께 렌더링합니다.
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">{params.row.rating}</Typography>
          <Button variant="contained" size="small">
            후기보기
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* 상단 필터 및 행 수 설정 */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }} alignItems="center">
        <Select defaultValue="all" size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="all">전체 V</MenuItem>
        </Select>
        <Select defaultValue="all" size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="all">전체 V</MenuItem>
        </Select>
        <Select defaultValue="all" size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="all">전체 V</MenuItem>
        </Select>
        <Box sx={{ flexGrow: 1 }} /> {/* 오른쪽 끝으로 밀어내기 위한 빈 공간 */}
        <Select defaultValue={50} size="small">
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Stack>

      {/* 데이터 그리드 */}
      <Box sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={sampleRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 8, 10, 20]}
          checkboxSelection // 각 행 앞에 체크박스를 생성합니다.
        />
      </Box>
    </Box>
  );
};

export default UserDetailCounseling;
