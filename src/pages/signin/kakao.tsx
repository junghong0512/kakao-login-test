import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

interface ResponseType {
  ok: boolean;
  error?: any;
}

const Kakao: NextPage = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      const response: any = await fetch(
        `https://kyungdongdev.kro.kr/api/user/kakao/callback/?code=${code}`
        // `http://localhost:8000/api/user/kakao/callback/?code=${code}`
      ).then((res) => res.json());

      console.log("RESPONSE:", response);

      if (response.code === 200) {
        const { access_token, refresh_token, kakao_access_token, user } =
          response.data;
        window.Kakao.Auth.setAccessToken(kakao_access_token);

        /* 
          이 부분에서 access_token / refresh_token 을
          상태관리 변수나 쿠키에 저장하면 좋을 것 같습니다!!
        */

        router.push("/");
      } else {
        router.push("/notification/authentication-failed");
      }
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      console.log("code wrong");
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <div>Login 중</div>;
};

export default Kakao;
