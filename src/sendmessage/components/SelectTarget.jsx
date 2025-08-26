// components/SelectTarget.jsx
import { useEffect, useState } from "react";
import {
  Stack, TextField, Button, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Checkbox, Chip
} from "@mui/material";

// 데모용 더미 조회
const mockSearch = async ({ q, filters }) => {
  // TODO: 실제 API로 filters + q 전달
  await new Promise((r) => setTimeout(r, 250));
  return [
    { id: "U55", name: "박순애", nick: "아주까리", gender: "여", phone: "010-2345-6789" },
    { id: "U54", name: "홍길동", nick: "드림동", gender: "남", phone: "010-1234-5678" },
    { id: "U53", name: "한여자", nick: "유끼네", gender: "여", phone: "010-9999-1234" },
  ];
};

export default function SelectTarget({ value, onChange, filters }) {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  const selectedIds = value;

  const search = async () => {
    const data = await mockSearch({ q, filters });
    setRows(data);
  };

  useEffect(() => {
    // 조건 바뀔 때 자동 새로고침(원치 않으면 제거)
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const toggle = (id) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );
  };

  const toggleAll = () => {
    const allIds = rows.map((r) => r.id);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    onChange(allSelected ? selectedIds.filter((id) => !allIds.includes(id)) : [...new Set([...selectedIds, ...allIds])]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">발송 대상자</Typography>

      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          placeholder="이름/닉네임/아이디/전화번호"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ minWidth: 360 }}
        />
        <Button variant="outlined" onClick={search}>검색</Button>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedIds.some((id) => rows.map((r) => r.id).includes(id)) &&
                  !rows.every((r) => selectedIds.includes(r.id))
                }
                checked={rows.length > 0 && rows.every((r) => selectedIds.includes(r.id))}
                onChange={toggleAll}
              />
            </TableCell>
            <TableCell>NO</TableCell>
            <TableCell>프로필</TableCell>
            <TableCell>이름·닉네임</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>연락처</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, idx) => (
            <TableRow key={r.id} hover>
              <TableCell padding="checkbox">
                <Checkbox checked={selectedIds.includes(r.id)} onChange={() => toggle(r.id)} />
              </TableCell>
              <TableCell>{rows.length - idx}</TableCell>
              <TableCell>
                {/* 썸네일 자리에 Chip로 대체 */}
                <Chip label={r.nick?.slice(0, 2) || "유저"} />
              </TableCell>
              <TableCell>{r.name} ({r.nick})</TableCell>
              <TableCell>{r.gender}</TableCell>
              <TableCell>{r.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="body2" color="text.secondary">
        선택 인원: <b>{selectedIds.length}</b>명
      </Typography>
    </Stack>
  );
}
