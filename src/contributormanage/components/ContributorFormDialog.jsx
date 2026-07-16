import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Typography, Box, CircularProgress, Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useContributorMutations,
  useImageUpload,
  CATEGORY_LABEL,
} from "../hooks/useContributors";

/**
 * 도움주신 분(개발자/후원) 등록/수정 다이얼로그.
 * @param {string} category - DEVELOPER | SPONSOR (탭에서 고정)
 * @param {object|null} editItem - 있으면 수정, 없으면 등록
 */
const ContributorFormDialog = ({ open, onClose, category, editItem, onSaved }) => {
  const isEdit = Boolean(editItem);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { createContributor, updateContributor, deleteContributor, saving } =
    useContributorMutations();
  const { uploadImage, uploading } = useImageUpload();

  useEffect(() => {
    if (!open) return;
    setName(editItem?.name && editItem.name !== "-" ? editItem.name : "");
    setRole(editItem?.role && editItem.role !== "-" ? editItem.role : "");
    setContent(editItem?.content ?? "");
    setImageUrl(editItem?.imageUrl ?? "");
  }, [open, editItem]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      if (url) setImageUrl(url);
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return alert("이름을 입력하세요.");
    const body = {
      category,
      imageUrl: imageUrl || null,
      name: name.trim(),
      role: role.trim() || null,
      content: content.trim() || null,
    };
    try {
      if (isEdit) await updateContributor(editItem.id, body);
      else await createContributor(body);
      alert(isEdit ? "수정되었습니다." : "등록되었습니다.");
      onSaved?.();
      onClose?.();
    } catch (e) {
      alert(e?.response?.data?.message || "저장에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    try {
      await deleteContributor(editItem.id);
      alert("삭제되었습니다.");
      onSaved?.();
      onClose?.();
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {CATEGORY_LABEL[category] ?? "도움주신 분"} {isEdit ? "수정" : "등록"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>사진</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={imageUrl} sx={{ width: 64, height: 64 }} variant="rounded" />
              <Button variant="outlined" component="label" size="small" disabled={uploading}>
                {uploading ? "업로드 중..." : "이미지 선택"}
                <input hidden type="file" accept="image/*" onChange={handleImageChange} />
              </Button>
            </Stack>
          </Box>
          <TextField label="이름" size="small" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="역할" size="small" value={role} onChange={(e) => setRole(e.target.value)} fullWidth />
          <TextField label="내용" size="small" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        {isEdit && (
          <Button color="error" onClick={handleDelete} disabled={saving}>삭제</Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose}>닫기</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving || uploading}>
          {saving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : isEdit ? "수정" : "등록"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContributorFormDialog;
