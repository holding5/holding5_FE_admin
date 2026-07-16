import { useState } from "react";
import {
  Box, Paper, Stack, Button, Avatar, CircularProgress, Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useContributorList } from "../hooks/useContributors";
import ContributorFormDialog from "./ContributorFormDialog";

/**
 * 개발자/후원 도움주신 분 관리 탭 — 사진 카드 그리드(사진/이름/역할).
 * 카드 클릭 시 상세(내용 등)·수정·삭제 다이얼로그.
 * @param {string} category - DEVELOPER | SPONSOR
 */
const ContributorCrudTab = ({ category }) => {
  const { rows, totalPages, page, setPage, loading, error, refetch } =
    useContributorList({ category });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const openCreate = () => { setEditItem(null); setDialogOpen(true); };
  const openEdit = (row) => { setEditItem(row); setDialogOpen(true); };

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={openCreate}>+ 등록</Button>
      </Stack>

      {loading && (
        <Box sx={{ textAlign: "center", py: 5 }}><CircularProgress size={26} /></Box>
      )}
      {!loading && error && (
        <Typography sx={{ textAlign: "center", py: 5, fontSize: 13, color: "error.main" }}>
          목록 조회에 실패했습니다.
        </Typography>
      )}
      {!loading && !error && rows.length === 0 && (
        <Typography sx={{ textAlign: "center", py: 5, fontSize: 13, color: "text.secondary" }}>
          등록된 항목이 없습니다.
        </Typography>
      )}

      {!loading && !error && rows.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 2,
          }}
        >
          {rows.map((row) => (
            <Paper
              key={row.id}
              variant="outlined"
              onClick={() => openEdit(row)}
              sx={{
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow .15s, transform .15s",
                "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
              }}
            >
              <Avatar
                src={row.imageUrl}
                variant="rounded"
                sx={{ width: 96, height: 96, mx: "auto", mb: 1.5 }}
              />
              <Typography sx={{ fontWeight: 700 }} noWrap>{row.name}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{row.role}</Typography>
            </Paper>
          ))}
        </Box>
      )}

      <Pagination
        sx={{ display: "flex", justifyContent: "center", my: 3 }}
        showFirstButton showLastButton
        count={totalPages || 1}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined" shape="rounded"
      />

      <ContributorFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        category={category}
        editItem={editItem}
        onSaved={() => refetch?.()}
      />
    </>
  );
};

export default ContributorCrudTab;
