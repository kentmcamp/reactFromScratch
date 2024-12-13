import React from "react";
import TodoList from "./components/TodoList.js";
import styled, { createGlobalStyle } from "styled-components";

const BodyStyle = createGlobalStyle`
  body {
    background-color: #222222;
    color: whitesmoke;
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial, Helvetica, sans-serif;
`;

const App = () => (
  <>
    <BodyStyle />
      <AppContainer>
        <TodoList />
      </AppContainer>
  </>
);

export default App;
