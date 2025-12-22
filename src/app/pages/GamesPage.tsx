import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

export default function GamesPage() {
  const { setIsLoading, setLoadingMessage } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("게임 페이지를 불러오는 중...");
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setIsLoading, setLoadingMessage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Games</h1>
        <p className="text-xl text-gray-600">
          게임 페이지 (준비 중)
        </p>
      </div>
    </div>
  );
}
