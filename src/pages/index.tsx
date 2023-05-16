import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/signin/kakao",
    });
  };

  const initNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_NAVER_CLIENT_ID,
      // callbackUrl: `localhost:3000/siginin/naver/login?naver=true`,
      callbackUrl: `http://localhost:3000/signin/naver`,
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 60 },
      callbackHandle: true,
    });

    naverLogin.init();
  };

  const getData = () => {
    if (window.location.href.includes("access_token")) {
      console.log("We got AccessToken");
    }
  };

  useEffect(() => {
    /* 카카오 */
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY); // 발급받은 키 중 javascript키를 사용해준다.
    }

    /* 네이버 */
    initNaverLogin();
    getData();
  }, []);

  const handleNaverClick = () => {
    const naverLoginButton = document.getElementById(
      "naverIdLogin_loginButton"
    );
    if (naverLoginButton) naverLoginButton.click();
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

  const onClickNaverLogin = async () => {
    router.push("http://localhost:8000/api/user/naver/login");
    // await fetch("http://localhost:8000/api/user/naver/login");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-7">
      {/* KAKAO LOGIN */}
      <div>
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

      {/* NAVER LOGIN */}
      <div>
        {/* <div id="naverIdLogin" style={{ display: "none" }} /> */}
        <div onClick={handleNaverClick}>네이버 로그인</div>
        <div id="naverIdLogin" style={{ display: "none" }} />
      </div>

      <div>
        <button onClick={onClickNaverLogin}>네이버 로그인</button>
      </div>
    </div>
  );
}
