import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import Router, { useRouter } from "next/router";

const Naver: NextPage = () => {
  // const loginHandler = useCallback(async () => {
  //   const response: any = await fetch(
  //     `http://localhost:8000/api/user/naver/callback/?code=${access_token}&state=${state}`
  //   ).then((res) => res.json());
  // }, [router]);

  const router = useRouter();
  const { code, state } = router.query;

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(
        `http://localhost:8000/api/user/naver/callback/?code=${code}&state=${state}`
      ).then((res) => res.json());

      if (response.code === 200) {
        router.push("/");
      }
    };

    if (code && state) {
      getToken();
    }
  }, [code, state]);

  return <div>Naver Login...</div>;
};

export default Naver;
