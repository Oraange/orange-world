import { useState, useEffect } from "react";
import { TodoItem } from "../components/TodoItem";
import type { Todo } from "../../types/todo";
import { AddTodo } from "../components/AddTodo";
import { CheckCircle } from "lucide-react";
import {
    fetchTodos,
    createTodo,
    clearTodos,
    updateTodo
} from "../../services/todoService";

export default async function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos()
            .then(setTodos)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const addTodo = async (text: string) => {
        const newTodo: Todo = await createTodo(text);
        setTodos([newTodo, ...todos]);
    };

    const toggleTodo = async (id: number) => {
        setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
        );
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const stats = {
        total: todos.length,
        active: todos.filter((t) => !t.completed).length,
        completed: todos.filter((t) => t.completed).length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
                <CheckCircle className="w-12 h-12 text-blue-600" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                할 일 관리
                </h1>
            </div>
            <p className="text-gray-600 text-lg">
                오늘 할 일을 체계적으로 관리하세요
            </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 backdrop-blur-sm bg-opacity-95">
            <AddTodo onAdd={addTodo} />

            <div className="flex gap-2 my-6 border-b border-gray-200 pb-4">
                <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    filter === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                >
                전체 {stats.total}
                </button>
                <button
                onClick={() => setFilter("active")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    filter === "active"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                >
                진행중 {stats.active}
                </button>
                <button
                onClick={() => setFilter("completed")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    filter === "completed"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                >
                완료 {stats.completed}
                </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredTodos.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-500 text-lg">
                    {filter === "all" && "할 일을 추가해보세요!"}
                    {filter === "active" && "진행중인 할 일이 없습니다"}
                    {filter === "completed" && "완료된 할 일이 없습니다"}
                    </p>
                </div>
                ) : (
                filteredTodos.map((todo) => (
                    <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    />
                ))
                )}
            </div>
            </div>

            <div className="text-center text-gray-500 text-sm">
            총 {stats.total}개의 할 일 중 {stats.completed}개 완료
            </div>
        </div>
        </div>
    );
}
