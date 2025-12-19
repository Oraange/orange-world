import { Trash2, Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import type { Todo } from "../../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id!, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-blue-300 border-2">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
          aria-label="저장"
        >
          <Check className="w-5 h-5" />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 text-gray-400 hover:bg-gray-50 rounded-md transition-colors"
          aria-label="취소"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id!)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
        onClick={() => onToggle(todo.id!)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
        aria-label="할 일 수정"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onDelete(todo.id!)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
        aria-label="할 일 삭제"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
