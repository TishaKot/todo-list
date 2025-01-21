import React from 'react';
import { TodoList } from './components/Todolist';
import styled from 'styled-components';

const AppContainer = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color:rgb(241, 208, 213);
`;

const App = () => {
    return (
        <AppContainer>
            <h1>TODO List</h1>
            <TodoList />
        </AppContainer>
    );
};

export default App;
