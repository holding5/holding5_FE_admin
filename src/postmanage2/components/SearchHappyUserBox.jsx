import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";

/**
 * 해피인 검색/선택 컴포넌트
 *
 * 백엔드 API:
 *   GET /admin/messages/hope/happyin-search?keyword=...&page=0&size=10
 *   GET /admin/messages/life/happyin-search?keyword=...&page=0&size=10
 *
 * 응답 (Spring Page<HappyinSimpleResDto>):
 *   content: [{ userId, name, nickname, serviceRole, profileImage }]
 *
 * @param {object} props
 * @param {function} props.onSelect    - 선택 시 콜백 (item 전달)
 * @param {object|null} props.selected - 현재 선택된 해피인
 * @param {string} props.searchEndpoint - API 경로 (기본: /admin/messages/hope/happyin-search)
 */
const SearchHappyUserBox = ({
  onSelect,
  selected,
  searchEndpoint = "/admin/messages/hope/happyin-search",
}) => {
  const [keyword, setKeyword] = useState("");
  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await axiosInstance.get(searchEndpoint, {
        params: { keyword: keyword.trim(), page: 0, size: 10 },
      });
      // Spring Page 응답
      setResultList(res.data?.content ?? []);
    } catch (e) {
      console.error("해피인 검색 실패:", e);
      setResultList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    onSelect?.(item);
    setResultList([]);
    setKeyword("");
    setSearched(false);
  };

  const handleClear = () => {
    onSelect?.(null);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ fontWeight: 700, mb: 1 }}>해피인 선택</Typography>

      {/* 검색바 */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <TextField
          placeholder="이름 또는 닉네임을 입력하세요"
          size="small"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          sx={{ minWidth: 250 }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={handleSearch}
          disabled={loading || !keyword.trim()}
        >
          검색
        </Button>
        {loading && <CircularProgress size={18} />}
      </Stack>

      {/* 선택된 해피인 */}
      {selected && (
        <Paper
          sx={{
            p: 1.5,
            mb: 1,
            backgroundColor: "#f0f7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            {selected.profileImage && (
              <Avatar
                src={selected.profileImage}
                sx={{ width: 32, height: 32 }}
              />
            )}
            <Typography fontSize={13}>
              <b>{selected.name}</b> ({selected.nickname})
              <span style={{ color: "#666", marginLeft: 8 }}>
                {selected.serviceRole}
              </span>
            </Typography>
          </Stack>
          <IconButton size="small" onClick={handleClear} title="선택 해제">
            <Clear fontSize="small" />
          </IconButton>
        </Paper>
      )}

      {/* 검색 결과 */}
      {resultList.length > 0 && (
        <Paper sx={{ p: 1.5, maxHeight: 220, overflow: "auto" }}>
          {resultList.map((item) => (
            <Stack
              key={item.userId}
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{
                py: 0.8,
                px: 0.5,
                borderBottom: "1px solid #eee",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              {item.profileImage && (
                <Avatar
                  src={item.profileImage}
                  sx={{ width: 28, height: 28 }}
                />
              )}
              <Typography sx={{ flex: 1, fontSize: 13 }}>
                <b>{item.name}</b> ({item.nickname})
                <span style={{ color: "#888", marginLeft: 8, fontSize: 12 }}>
                  {item.serviceRole}
                </span>
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSelect(item)}
                sx={{ fontSize: 12 }}
              >
                선택
              </Button>
            </Stack>
          ))}
        </Paper>
      )}

      {/* 검색 결과 없음 */}
      {searched && !loading && resultList.length === 0 && (
        <Typography fontSize={12} color="text.secondary" sx={{ mt: 0.5 }}>
          검색 결과가 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default SearchHappyUserBox;
