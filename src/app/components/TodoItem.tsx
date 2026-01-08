import { Trash2, Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import type { Todo } from "../../types/todo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

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
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-0 focus:outline-none cursor-pointer flex-shrink-0"
      />
      <div
        className={`flex-1 cursor-pointer prose prose-sm max-w-none ${todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        onClick={() => onToggle(todo.id!)}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // 커스텀 스타일 적용
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-2 mb-1" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-2 mb-1" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-1 mb-1" {...props} />,
            p: ({ node, ...props }) => <p className="my-1" {...props} />,
            pre: ({ node, ...props }) => (
              <pre className="bg-gray-900 text-white p-3 rounded my-2 overflow-x-auto" {...props} />
            ),
            code: ({ node, className, children, ...props }: any) => {
              // className이 있으면 코드 블록 (pre 태그 안에 있음)
              // className이 없으면 인라인 코드
              const isCodeBlock = className && className.startsWith('language-');
              return isCodeBlock ? (
                <code className={`font-mono text-sm ${className}`} {...props}>
                  {children}
                </code>
              ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-pink-600" {...props}>
                  {children}
                </code>
              );
            },
            ul: ({ node, ...props }) => <ul className="list-disc list-inside my-1" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-1" {...props} />,
          }}
        >
          {todo.text}
        </ReactMarkdown>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors flex-shrink-0"
        aria-label="할 일 수정"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onDelete(todo.id!)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
        aria-label="할 일 삭제"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
