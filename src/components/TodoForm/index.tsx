import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { AddButton } from '../Button';

const FormContainer = styled.div`
    display: flex;
    margin: 20px 0;
    border-radius: 5px;
`;

interface TodoFormProps {
    addTodo: (title: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');

    //функция для отправки формы
    const handleSubmit = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <FormContainer>
            <TextField label='New Task' value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <AddButton onClick={handleSubmit} />
        </FormContainer>
    );
};
