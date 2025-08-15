import { Box, Typography, Button, Select } from "@mui/material";
import ContentSearchbar from "../../components/ContentSearchbar";
import { useState } from "react";
import { Outlet, useOutlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
const selectBtn = [
  { value: "wall", label: "홀파 담벼락" },
  { value: "sail", label: "돛단배" },
  { value: "help", label: "홀파상담방" },
  { value: "message", label: "생명메세지/희망메시지" },
];

const btnColor = { activeColor: "#d34204d0", inactiveColor: "#1976d2" };

const SelectButton = ({ value, label, isActive, onClick }) => {
  return (
    <Button
      sx={{
        bgcolor: isActive ? btnColor.activeColor : btnColor.inactiveColor,
        color: "white",
        fontSize: "1rem",
        width: 200,
        height: 48,
      }}
      onClick={() => onClick(value)}
    >
      {label}
    </Button>
  );
};
const SailBoatHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography>[홀파 담벼락]</Typography>
      <ContentSearchbar />
      <Typography>
        {"게시물관리 > 신고된 게시물보기 > 홀파담벼락 신고 관리"}
      </Typography>
    </Box>
  );
};
const WallHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography>[돛단배]</Typography>
      <ContentSearchbar />
      <Typography>
        {"게시물관리 > 신고된 게시물보기 > 돛단배 신고 관리"}
      </Typography>
    </Box>
  );
};
const HolpaHelpHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography>[홀파 상담방]</Typography>
      <ContentSearchbar />
      <Typography>
        {"게시물관리 > 신고된 게시물보기 > 홀파상담방 신고 관리"}
      </Typography>
    </Box>
  );
};
const MessageHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography>[홀파 담벼락]</Typography>
      <ContentSearchbar />
      <Typography>
        {"게시물관리 > 신고된 게시물보기 > 생명.희망메시지 신고 관리"}
      </Typography>
    </Box>
  );
};
const ReportPostPage = () => {
  const location = useLocation();
  const [selectedBtn, setSelectedBtn] = useState("wall");

  const renderHeader = () => {
    if (location.pathname.includes("sail")) return <WallHeader />;
    if (location.pathname.includes("help")) return <HolpaHelpHeader />;
    if (location.pathname.includes("message")) return <MessageHeader />;
    return <SailBoatHeader />;
  };

  const handleBtn = (value) => {
    setSelectedBtn(value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        {selectBtn.map((item) => (
          <SelectButton
            key={item.value}
            value={item.value}
            label={item.label}
            isActive={selectedBtn === item.value}
            onClick={handleBtn}
          />
        ))}
      </Box>

      <Box sx={{ mt: 2, width: "90%", mx: " auto" }}>{renderHeader()}</Box>

      <Outlet />
    </Box>
  );
};

export default ReportPostPage;
