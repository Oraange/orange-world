import { useState, useEffect } from "react";

interface GameResult {
  guess: string;
  strike: number;
  ball: number;
  out: number;
}

export function AlphaBaseball() {
  const [answer, setAnswer] = useState<string>("");
  const [guess, setGuess] = useState<string>("");
  const [history, setHistory] = useState<GameResult[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [attempts, setAttempts] = useState<number>(0);
  const [wordList, setWordList] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const maxAttempts = 10;

  // 단어 목록 로드
  useEffect(() => {
    const loadWordList = async () => {
      try {
        const response = await fetch("/src/app/assets/words.txt");
        const text = await response.text();
        const words = text
          .split("\n")
          .map((word) => word.trim().toLowerCase())
          .filter((word) => word.length === 5);
        setWordList(words);
      } catch (error) {
        console.error("단어 목록을 불러오는데 실패했습니다:", error);
      }
    };
    loadWordList();
  }, []);

  // 토스트 메시지 표시
  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message, show: false }), 2000);
  };

  const initGame = () => {
    if (wordList.length === 0) return;
    const newAnswer = wordList[Math.floor(Math.random() * wordList.length)];
    setAnswer(newAnswer);
    setGuess("");
    setHistory([]);
    setGameStatus("playing");
    setAttempts(0);
  };

  useEffect(() => {
    if (wordList.length > 0) {
      initGame();
    }
  }, [wordList]);

  const checkGuess = () => {
    if (guess.length !== 5) {
      showToast("5글자 단어를 입력해주세요!");
      return;
    }

    let strike = 0;
    let ball = 0;
    let out = 0;

    for (let i = 0; i < 5; i++) {
      if (guess[i] === answer[i]) {
        strike++;
      } else if (answer.includes(guess[i])) {
        ball++;
      } else {
        out++;
      }
    }

    const newResult: GameResult = { guess, strike, ball, out };
    const newHistory = [...history, newResult];
    setHistory(newHistory);
    setAttempts(attempts + 1);
    setGuess("");

    if (strike === 5) {
      setGameStatus("won");
    } else if (attempts > maxAttempts) {
      setGameStatus("lost");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkGuess();
    }
  };
  return (
    <div className="max-w-6xl mx-auto">
      {/* 토스트 메시지 */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="text-xl">⚠️</span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
      {/* 게임 설명 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">
          단어 야구 게임
        </h2>
        <p className="text-blue-800">
          5글자 영어 단어를 맞춰보세요! 글자가 맞으면 스트라이크, 글자는
          틀렸지만 단어에 포함되어 있으면 볼, 단어에 포함되지 않으면 아웃입니다.
          6번의 기회 안에 단어를 맞히면 승리합니다!
        </p>
      </div>
      {/* 게임 인터페이스 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={5}
            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xl text-center font-bold"
            placeholder="5글자 단어 입력"
          />
          <button
            onClick={checkGuess}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            확인
          </button>
        </div>
        <div className="mb-4">
          <div className="text-base font-semibold text-gray-700">
            시도 횟수: <span className="text-blue-600">{attempts}</span> /{" "}
            {maxAttempts}
          </div>
        </div>
        {/* 결과 히스토리 */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <span className="text-2xl font-bold text-gray-900">
                {result.guess}
              </span>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold text-sm">
                  {result.strike}S
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold text-sm">
                  {result.ball}B
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm">
                  {result.out}O
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* 게임 종료 메시지 */}
        {gameStatus !== "playing" && (
          <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg text-center">
            {gameStatus === "won" ? (
              <h3 className="text-2xl font-bold text-green-800">
                🎉 축하합니다! 단어를 맞히셨습니다! 🎉
              </h3>
            ) : (
              <h3 className="text-2xl font-bold text-red-800">
                😞 아쉽네요! 정답은 "{answer.toUpperCase()}"였습니다. 😞
              </h3>
            )}
            <button
              onClick={initGame}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              다시 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
