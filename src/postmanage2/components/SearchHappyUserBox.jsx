import { useState } from "react";
import {
  Box, TextField, Button, Typography, Paper, Stack,
} from "@mui/material";

// 목데이터 (나중에 API 연동)
const mockHappyins = [
  {
    id: 1,
    name: "유재석",
    email: "wdc@dfq.123",
    nickname: "메뚜기",
    phone: "010-1234-5678",
    group: "방송인분야",
    type: "오피니언해피인",
  },
  {
    id: 2,
    name: "유재석",
    email: "fds@gmail.com",
    nickname: "슬뚜갱",
    phone: "010-4321-8967",
    group: "군인",
    type: "일반해피인",
  },
];

const SearchHappyUserBox = () => {
  const [keyword, setKeyword] = useState("");
  const [resultList, setResultList] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearch = () => {
    const filtered = mockHappyins.filter((h) =>
      h.name.includes(keyword) || h.nickname.includes(keyword)
    );
    setResultList(filtered);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setResultList([]);
    setKeyword("");
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* 검색바 */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <TextField
          placeholder="이름/닉네임을 넣어주세요"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          검색
        </Button>
      </Stack>

      {/* 선택된 해피인 */}
      {selected && (
        <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f9f9f9" }}>
          <Typography>
            <b>이름:</b> {selected.name} &nbsp;&nbsp;
            <b>닉네임:</b> {selected.nickname}
          </Typography>
          <Typography>
            <b>이메일:</b> {selected.email} &nbsp;&nbsp;
            <b>전화:</b> {selected.phone}
          </Typography>
          <Typography>
            <b>그룹분류:</b> {selected.group} &nbsp;&nbsp;
            <b>해피인분류:</b> {selected.type}
          </Typography>
        </Paper>
      )}

      {/* 검색 결과 */}
      {resultList.length > 0 && (
        <Paper sx={{ p: 2 }}>
          {resultList.map((item) => (
            <Box key={item.id} sx={{ mb: 1 }}>
              <Typography>
                <b>이름:</b> {item.name} / <b>닉네임:</b> {item.nickname}
              </Typography>
              <Typography>
                <b>이메일:</b> {item.email} / <b>해피인분류:</b> {item.type}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSelect(item)}
                sx={{ mt: 1 }}
              >
                선택
              </Button>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default SearchHappyUserBox;
