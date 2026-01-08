import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { NumberBaseball } from "../components/games/NumberBaseball";
import { AlphaBaseball } from "../components/games/AlphaBaseball";

export default function GamesPage() {
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [selectedMenu, setSelectedMenu] = useState("home");

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("게임 페이지를 불러오는 중...");

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setIsLoading, setLoadingMessage]);

  const menuItems = [
    { id: "home", label: "홈", icon: "🏠" },
    { id: "number-baseball", label: "숫자 야구", icon: "🥎" },
    { id: "alpha-baseball", label: "단어 야구", icon: "🅰️" },
    { id: "favorites", label: "즐겨찾기", icon: "⭐" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 좌측 고정 메뉴바 */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-lg overflow-y-auto z-30">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🕹️Menu</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${selectedMenu === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{menuItems.find(item => item.id === selectedMenu)?.icon} {menuItems.find(item => item.id === selectedMenu)?.label}</h1>

            {/* 컨텐츠 영역 */}
            <div className="mt-8">
              {selectedMenu === "home" && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎮</div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">게임 홈</h2>
                  <p className="text-gray-600">좌측 메뉴에서 게임 카테고리를 선택하세요</p>
                </div>
              )}

              {selectedMenu === "number-baseball" && (
                <div>
                  <NumberBaseball />
                </div>
              )}

              {selectedMenu === "alpha-baseball" && (
                <div>
                  <AlphaBaseball />
                </div>
              )}

              {selectedMenu === "favorites" && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⭐</div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">즐겨찾기</h2>
                  <p className="text-gray-600">즐겨찾는 게임 목록이 여기에 표시됩니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
