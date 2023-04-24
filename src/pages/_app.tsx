import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVSCRIPT_KEY); // 발급받은 키 중 javascript키를 사용해준다.
    }
  }, []);

  return <Component {...pageProps} />;
}
