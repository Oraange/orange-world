import type { Todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(`${API_BASE_URL}/api/todos`);

    if (!res.ok) {
        throw new Error('Failed to fetch todos');
    }

    return res.json();
}

export async function createTodo(text: string): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });

    if (!res.ok) {
        throw new Error('Failed to save todos');
    }
    return res.json();
}

export async function clearTodos(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to clear todos');
    }
}

export async function updateTodo(
    id: number,
    data: Partial<Pick<Todo, 'text' | 'completed'>>
): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update todo');
    }
}
