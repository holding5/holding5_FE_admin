import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [openMember, setOpenMember] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openBoat, setOpenBoat] = useState(false);
  const [openCounsel, setOpenCounsel] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openSystem, setOpenSystem] = useState(false);

  const isSelected = (path) => location.pathname === path;
  const menuItemStyle = (path) => ({
    pl: 4,
    color: isSelected(path) ? "white" : "inherit",
    backgroundColor: isSelected(path) ? "#457B9D" : "inherit",
    "&.Mui-selected": {
      backgroundColor: "#457B9D",
      color: "white",
    },
  });

  return (
    <Box
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        backgroundColor: "#27374D",
        color: "white",
      }}
    >
      <Box sx={{ mt: 2 }}>
        <List>
          {/* 회원관리 */}
          <ListItemButton onClick={() => setOpenMember(!openMember)}>
            <ListItemText primary="회원관리" />
            {openMember ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMember} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="해피인 관리" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="해피인 신청" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/dream-manage")} sx={menuItemStyle("/dream-manage")}> 
              <ListItemText primary="드림인 관리" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="카운셀러 관리" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="등급 관리" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="일시정지 회원 관리" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="영구퇴출 회원 관리" />
            </ListItemButton>
          </Collapse>

          {/* 게시물 관리 */}
          <ListItemButton onClick={() => setOpenPost(!openPost)}>
            <ListItemText primary="게시물 관리" />
            {openPost ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openPost} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="생명메시지" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="희망메시지" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="축하메시지" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="홀파담벼락" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="캣츠아이 / 진실노트" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="극복수기" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="공지사항" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="운영자에게 건의" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="신고된 게시물 보기" />
            </ListItemButton>
          </Collapse>

          {/* 돛단배 */}
          <ListItemButton onClick={() => setOpenBoat(!openBoat)}>
            <ListItemText primary="돛단배" />
            {openBoat ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openBoat} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}>
              <ListItemText primary="돛단배 리스트" />
            </ListItemButton>
          </Collapse>

          {/* 홀파 상담실 */}
          <ListItemButton onClick={() => setOpenCounsel(!openCounsel)}>
            <ListItemText primary="홀파 상담실" />
            {openCounsel ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCounsel} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}>
              <ListItemText primary="홀파상담실 리스트" />
            </ListItemButton>
          </Collapse>

          {/* 이벤트 관리 */}
          <ListItemButton onClick={() => setOpenEvent(!openEvent)}>
            <ListItemText primary="이벤트 관리" />
            {openEvent ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEvent} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="전체" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="가입 환영인사" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="생일 축하인사" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="시험격려" />
            </ListItemButton>
          </Collapse>

          {/* 메시지 발송 */}
          <ListItemButton onClick={() => setOpenMessage(!openMessage)}>
            <ListItemText primary="메시지 발송" />
            {openMessage ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMessage} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}>
              <ListItemText primary="메시지 리스트" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="메시지 발송" />
            </ListItemButton>
          </Collapse>

          {/* 시스템 관리 */}
          <ListItemButton onClick={() => setOpenSystem(!openSystem)}>
            <ListItemText primary="시스템 관리" />
            {openSystem ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSystem} timeout="auto" unmountOnExit>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="F & Q 관리" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="해피인 안내" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="도움주신 분" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="학교 / 경찰서 등록" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="생명살림 집계" />
            </ListItemButton>
            <ListItemButton onClick={() => nav("/")} sx={menuItemStyle("/")}> 
              <ListItemText primary="관리자 관리" />
            </ListItemButton>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
