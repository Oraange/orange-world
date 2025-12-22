import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingOverlayProps {
    message?: string;
}

export function LoadingOverlay({ message = "로딩 중..." }: LoadingOverlayProps) {
    return (
        <div className="fixed left-0 right-0 top-16 bottom-0 bg-white bg-opacity-90 flex items-center justify-center z-40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <LoadingSpinner size={60} />
            <p className="text-gray-700 font-medium text-lg">{message}</p>
        </div>
        </div>
    );
}
