import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Google: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(
        `http://localhost:8000/api/user/google/callback/?code=${code}`
      ).then((res) => res.json());

      if (response.code === 200) {
        router.push("/");
      }
    };

    if (code) {
      getToken();
    }
  }, [code]);

  return <div>Google Login....</div>;
};

export default Google;
