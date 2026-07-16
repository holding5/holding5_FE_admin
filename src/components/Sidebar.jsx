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
  const [openNote, setOpenNote] = useState(false); // 미카엘 노트 열림
  const [openSchool, setOpenSchool] = useState(false); // 시스템 관리 열림
  const [openSystem, setOpenSystem] = useState(false); // 시스템 관리 열림

  const memberMenutItem = [
    { text: "해피인 관리", path: "/admin/user/happy" },
    { text: "해피인 신청", path: "/admin/user/happy/application" },
    { text: "드림인 관리", path: "/admin/user/dream" },
    { text: "일시정지 회원관리", path: "/admin/user/paused" },
    { text: "영구정지 회원관리", path: "/admin/user/banned" },
  ];

  const postMenuItem = [
    { text: "홀파담벼락", path: "/admin/post/holpa" },
    { text: "캣츠아이", path: "/admin/post/catseye" },
    { text: "극복수기", path: "/admin/post/overcome" },
    { text: "신고된 게시물 보기", path: "/admin/post/reported" },
    { text: "희망메시지", path: "/admin/post/hope" },
    { text: "생명메시지", path: "/admin/post/life" },
    { text: "축하메시지", path: "/admin/post/congratulatory" },
    { text: "공지사항", path: "/admin/post/notice" },
  ];

  const boatMenuItem = [
    { text: "돛단배 리스트", path: "/admin/boat/boat-list" },
  ];

  const noteMenuItem = [
    { text: "미카엘 노트", path: "/admin/note/michaelnote" },
  ];

  const schoolMenuItem = [
    { text: "학교, 경찰서 등록", path: "/admin/school-police" },
    { text: "회원학교 관리", path: "/admin/school-police/member-school" },
  ];

  const systemMenuItem = [
    { text: "관리자 관리", path: "/admin/system/admin" },
    { text: "건의하기 관리", path: "/admin/system/suggestion" },
    { text: "도움주신 분 관리", path: "/admin/system/contributor" },
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
            {boatMenuItem.map((item) => (
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

          <ListItemButton onClick={() => setOpenNote(!openNote)}>
            <ListItemText primary="미카엘 노트" />
            {openNote ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openNote} timeout="auto" unmountOnExit>
            {noteMenuItem.map((item) => (
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

          <ListItemButton onClick={() => setOpenSchool(!openSchool)}>
            <ListItemText primary="학교/경찰서 관리" />
            {openSchool ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSchool} timeout="auto" unmountOnExit>
            {schoolMenuItem.map((item) => (
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

          <ListItemButton onClick={() => setOpenSystem(!openSystem)}>
            <ListItemText primary="시스템 관리" />
            {openSystem ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSystem} timeout="auto" unmountOnExit>
            {systemMenuItem.map((item) => (
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
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
