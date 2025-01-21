import React, { useState, useEffect } from 'react';
import { Todo } from '../Todo';
import { Todo as TodoModel } from '../../models/todo.model';
import { TodoForm } from '../TodoForm';
import { TodoCounter } from '../TodoCounter';
import { FilterButtons } from '../Button';
import { v4 as uuidv4 } from 'uuid';

const initialTodos: TodoModel[] = [
    {
        id: '51c1c4f1-03bf-48bf-9705-9dc97ab61a76',
        title: 'delectus aut autem',
        completed: false,
    },
    {
        id: '62aabce1-8f84-4684-90b9-2b2310cf726a',
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    },
    {
        id: '402ee516-6c72-4d16-a9a8-322069f5cf6e',
        title: 'fugiat veniam minus',
        completed: false,
    },
    {
        id: '3b720eaf-163a-41c8-bc5e-b47f2370cd0c',
        title: 'et porro tempora',
        completed: true,
    },
    {
        id: '3ab57b63-e789-4211-a507-6b89501bc39a',
        title: 'laboriosam mollitia et enim quasi adipisci quia illum',
        completed: false,
    },
    {
        id: '09d15f18-14ea-4fd3-b75b-e57777c25b3c',
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        completed: false,
    },
    {
        id: '46f5bdd5-dc22-441e-b78b-e812d817cfde',
        title: 'illo expedita consequatur quia in',
        completed: false,
    },
    {
        id: 'bce9f1e0-4383-40a6-9a10-2f59d9aa1465',
        title: 'quo adipisci enim quam ut ab',
        completed: true,
    },
    {
        id: '05da3453-89e2-4d44-8912-5b727218808c',
        title: 'molestiae perspiciatis ipsa',
        completed: false,
    },
    {
        id: 'c7034df3-eb7b-4cad-a323-3f5c6ceb9283',
        title: 'illo est ratione doloremque quia maiores aut',
        completed: true,
    },
];

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    //загрузка задач из localStorage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        setTodos(storedTodos.length > 0 ? storedTodos : initialTodos);
    }, []);

    //сохранение задач в localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    //Функция для добавления новой задачи
    const addTodo = (title: string) => {
        const newTodo: TodoModel = { id: uuidv4(), title, completed: false };
        setTodos([...todos, newTodo]);
    };

    //Функция для удаления задачи по ID
    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    //Функция для редактирования задачи
    const editTodo = (id: string, newTitle: string) => {
        const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo));
        setTodos(updatedTodos);
    };

    //Функция для переключения статуса выполнения задачи
    const toggleCompletion = (id: string) => {
        const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        setTodos(updatedTodos);
    };

    //Фильтрация задач
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // для 'all'
    });

    return (
        <div>
            <TodoCounter count={todos.length} />
            <FilterButtons filter={filter} setFilter={setFilter} />
            <TodoForm addTodo={addTodo} />
            {filteredTodos.map(todo => (
                <Todo key={todo.id} todo={todo} onToggle={toggleCompletion} onEdit={editTodo} onDelete={deleteTodo} />
            ))}
        </div>
    );
};
