import React from 'react';
import { Button as MuiButton } from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled(MuiButton)<{ buttonType: 'filter' | 'action' | 'add'; isSelected: boolean }>`
    && {
        margin: 5px;
        background-color: ${props =>
            props.isSelected
                ? '#00BFFF' 
                : props.buttonType === 'filter'
                  ? '#FFB6C1'
                  : props.buttonType === 'add'
                    ? '#32CD32' 
                    : '#DB7093'};
        color: ${props =>
            props.buttonType === 'filter' ? '#800080' : props.buttonType === 'add' ? '#FFFFFF' : '#000000'};

        &:hover {
            background-color: ${props =>
                props.isSelected
                    ? '#FFA07A' 
                    : props.buttonType === 'filter'
                      ? '#800080'
                      : props.buttonType === 'add'
                        ? '#FF1493' 
                        : '#FF4500'};
            color: ${props =>
                props.buttonType === 'filter' ? '#FFFFFF' : props.buttonType === 'add' ? '#FFFFFF' : '#000000'};
        }
    }
`;


// Кнопки Edit и Delete
export const EditDeleteButton = styled(MuiButton)`
    && {
        margin: 5px;
        background-color: #ffc0cb; 
        color: #0000ff; 

        &:hover {
            background-color: #b0c4de; 
            color: #8b0000; 
        }
    }
`;

interface ButtonProps {
    buttonType: 'filter' | 'action' | 'add';
    isSelected?: boolean; //указывает, выбрана ли кнопка
    onClick: () => void;
    children: React.ReactNode; //позволяет принимать любые дочерние элементы
}

export const Button: React.FC<ButtonProps> = ({ buttonType, isSelected = false, onClick, children }) => (
    <StyledButton buttonType={buttonType} isSelected={isSelected} onClick={onClick}>
        {children}  
    </StyledButton>
);

//Кнопки фильтрации
export const FilterButtons: React.FC<{
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
}> = ({ filter, setFilter }) => (
    <div>
        <Button buttonType='filter' isSelected={filter === 'all'} onClick={() => setFilter('all')}>
            Show All Tasks
        </Button>
        <Button buttonType='filter' isSelected={filter === 'active'} onClick={() => setFilter('active')}>
            Show Active Tasks
        </Button>
        <Button buttonType='filter' isSelected={filter === 'completed'} onClick={() => setFilter('completed')}>
            Show Completed Tasks
        </Button>
    </div>
);

//Кнопки редактирования и удаления
export const EditDeleteButtons: React.FC<{
    onEdit: () => void;
    onDelete: () => void;
}> = ({ onEdit, onDelete }) => (
    <div>
        <EditDeleteButton onClick={onEdit}>Edit</EditDeleteButton>
        <EditDeleteButton onClick={onDelete}>Delete</EditDeleteButton>
    </div>
);

//Кнопка добавления новой задачи
export const AddButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button buttonType='add' onClick={onClick}>
        Add
    </Button>
);
