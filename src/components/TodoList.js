import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NewTodoForm from "./NewTodoForm.js";
import TodoListItem from "./TodoListItem.js";
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks.js";
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from "./selectors.js";
import variables from "./styleVariables.js";

const ListWrapper = styled.div`
    background-color: ${variables.secondaryBackgroundColor};
    border: 0.15em solid ${variables.primaryColor};
    border-radius: ${variables.borderRadius};
    padding: ${variables.padding};
    max-width: 38em;
    margin: 0 auto;
    color: ${variables.textColor};
    font-family: ${variables.fontFamily};
    box-shadow: ${variables.boxShadow};
`;

const Section = styled.div`
    margin-bottom: ${variables.padding};
`;

const Title = styled.h3`
    background-color: ${variables.primaryColor};
    color: ${variables.secondaryBackgroundColor};
    padding: ${variables.padding};
    border-radius: ${variables.borderRadius};
`;

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, [startLoadingTodos]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ListWrapper>
            <NewTodoForm />
            <Section>
                <Title>Incomplete:</Title>
                {incompleteTodos.map(todo => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onRemovePressed={onRemovePressed}
                        onCompletedPressed={onCompletedPressed}
                    />
                ))}
            </Section>
            <Section>
                <Title>Completed:</Title>
                {completedTodos.map(todo => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onRemovePressed={onRemovePressed}
                        onCompletedPressed={onCompletedPressed}
                    />
                ))}
            </Section>
        </ListWrapper>
    );
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
