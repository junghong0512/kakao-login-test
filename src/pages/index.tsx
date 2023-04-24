import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/signin/kakao",
    });
  };

  useEffect(() => {
    console.log(window?.Kakao?.Auth?.getAccessToken());
  }, []);

  const logoutWithKakao = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      console.log(
        "카카오 인증 액세스 토큰이 존재:",
        window.Kakao.Auth.getAccessToken()
      );

      window.Kakao.Auth.logout(() => {
        console.log(
          "로그아웃 완료, 액세스 토큰: ",
          window.Kakao.Auth.getAccessToken()
        );

        /*
          이 부분에서 access_token 및 refresh_token을
          지워주시면 좋을 것 같습니다!!
        */

        router.push("/signedOut");
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-7">
      <button
        onClick={loginWithKakao}
        className="bg-slate-900 px-3 py-2 text-white"
      >
        카카오 로그인
      </button>

      <button
        onClick={logoutWithKakao}
        className="bg-slate-700 px-3 py-2 text-white"
      >
        로그아웃
      </button>
    </div>
  );
}
