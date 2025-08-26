// components/SupportCategoryInput.jsx
import React from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

/**
 * SupportCategoryInput
 * - 후원 섹션에서 사용할 카테고리 선택 + "카테고리 관리" 버튼
 *
 * props:
 *  - categories: string[]                 // 카테고리 목록 (예: ["전체","정기후원단체","후원단체·회사","후원자"])
 *  - value: string                        // 현재 선택된 카테고리 값
 *  - onChange: (value: string) => void    // 선택 변경 핸들러
 *  - onOpenCategory: () => void           // "카테고리 관리" 버튼 클릭 핸들러
 *  - label?: string                       // 기본: "카테고리 선택"
 *  - size?: "small" | "medium"            // 기본: "small"
 *  - required?: boolean                   // 기본: false
 *  - sx?: object                          // 컨테이너 스타일
 */
const SupportCategoryInput = ({
  categories = [],
  value = "",
  onChange,
  onOpenCategory,
  label = "카테고리 선택",
  size = "small",
  required = false,
  sx,
}) => {
  const hasError = required && !value;

  return (
    <Box sx={sx}>
      <Stack direction="row" spacing={2} alignItems="flex-end">
        <FormControl sx={{ minWidth: 200 }} size={size} error={hasError} required={required}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={(e) => onChange?.(e.target.value)}
          >
            {(categories || [])
              .filter((c) => c !== "전체")   // FnQEditorInline 스타일과 동일하게 "전체"는 선택지에서 제외
              .map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button
          startIcon={<SettingsIcon />}
          variant="outlined"
          onClick={onOpenCategory}
          sx={{ height: size === "small" ? 40 : 48, whiteSpace: "nowrap" }}
        >
          카테고리 관리
        </Button>
      </Stack>
    </Box>
  );
};

export default SupportCategoryInput;
