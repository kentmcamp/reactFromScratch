import React from "react";
import styled from "styled-components";
import variables from "./styleVariables.js";

const TodoItemContainer = styled.div`
  background-color: ${variables.backgroundColor};
  border: 0.15em solid ${variables.primaryColor};
  border-radius: ${variables.borderRadius};
  padding: ${variables.padding};
  margin-bottom: ${variables.marginBottom};
  color: ${variables.textColor};
  font-family: ${variables.fontFamily};
`;

const TodoItemContainerWithWarning = styled(TodoItemContainer).withConfig({
  shouldForwardProp: (prop) => !['createdAt'].includes(prop),
})`
  border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
    ? `2px solid green`
    : '2px solid red')};
`;

const TodoItemTitle = styled.h3`
  margin: 0;
  color: ${variables.primaryColor};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${variables.marginBottom};
`;

const Button = styled.button`
  background-color: ${variables.buttonBackgroundColor};
  border: 0.15em solid ${variables.primaryColor};
  border-radius: ${variables.borderRadius};
  color: ${variables.primaryColor};
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background-color ${variables.transitionDuration}, color ${variables.transitionDuration}, transform ${variables.transitionDuration};

  &:hover {
    background-color: ${variables.primaryColor};
    color: ${variables.backgroundColor};
    transform: scale(1.05);
  }
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
  const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;

  return (
    <Container {...(todo.isCompleted ? {} : { createdAt: todo.createdAt })}>
      <TodoItemTitle>{todo.text}</TodoItemTitle>
      <p>
        Created&nbsp;
        {(new Date(todo.createdAt)).toLocaleDateString()}
      </p>
      <ButtonsContainer>
        {todo.isCompleted ? null : (
          <Button onClick={() => onCompletedPressed(todo.id)} className="completed-button">
            Mark As Completed
          </Button>
        )}
        <Button onClick={() => onRemovePressed(todo.id)} className="remove-button">
          Remove
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default TodoListItem;
