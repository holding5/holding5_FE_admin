import { useState } from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HopeMessageSelectButton = () => {
  const nav = useNavigate();

  const buttonData = [
    {
      id: "all",
      text: "전체",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "allow",
      text: "승인 리스트",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "refusal",
      text: "거절 리스트",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
    {
      id: "input",
      text: "희망메시지 입력",
      activeColor: "#a52a2a",
      inactiveColor: "#1976d2",
    },
  ];

  const [activeButtonId, setActiveButtonId] = useState("");

  const onClickUser = (buttonId) => {
    setActiveButtonId(buttonId);

    if(buttonId == "all") // 전체 희망메시지 리스트로 이동
    {
      nav("/hope-message");
    }
    if(buttonId == "allow") // 승인 리스트로 이동
    {
      nav("/hope-message/allow");
    }
    if(buttonId == "refusal") // 거절 리스트로 이동
    {
      nav("/hope-message/refusal");
    }
    if(buttonId == "input") // 희망메세지 입력페이지로 이동
    {
      nav("/hope-message/input");
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        mt: 1,
        mb: 1,
        ml: 3,  
        justifyContent: "space-between",
        padding: "0px 10px",
        gap: "50px"
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
export default HopeMessageSelectButton;
