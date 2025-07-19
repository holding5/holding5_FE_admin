import { useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserSelectButton = () => {
  const nav = useNavigate();

  const buttonData = [
    {
      id: "all",
      text: "전체",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "opinion",
      text: "오피니언해피인",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "normal",
      text: "일반해피인",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "group",
      text: "그룹해피인",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "etc",
      text: "또래해피인",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
  ];

  const [activeButtonId, setActiveButtonId] = useState("");

  const onClickUser = (buttonId) => {
    setActiveButtonId(buttonId);

    if(buttonId == "group") // 그룹해피인 이동
    {
      nav("/happy-manage/group");
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        mt: 2,
        mb: 2,
        justifyContent: "space-between",
        padding: "0px 10px",
      }}
    >
      {buttonData.map((button) => (
        <Button
          key={button.id}
          onClick={() => onClickUser(button.id)}
          sx={{
            backgroundColor:
              activeButtonId === button.id
                ? button.activeColor
                : button.inactiveColor,
            color: "white",
            width: "200px",
            height: "50px",
            borderRadius: "30px",
          }}
        >
          {button.text}
        </Button>
      ))}
    </Stack>
  );
};
export default UserSelectButton;
