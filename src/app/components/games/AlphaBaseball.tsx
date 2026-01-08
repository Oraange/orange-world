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
        // Vite의 public 폴더는 루트 경로(/)로 접근 가능
        const response = await fetch("/words.txt");
        const text = await response.text();
        const words = text
          .split("\n")
          .map((word) => word.trim().toUpperCase())
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

  // 전역 키보드 이벤트 리스너
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (gameStatus !== "playing") {
          // 게임이 끝난 경우 Enter로 다시 시작
          initGame();
        } else if (guess.length === 5) {
          checkGuess();
        }
      } else if (gameStatus === "playing") {
        if (e.key === "Backspace") {
          setGuess((prev) => prev.slice(0, -1));
        } else if (/^[a-zA-Z]$/.test(e.key) && guess.length < 5) {
          setGuess((prev) => prev + e.key.toUpperCase());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStatus, guess]);

  const checkGuess = () => {
    if (guess.length !== 5) {
      showToast("5글자 단어를 입력해주세요!");
      return;
    }

    if (/^[a-zA-Z]{5}$/.test(guess) === false) {
      showToast("영어 알파벳 5글자만 입력 가능합니다!");
      return;
    }

    if (!wordList.includes(guess.toUpperCase())) {
      showToast("단어 목록에 없는 단어입니다!");
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
    setGuess("");

    if (strike === 5) {
      setGameStatus("won");
    } else if (attempts + 1 >= maxAttempts) {
      setGameStatus("lost");
    }
    setAttempts(attempts + 1);
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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-1">
          단어 야구 게임
        </h2>
        <p className="text-sm text-blue-800">
          5글자 영어 단어를 맞춰보세요! {maxAttempts}번의 기회가 있습니다.
        </p>
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-green-600">S (Strike):</span>
            <span>정답 위치</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-yellow-600">B (Ball):</span>
            <span>다른 위치</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-500">O (Out):</span>
            <span>없는 글자</span>
          </div>
        </div>
      </div>

      {/* 게임 격자 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex flex-col items-center gap-2 mb-6">
          {Array.from({ length: maxAttempts }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4">
              {/* 입력 칸들 */}
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  let letter = "";
                  let borderColor = "border-gray-300";

                  if (rowIndex < history.length) {
                    // 이미 제출된 행
                    letter = history[rowIndex].guess[colIndex];
                    borderColor = "border-gray-400";
                  } else if (rowIndex === history.length) {
                    // 현재 입력 중인 행
                    letter = guess[colIndex] || "";
                    borderColor =
                      letter !== "" ? "border-blue-500" : "border-gray-300";
                  }

                  return (
                    <div
                      key={colIndex}
                      className={`w-12 h-12 border-2 ${borderColor} rounded-md flex items-center justify-center text-xl font-bold transition-all duration-200 bg-white`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>

              {/* 결과 표시 (제출된 행에만) */}
              <div className="w-24 text-left">
                {rowIndex < history.length && (
                  <span className="text-sm font-semibold text-gray-700">
                    <span className="text-green-600">
                      {history[rowIndex].strike}S
                    </span>{" "}
                    <span className="text-yellow-600">
                      {history[rowIndex].ball}B
                    </span>{" "}
                    <span className="text-gray-500">
                      {history[rowIndex].out}O
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 제출 버튼 */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={checkGuess}
            disabled={guess.length !== 5 || gameStatus !== "playing"}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-colors ${
              guess.length === 5 && gameStatus === "playing"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            제출 (Enter)
          </button>
          <p className="text-sm text-gray-500">
            키보드로 입력하고 Enter를 눌러 제출하세요
          </p>
        </div>

        {/* 시도 횟수 */}
        <div className="mt-4 text-center">
          <div className="text-base font-semibold text-gray-700">
            시도 횟수: <span className="text-blue-600">{attempts}</span> /{" "}
            {maxAttempts}
          </div>
        </div>
      </div>

      {/* 게임 종료 팝업 */}
      {gameStatus !== "playing" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center animate-scale-in">
            {gameStatus === "won" ? (
              <div>
                <div className="text-7xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold text-green-600 mb-3">
                  축하합니다!
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  {attempts}번 만에 단어를 맞히셨습니다!
                </p>
              </div>
            ) : (
              <div>
                <div className="text-7xl mb-4">😢</div>
                <h3 className="text-3xl font-bold text-red-600 mb-3">
                  아쉽네요!
                </h3>
                <p className="text-lg text-gray-700 mb-2">
                  정답은{" "}
                  <span className="font-bold text-blue-600 text-2xl">
                    {answer}
                  </span>
                  였습니다.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  다음에는 꼭 맞춰보세요!
                </p>
              </div>
            )}
            <button
              onClick={initGame}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
            >
              다시 시작 (Enter)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
