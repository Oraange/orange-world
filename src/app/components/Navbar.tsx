import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { handleKakaoLogin } from "@/services/kakaoService";

export function Navbar() {
  const location = useLocation();
  const { user, nickname, profileImgPath, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Todo", path: "/todo" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Games", path: "/games" },
  ];

  const onLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            {/* 로고 영역 */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-8 w-8"
                  onError={(e) => {
                    // SVG 로드 실패 시 PNG로 폴백
                    e.currentTarget.src = "/logo.png";
                  }}
                />
                <span className="text-xl font-bold text-gray-900">
                  TodoRange
                </span>
              </Link>
            </div>

            {/* 네비게이션 메뉴 */}
            <div className="flex space-x-8 ml-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Login/User Info */}
          <div className="flex items-center ml-auto gap-4">
            {user ? (
              <>
                <div className="flex items-center text-gray-700 font-medium">
                  <img
                    src={profileImgPath}
                    alt="Profile"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  <span>{nickname}님 환영합니다!</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full hover:from-orange-500 hover:to-orange-600 transition-all duration-200 cursor-pointer font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={handleKakaoLogin}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img
                  src="/kakao_login_medium.png"
                  alt="카카오 로그인"
                  className="h-10"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
