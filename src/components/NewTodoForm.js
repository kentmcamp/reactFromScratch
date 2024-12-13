import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodoRequest } from "./thunks.js";
import { getTodos } from "./selectors.js";
import styled from "styled-components";
import variables from "./styleVariables.js";

const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${variables.padding};
`;

const Input = styled.input`
    flex: 1;
    padding: ${variables.padding};
    border: 2px solid ${variables.primaryColor};
    border-radius: ${variables.borderRadius};
    background-color: ${variables.backgroundColor};
    color: ${variables.textColor};
    font-family: ${variables.fontFamily};
    margin-right: ${variables.padding};
    transition: border-color ${variables.transitionDuration}, box-shadow ${variables.transitionDuration};

    &:focus {
        border-color: ${variables.primaryColor};
        box-shadow: ${variables.glowShadow};
    }
`;

const NewButton = styled.button`
    background-color: ${variables.buttonBackgroundColor};
    border: 2px solid ${variables.primaryColor};
    border-radius: ${variables.borderRadius};
    color: ${variables.primaryColor};
    padding: ${variables.padding};
    cursor: pointer;
    transition: background-color ${variables.transitionDuration}, color ${variables.transitionDuration}, transform ${variables.transitionDuration};

    &:hover {
        background-color: ${variables.primaryColor};
        color: ${variables.backgroundColor};
        transform: scale(1.1);
    }
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <FormContainer>
      <Input
        type="text"
        placeholder="Enter New Todo Here!"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <NewButton
        onClick={() => {
          const isDuplicateText = todos.some(todo => todo.text === inputValue);
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue('');
          }
        }}
      >
        Create Todo
      </NewButton>
    </FormContainer>
  );
};

const mapStateToProps = state => ({
  todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
