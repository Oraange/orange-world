import type { Todo } from '../types/todo';

export const mockTodos: Todo[] = [
    {
        id: '1',
        text: 'Learn TypeScript',
        completed: false,
        createdAt: Date.now() - 1000 * 60 * 60,
    },
    {
        id: '2',
        text: 'Build a Todo App',
        completed: true,
        createdAt: Date.now() - 1000 * 60 * 30,
    },
    {
        id: '3',
        text: 'Write Unit Tests',
        completed: false,
        createdAt: Date.now() - 1000 * 60 * 10,
    },
];
