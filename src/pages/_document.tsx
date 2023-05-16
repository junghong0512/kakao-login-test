import { Html, Head, Main, NextScript } from "next/document";

//https://developers.kakao.com/docs/latest/ko/sdk-download/js

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>

        <script
          defer
          type="text/javascript"
          src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
          charSet="utf-8"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
