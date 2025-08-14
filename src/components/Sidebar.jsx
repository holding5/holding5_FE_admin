import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const nav = useNavigate();
  const [openMember, setOpenMember] = useState(false); // 회원 관리 열림
  const [openPost, setOpenPost] = useState(false); // 게시물 관리 열림
  const [openBoat, setOpenBoat] = useState(false); // 돛단배 열림
  const [openCounsel, setOpenCounsel] = useState(false); // 홀파 상담실 열림
  const [openEvent, setOpenEvent] = useState(false); // 이벤트 관리 열림
  const [openMessage, setOpenMessage] = useState(false); // 메세지 발송 열림
  const [openSystem, setOpenSystem] = useState(false); // 시스템 관리 열림

  const memberMenutItem = [
    { text: "해피인 관리", path: "/" },
    { text: "해피인 신청", path: "/signuplist" },
    { text: "드림인 관리", path: "/dream-manage" },
    { text: "카운셀러 관리", path: "/" },
    { text: "등급관리", path: "/rankmanage" },
    { text: "일시정지 회원관리", path: "/pausedmanage" },
    { text: "영구탈퇴 회원관리", path: "/banned-manage" },
  ];

  const postMenuItem = [
    { text: "생명메시지", path: "/life-message" },
    { text: "희망메시지", path: "/hope-message" },
    { text: "축하메시지", path: "/congratulatory-message" },
    { text: "홀파담벼락", path: "/holpa-board" },
    { text: "캣츠아이 / 진실노트", path: "/catseye-truth" },
    { text: "극복수기", path: "/overcoming" },
    { text: "공지사항", path: "/announcement" },
    { text: "운영장에게 건의", path: "/recommendation" },
    { text: "신고된 게시물 보기", path: "/" },
  ];

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
          <ListItemButton onClick={() => setOpenMember(!openMember)}>
            <ListItemText primary="회원관리" />
            {openMember ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMember} timeout="auto" unmountOnExit>
            {memberMenutItem.map((item) => (
              <ListItemButton
                key={item.text}
                sx={{ pl: 4 }}
                onClick={() => {
                  nav(item.path);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </Collapse>

          <ListItemButton onClick={() => setOpenPost(!openPost)}>
            <ListItemText primary="게시물 관리" />
            {openPost ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openPost} timeout="auto" unmountOnExit>
            {postMenuItem.map((item) => (
              <ListItemButton
                key={item.text}
                sx={{ pl: 4 }}
                onClick={() => {
                  nav(item.path);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </Collapse>

          <ListItemButton onClick={() => setOpenBoat(!openBoat)}>
            <ListItemText primary="돛단배" />
            {openBoat ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openBoat} timeout="auto" unmountOnExit>
            {["돛단배 리스트"].map((item) => (
              <ListItemButton key={item} sx={{ pl: 4 }}>
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </Collapse>

          <ListItemButton onClick={() => setOpenCounsel(!openCounsel)}>
            <ListItemText primary="홀파 상담실" />
            {openCounsel ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCounsel} timeout="auto" unmountOnExit>
            {["홀파상담실 리스트"].map((item) => (
              <ListItemButton key={item} sx={{ pl: 4 }}>
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </Collapse>

          <ListItemButton onClick={() => setOpenEvent(!openEvent)}>
            <ListItemText primary="이벤트 관리" />
            {openEvent ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEvent} timeout="auto" unmountOnExit>
            {["전체", "가입 환영인사", "생일 축하인사", "시험격려"].map(
              (item) => (
                <ListItemButton key={item} sx={{ pl: 4 }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              )
            )}
          </Collapse>

          <ListItemButton onClick={() => setOpenMessage(!openMessage)}>
            <ListItemText primary="메시지 발송" />
            {openMessage ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMessage} timeout="auto" unmountOnExit>
            {["메시지 리스트", "메시지 발송"].map((item) => (
              <ListItemButton key={item} sx={{ pl: 4 }}>
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </Collapse>

          <ListItemButton onClick={() => setOpenSystem(!openSystem)}>
            <ListItemText primary="시스템 관리" />
            {openSystem ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSystem} timeout="auto" unmountOnExit>
            {[
              "시스템 현황",
              "F & Q 관리",
              "해피인 안내",
              "도움주신 분",
              "학교 / 경찰서 등록",
              "생명살림집계",
              "관리자 관리",
            ].map((item) => (
              <ListItemButton key={item} sx={{ pl: 4 }}>
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
