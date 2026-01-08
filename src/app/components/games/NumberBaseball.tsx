import { useState, useEffect } from "react";

interface GameResult {
    guess: string;
    strike: number;
    ball: number;
}

export function NumberBaseball() {
    const [answer, setAnswer] = useState<string>("");
    const [guess, setGuess] = useState<string>("");
    const [history, setHistory] = useState<GameResult[]>([]);
    const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
    const [attempts, setAttempts] = useState<number>(0);
    const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: "", show: false });
    const maxAttempts = 9;

    // 토스트 메시지 표시
    const showToast = (message: string) => {
        setToast({ message, show: true });
        setTimeout(() => {
            setToast({ message: "", show: false });
        }, 2000);
    };

    // 게임 초기화
    const initGame = () => {
        const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const shuffled = digits.sort(() => Math.random() - 0.5);
        const newAnswer = shuffled.slice(0, 4).join("");
        setAnswer(newAnswer);
        setGuess("");
        setHistory([]);
        setGameStatus("playing");
        setAttempts(0);
    };

    useEffect(() => {
        initGame();
    }, []);

    const checkGuess = () => {
        if (guess.length !== 4) {
            showToast("4자리 숫자를 입력해주세요!");
            return;
        }

        if (new Set(guess).size !== 4) {
            showToast("중복되지 않는 숫자를 입력해주세요!");
            return;
        }

        if (!/^\d+$/.test(guess)) {
            showToast("숫자만 입력해주세요!");
            return;
        }

        let strike = 0;
        let ball = 0;

        for (let i = 0; i < 4; i++) {
            if (guess[i] === answer[i]) {
                strike++;
            } else if (answer.includes(guess[i])) {
                ball++;
            }
        }

        const newHistory = [...history, { guess, strike, ball }];
        setHistory(newHistory);
        setAttempts(attempts + 1);

        if (strike === 4) {
            setGameStatus("won");
        } else if (attempts + 1 >= maxAttempts) {
            setGameStatus("lost");
        }

        setGuess("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && gameStatus === "playing") {
            checkGuess();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // 숫자만 입력 가능하도록 필터링
        const numbersOnly = value.replace(/[^0-9]/g, "");
        setGuess(numbersOnly.slice(0, 4));
    };

    return (
        <div className="max-w-6xl mx-auto relative">
            {/* 토스트 알림 */}
            {toast.show && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
                    <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
                        <span className="text-xl">⚠️</span>
                        <span className="font-medium">{toast.message}</span>
                    </div>
                </div>
            )}

            {/* 게임 설명 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <h3 className="text-base font-semibold text-blue-900 mb-1">🎮 게임 규칙</h3>
                <ul className="text-xs text-blue-800 space-y-0.5">
                    <li>• 컴퓨터가 0~9 중 중복되지 않는 4자리 숫자를 생성합니다</li>
                    <li>• 숫자와 위치가 모두 맞으면 <strong>스트라이크</strong></li>
                    <li>• 숫자는 맞지만 위치가 다르면 <strong>볼</strong></li>
                    <li>• {maxAttempts}번 안에 정답을 맞춰보세요!</li>
                </ul>
            </div>

            {/* 좌우 레이아웃 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 왼쪽: 입력 및 현재 상태 */}
                <div className="space-y-4">
                    {/* 게임 상태 */}
                    <div className="bg-white rounded-xl shadow-lg p-5">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-base font-semibold text-gray-700">
                                시도 횟수: <span className="text-blue-600">{attempts}</span> / {maxAttempts}
                            </div>
                            <button
                                onClick={initGame}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                            >
                                🔄 새 게임
                            </button>
                        </div>

                        {/* 입력 영역 */}
                        {gameStatus === "playing" ? (
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={guess}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="4자리 숫자 입력"
                                        maxLength={4}
                                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xl text-center font-bold"
                                    />
                                    <button
                                        onClick={checkGuess}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base"
                                    >
                                        확인
                                    </button>
                                </div>

                                {/* 힌트 */}
                                {history.length > 0 && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <p className="text-sm text-yellow-800 font-medium mb-2">
                                            💡 최근 입력 결과
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-gray-900">
                                                {history[history.length - 1].guess}
                                            </span>
                                            <div className="flex gap-2">
                                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold text-sm">
                                                    {history[history.length - 1].strike}S
                                                </span>
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold text-sm">
                                                    {history[history.length - 1].ball}B
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                {gameStatus === "won" ? (
                                    <div>
                                        <div className="text-5xl mb-3">🎉</div>
                                        <h3 className="text-2xl font-bold text-green-600 mb-2">축하합니다!</h3>
                                        <p className="text-lg text-gray-700">
                                            정답: <span className="font-bold text-blue-600">{answer}</span>
                                        </p>
                                        <p className="text-gray-600 mt-1 text-sm">
                                            {attempts}번 만에 맞추셨습니다!
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-5xl mb-3">😢</div>
                                        <h3 className="text-2xl font-bold text-red-600 mb-2">게임 오버!</h3>
                                        <p className="text-lg text-gray-700">
                                            정답: <span className="font-bold text-blue-600">{answer}</span>
                                        </p>
                                        <p className="text-gray-600 mt-1 text-sm">다시 도전해보세요!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* 오른쪽: 시도 기록 */}
                <div className="bg-white rounded-xl shadow-lg p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">📊 시도 기록</h3>
                    {history.length === 0 ? (
                        <p className="text-center text-gray-500 py-12 text-sm">아직 시도한 기록이 없습니다</p>
                    ) : (
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                            {history.map((result, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-gray-600 font-medium text-sm w-8">#{index + 1}</span>
                                    <span className="text-xl font-bold text-gray-900">{result.guess}</span>
                                    <div className="flex gap-2">
                                        <span className="px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full font-semibold text-sm">
                                            {result.strike}S
                                        </span>
                                        <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-semibold text-sm">
                                            {result.ball}B
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
