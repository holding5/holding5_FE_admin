import { Box, Stack, Button } from "@mui/material";
import BannedUserCard from "../components/BannedUserCard";
import { useOutletContext } from "react-router-dom";
import ContentSearchbar from "../../components/ContentSearchbar";

const BannedUserListPage = () => {
  const { userData } = useOutletContext();

  return (
    <Box sx={{ maxWidth: "1100px", mx: "auto", my: "30px" }}>
      <Stack spacing={2} sx={{ alignItems: "center", mb: "30px" }}>
        <ContentSearchbar />
        <Button
          sx={{
            alignSelf: "flex-start",
            color: "white",
            backgroundColor: "rgba(240,110,52,1)",
            "&:hover": {
              backgroundColor: "rgba(255, 167, 52, 1)",
              borderColor: "wheat",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease-in-out",
            },
            p: "10px 30px",
          }}
        >
          영구제명 해제
        </Button>
      </Stack>

      <Stack spacing={2}>
        {userData.map((user) => (
          <BannedUserCard key={user.id} userData={user} />
        ))}
      </Stack>
    </Box>
  );
};

export default BannedUserListPage;
