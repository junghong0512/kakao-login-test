export default function Home() {
  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/signin/kakao",
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        onClick={loginWithKakao}
        className="bg-slate-900 px-3 py-2 text-white"
      >
        카카오 로그인
      </button>
    </div>
  );
}
