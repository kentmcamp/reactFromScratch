import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";
import { isLoading } from "./reducers";
import { getTodos, getTodosLoading, getCompletedTodos, getIncompleteTodos } from "./selectors";
import "./TodoList.css";

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, [startLoadingTodos]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {incompleteTodos.map(todo => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed}
                />
            ))}
            <h3>Completed:</h3>
            {completedTodos.map(todo => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed}
                />
            ))}
        </div>
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
