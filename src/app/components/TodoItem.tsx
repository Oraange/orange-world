import { Trash2 } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
        aria-label="할 일 삭제"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
