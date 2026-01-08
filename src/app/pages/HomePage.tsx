import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { setIsLoading, setLoadingMessage } = useLoading();

  useEffect(() => {
    // 페이지 진입 시 로딩 시뮬레이션
    setIsLoading(true);
    setLoadingMessage("홈페이지를 불러오는 중...");

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setIsLoading, setLoadingMessage]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 저를 소개합니다 */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 mb-8 text-center transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
            🍊 Orange World에 오신 것을 환영합니다!
          </h1>
          <p className="text-orange-100 text-lg font-medium">
            저의 세계로 여러분을 초대합니다
          </p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p className="text-lg">
            github, blog 등 자신의 성격, 강점 등을 추출하는 프로젝트
          </p>
          <p>
            [자기소개 내용을 여기에 작성하세요]
          </p>
          <p>
            [추가 소개 내용]
          </p>
        </div>
      </section>

      {/* 근무 이력 */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
          💼 근무 이력
        </h1>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              [회사명]
            </h3>
            <p className="text-gray-600 mb-2">[직책] | [근무기간]</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>[주요 업무 내용 1]</li>
              <li>[주요 업무 내용 2]</li>
              <li>[주요 업무 내용 3]</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              [회사명]
            </h3>
            <p className="text-gray-600 mb-2">[직책] | [근무기간]</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>[주요 업무 내용 1]</li>
              <li>[주요 업무 내용 2]</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 사용 기술 스택 */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
          🛠️ 사용 기술 스택
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">[기술명]</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Backend</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">[기술명]</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">[기술명]</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Database</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">MySQL</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">[기술명]</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Tools & Others</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Git</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Docker</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">[기술명]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
          📁 Portfolio
        </h1>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-700 mb-6 text-lg">
            더 많은 프로젝트와 상세한 포트폴리오를 확인하고 싶으시다면
          </p>
          <Link
            to="/portfolio"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            포트폴리오 페이지로 이동 →
          </Link>
        </div>
      </section>
    </div>
  );
}
