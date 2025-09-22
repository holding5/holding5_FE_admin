import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("✅ 카카오 인가코드:", code);

    if (!code) {
      alert("인가 코드가 없습니다.");
      navigate("/login");
      return;
    }

    // 🚧 아직 API 없음 → 가짜 토큰/유저로 처리
    setTimeout(() => {
      const fakeToken = "kakao-jwt-token";
      const fakeUser = {
        id: 99,
        email: "kakao_user@holding5.com",
        nickname: "카카오사용자",
        role: "ADMIN",
      };

      login(fakeToken, fakeUser); // ✅ 공통 login 처리
      navigate("/"); // 홈 또는 관리자 대시보드 등
    }, 1200);
  }, []);

  return <div style={{ padding: 40 }}>카카오 로그인 처리 중...</div>;
}
