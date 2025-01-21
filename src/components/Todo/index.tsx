import React, { useState } from 'react';
import { Todo as TodoModel } from '../../models/todo.model';
import styled from 'styled-components';
import { Checkbox, TextField } from '@mui/material';
import { Button, EditDeleteButtons } from '../Button';

const TodoContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    border: 1px solid #808080;
    border-radius: 5px;
    justify-content: space-between;
`;

const TodoContent = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const TodoText = styled.span<{ completed: boolean }>`
    text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
    margin-left: 8px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

export interface TodoProps {
    todo: TodoModel; //объект типа TodoModel
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
    onToggle: (id: string) => void;
}

export const Todo: React.FC<TodoProps> = ({ todo, onDelete, onEdit, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false); //состояние режима редактирования
    const [currentTitle, setCurrentTitle] = useState(todo.title); //состояние содержит текущее название задачи

    //функция для обработки редактирования
    const handleEdit = () => {
        if (isEditing) {
            onEdit(todo.id, currentTitle);
        }
        setIsEditing(!isEditing);
    };

    return (
        <TodoContainer>
            <TodoContent>
                <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
                {isEditing ? (
                    <>
                        <TextField value={currentTitle} onChange={e => setCurrentTitle(e.target.value)} />
                        <ButtonsContainer>
                            <Button buttonType='action' onClick={handleEdit}>
                                Save
                            </Button>
                            <Button buttonType='action' onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </ButtonsContainer>
                    </>
                ) : (
                    <>
                        <TodoText completed={todo.completed}>{todo.title}</TodoText>
                        <ButtonsContainer>
                            <EditDeleteButtons onEdit={() => setIsEditing(true)} onDelete={() => onDelete(todo.id)} />
                        </ButtonsContainer>
                    </>
                )}
            </TodoContent>
        </TodoContainer>
    );
};
