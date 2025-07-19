import Header from "../../components/Header";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ContentSearchbar from "../../components/ContentSearchbar";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SignUpListCard from "../components/SignUpListCard";

const HappyinSignupListPage = () => {
  const dummyData = [
    {
      id: "1",
      name: "스코어의 남자",
      type: "일반 해피인",
      birthDate: "1991.12.07",
      school: "경기도 교육청 안전학교",
      phone: "010-2345-4567",
      career: "초중고 학교에서 교과 및 체육회에서 예술 체육지도",
      motivation:
        "학생들의 고충을 이해하고 함께 소통하며 진실되 마음으로 이야기를 들어주는 조금이나마 힘을 보탤 수 있는 대나무숲이 되어 주고 싶네요",
      fileAttached: true,
      applicationDate: "2024-6-21",
      state: "대기",
    },
    {
      id: "2",
      name: "미녀는 괴로워",
      type: "특별 해피인",
      birthDate: "1985.05.10",
      school: "서울시 교육청",
      phone: "010-9876-5432",
      career: "교육 컨설팅 10년 경력",
      motivation:
        "학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.학생들의 잠재력을 끌어올리는 데 기여하고 싶습니다.",
      fileAttached: false,
      applicationDate: "2024-6-20",
      state: "승인", // 승인 상태
    },
    {
      id: "3",
      name: "쿵푸푸어",
      type: "일반 해피인",
      birthDate: "2000.01.01",
      school: "대구시 청소년 상담센터",
      phone: "010-1111-2222",
      career: "청소년 심리 상담 보조",
      motivation: "더 많은 청소년에게 도움을 주기 위해 신청합니다.",
      fileAttached: true,
      applicationDate: "2024-6-19",
      state: "거절", // 거절 상태
    },
    {
      id: "4",
      name: "행복한 길",
      type: "일반 해피인",
      birthDate: "1995.03.15",
      school: "인천시 청소년수련원",
      phone: "010-3333-4444",
      career: "사회복지사",
      motivation: "다양한 경험을 바탕으로 상담 활동을 하고자 합니다.",
      fileAttached: true,
      applicationDate: "2024-6-18",
      state: "보류", // 보류 상태
    },
  ];
  const filterOptions = [
    { key: "all", text: "전체" },
    { key: "pending", text: "대기" },
    { key: "approved", text: "승인" },
    { key: "rejected", text: "거절" },
    { key: "hold", text: "보류" },
  ];

  const [anchorEl, setAcnhorEl] = useState(null);
  const [selectedState, setSelectedState] = useState(filterOptions[0].text);

  const open = Boolean(anchorEl);

  const onClickOpen = (e) => {
    setAcnhorEl(e.currentTarget);
  };

  const onClickClose = () => {
    setAcnhorEl(null);
  };

  const onClickMenuItem = (item) => {
    setSelectedState(item);
  };

  return (
    <Box sx={{ pl: "15px" }}>
      <Box
        sx={{
          mt: "20px",
          display: "flex",
          justifyContent: "center",
          mb: "20px",
        }}
      >
        <ContentSearchbar />
      </Box>

      <Button
        variant="contained"
        onClick={onClickOpen}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: "#A0522D",
          color: "white",
          padding: "5px 40px",
          mb: "10px",
        }}
      >
        {selectedState}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={onClickClose}>
        {filterOptions.map((option) => (
          <MenuItem
            key={option.key}
            onClick={() => onClickMenuItem(option.text)}
            selected={option.text === selectedState}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>

      <Box>
        {dummyData.map((item) => (
          <SignUpListCard key={item.id} userData={item} />
        ))}
      </Box>
    </Box>
  );
};

export default HappyinSignupListPage;
