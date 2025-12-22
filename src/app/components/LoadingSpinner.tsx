import { ClockLoader } from "react-spinners";

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}

export function LoadingSpinner({ 
    size = 50, 
    color = "#3b82f6" 
}: LoadingSpinnerProps) {
    return (
        <div className="flex items-center justify-center">
        <ClockLoader size={size} color={color} />
        </div>
    );
}
