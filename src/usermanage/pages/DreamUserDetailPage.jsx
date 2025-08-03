import { Button, Box, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import userData from "../../modules/UserData";
import { useState } from "react";
import DreamUserDetailPosts from "../../components/DreamUserDetailPosts";
import DreamUserDetailProfile from "../../components/DreamUserDetailProfile";
import DreamUserEvaluation from "../components/DreamUserEvaluation";
import ContentSearchbar from "../../components/ContentSearchbar";

const DreamUserDetailPage = () => {
  const nav = useNavigate();
  const params = useParams();
  const defaultData = userData.find(
    (item) => String(item.id) === String(params.id)
  );
  const [happyUserData, setUserData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState("profile");

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...happyUserData, [name]: value });
  };

  const activeComponents = {
    profile: (
      <DreamUserDetailProfile
        userData={happyUserData}
        onChange={onChangeData}
      />
    ),
    posts: (
      <DreamUserDetailPosts userData={happyUserData} onChange={onChangeData} />
    ),
    eval: (
      <DreamUserEvaluation userData={happyUserData} onChange={onChangeData} />
    ),
  };

  const activeBtn = [
    {
      id: "profile",
      text: "신상정보",
      activeColor: "#d34204d0",
      inactiveColor: "#1976d2",
    },
    {
      id: "posts",
      text: "게시물활동",
      activeColor: "#d34204d0",
      inactiveColor: "#1976d2",
    },
    {
      id: "eval",
      text: "활동평가",
      activeColor: "#d34204d0",
      inactiveColor: "#1976d2",
    },
  ];

  return (
    <Box component="main" sx={{ mt: 3 }}>
      <Stack
        direction="row"
        sx={{
          pl: "30px",
          pr: "50px",
          mb: "10px",
          gap: "150px",
        }}
      >
        <Button
          onClick={() => {
            nav(-1);
          }}
          sx={{
            backgroundColor: "rgba(7, 209, 245, 1)",

            color: "white",
            padding: "10px 30px",
          }}
        >
          back
        </Button>

        {activeTab !== "profile" && <ContentSearchbar />}
      </Stack>

      <Stack
        direction="row"
        sx={{ paddingLeft: "50px", gap: "30px", marginBottom: "20px" }}
      >
        {activeBtn.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
              }}
              sx={{
                padding: "5px 40px",
                backgroundColor: isActive
                  ? item.activeColor
                  : item.inactiveColor,
                color: "white",
                borderRadius: "2px",
              }}
            >
              {item.text}
            </Button>
          );
        })}
      </Stack>

      <Box sx={{ paddingLeft: "3.125rem" }}>{activeComponents[activeTab]}</Box>
    </Box>
  );
};

export default DreamUserDetailPage;
