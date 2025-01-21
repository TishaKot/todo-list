import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
    margin-bottom: 20px;
    color: #800080;
    border: 2px solid #8a2be2;
    border-radius: 50px;
    padding: 10px;
    width: 150px;
`;

interface TodoCounterProps {
    count: number;
}

export const TodoCounter: React.FC<TodoCounterProps> = ({ count }) => {
    return <CounterContainer>Total Tasks: {count}</CounterContainer>;
};
