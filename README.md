---

# React Ecosystem Tools

# Project Overview

## React Ecosystem Tools

- `Redux` manages the state of a react app in an effective and relatively bug free way. It uses **Flux Architecture**.
- `Thunk` separates the so called side effects of our application. Side effects are permanent changes such as modifying user data on a server.
- `Reselect` abstracts away the details of how data is stored in the managed state.
- `Styled Components` give an easier way to style components, specifically when the style depends on a state.

# Creating Your Basic Project

## Building a React project from Scratch

- To create a React app from scratch, you will need:
    - index.html
    - Support for ES6
    - `webpack`
    - Root component
    - `react-hot-loader`

## The React entry point

- In a new director, enter `npm init -y` to initialize a new NPM package and create `package.json`
- It’s also a good time to initialize a new git repo
- Create a `public` and `src` directory.
- Create `index.html` in the `public` directory, with basic boiler plate code and `<script src=”../dist/bundle/js”></script>`
- `index.html`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App from Scratch</title>
    </head>
    <body>
        <div id="root">

        </div>
        <noscript>
            Please enable JavaScript to view this site.
        </noscript>
        <script src="../dist/bundle.js"></script>
    </body>
    </html>

    ```


## Supporting ES6

- In a directory terminal, enter `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react`
- In root, create `.babelrc` and enter the following:
- `.babelrc`

    ```json
    {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
    ```

- Now is a good time to create the `.gitignore` folder and place the `node_modules` folder inside it.

## The `index.js` file and app component

- Add `index.js`, `App.js`, and `App.css` to the `src` folder.
- `App.js`

    ```jsx
    import React from 'react';
    import './App.css';

    const App = () => (
        <div className="App">
            <h1>Hello World!</h1>
        </div>
    );

    export default App;
    ```

- `App.css`

    ```jsx
    .App {
        margin: 1rem;
        font-family: Arial, Helvetica, sans-serif;
        color: #222222;
    }
    ```

- `index.js`

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.js';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
    ```

- Install React and React-Dom with `npm install react react-dom`

## Building and serving with Webpack

- Install `npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader`
- Create `webpack.config.js` in root.
- `webpack.config.js`

    ```jsx
    const path = require('path');
    const webpack = require('webpack');

    module.exports = {
        entry: './src/index.js',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/env"]
                    }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        resolve: { extensions: ['*', '.js', '.jsx'] },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            publicPath: '/dist/',
            filename: 'bundle.js'
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public/')
            },
            port: 3000,
            hot: true,
            devMiddleware: {
                publicPath: 'http://localhost:3000/dist/'
            }
        },
        plugins: [new webpack.HotModuleReplacementPlugin()]
    };
    ```

- Run and server with `npx webpack-dev-server --mode development`

## Make a shortcut to run server

- In `package.json` , in the `"scripts"` section, add the following: `"dev": "npx webpack-dev-server --mode development",`
- Now we can run the server with just `npm run dev`
- You can also set up your build code to with `"build": "npx webpack --mode development",` and run with `npm run build`

## Creating the `todoList` component

- Create a `components` folder.
- `TodoList.js`

    ```jsx
    import React from "react";
    import ToDoListItem from  './TodoListItem';

    const TodoList = ({ todos }) => {
        <div className="list-wrapper">
            {todos.map(todo => <TodoListItem todo={todo} />)}
        </div>
    };

    export default TodoList;
    ```


## Creating the `todoListItem` component

- `TodoListItem.js`

    ```jsx
    import React from "react";

    const TodoListItem = ({todo}) => (
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <div className="buttons-container">
                <button className="completed-button">Mark As Completed</button>
                <button className="remove-button">Remove</button>
            </div>
        </div>
    )

    export default TodoListItem;
    ```


## Creating the `newTodoForm` component

- `newTodoForm.j`

    ```jsx
    import React, { useState } from "react";
    import './NewTodoForm.css';

    const NewTodoForm = () => {
      const [inputValue, setInputValue] = useState("");

      return (
        <div className="new-todo-form">
          <input
            className="new-todo-input"
            type="text"
            placeholder="Enter New Todo Here!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="new-todo-button">Create Todo</button>
        </div>
      );
    };

    export default NewTodoForm;
    ```

- Also create and import relevant CSS files for all three components.

## Putting the app together

- `App.js`

    ```jsx
    import React from 'react';
    import TodoList from './components/TodoList';
    import './App.css';

    const App = () => (
        <div className="App">
            <TodoList/>
        </div>
    );

    export default App;
    ```

- Updates to `TodoList.js`

    ```jsx
    import React from "react";
    import NewTodoForm from "./NewTodoForm";
    import TodoListItem from "./TodoListItem";
    import './TodoList.css'

    const TodoList = ({ todos = [{text: "hello"}] }) => (
        <div className="list-wrapper">
            <NewTodoForm/>
            {todos.map(todo => <TodoListItem todo={todo} />)}
        </div>
    );

    export default TodoList;
    ```

    - The `todos` property it just to test how saved To-dos will be displayed since none are currently saved.

# Adding Redux

## Why do you need Redux

- `Props Drilling` happens when you pass props through multiple components that don't use them, just so a deeply nested component can access them. This leads to cluttered and tightly coupled components.
- `Local State Management` would have every component manage it’s own state, but then sharing state across distant components requires hoisting it to the nearest common ancestor. This quickly becomes unmanageable in larger applications.
- A `Global State` would be accessible to all components avoids props drilling but introduces new issues, such as updates affecting unrelated components, performance issues due to unnecessary re-renders, and debugging is much harder as state changes aren’t localized.
- So considering a `Global State Management` solution solves issues better then the first two state management options, using it with struct rules and organization to fix it’s own cons would be ideal. This is what `Redux` aims to do.

## How does Redux Work

- `Redux` provides a predictable and centralized state management system.
- Redux has a single, global state called the `store` that holds the entire application state. The `store` serves as a single source of truth for all components and their states.
- Redux enforces a strict, unidirectional flow of data using the two other pieces of redux:
    - `Actions` describes the different events that can occur in an application. They consist of two things:
        - `An Action Type` - Basically a string naming the action.
        - `Addition Data Payload` - Data required to perform the action, such as details about what to add, update, or remove in the state.
            - *Example:* Clicking an “Add to Cart” button might dispatch an action with a payload containing the product’s ID and quantity.
    - `Reducers` specify how the state changes in response to an action, in other words; what should happen in the `store` when a given action occurs.
        - *Example:* If an action to add an item to a cart is dispatched, the reducer adds the item from the payload to the shopping cart array in the state.
- With Redux, components can only interact with the state by triggering `Redux Actions`
- The state can only be modified as explicitly defined by `Redux Reducers`, ensuring predictable and controlled updates.
- The `store` and `actions` are JavaScript objects that can be serialized into JSON format, making them easy to debug and transfer.
- The Unidirectional Data Flow is like this:
    - `UI Triggers Action`
    - `The State is Updated`
    - `Components See and React to Updated State`

## Adding Redux to a React app

- `npm install redux react-redux`
- Create a new file inside of `src` called `store.js`
- `store.js`

    ```jsx
    import { createStore, combineReducers } from 'redux';

    const reducers = {};

    // The root reducer puts all of the reducers together into a form that we can pass to the createStore function.
    const rootReducer = combineReducers(reducers);

    export const configureStore = () => createStore(rootReducer);
    ```

- `index.js`

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { Provider } from 'react-redux';
    import { configureStore } from './store.js';
    import App from './App.js';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Provider store={configureStore()}>
            <App />
        </Provider>
    );
    ```


## Creating Redux actions

- Create `actions.js` in the `components` directory
- `actions.js`

    ```jsx
    // Action Type
    export const CREATE_TODO = 'CREATE_TODO';

    // Action Creator
    export const createTodo = text => ({
        type: CREATE_TODO,
        payload: { text },
    });

    export const REMOVE_TODO = 'REMOVE_TODO';
    export const removeTodo = text => ({
        type: REMOVE_TODO,
        payload: { text },
    })
    ```


## Creating Reducers

- Create `reducers.js` in the `components` director
- `reducers.js`

    ```jsx
    import { CREATE_TODO, REMOVE_TODO } from "./actions";

    export const todos = (state = [], action) => {
        const {type, payload} = action;

        switch (type) {
            case CREATE_TODO: {
                const { text } = payload;
                const newTodo = {
                    text,
                    isCompleted: false,
                };
                return state.concat(newTodo);
            }
            case REMOVE_TODO: {
                const { text } = payload;
                return state.filter(todo => todo.text !== text);
            }
            default:
                return state;
        }
    };
    ```

- Add the reducer.js to the store
- `store.js`

    ```jsx
    import { createStore, combineReducers } from 'redux';
    import { todos } from './components/reducers';

    const reducers = {
        todos,
    };

    // The root reducer puts all of the reducers together into a form that we can pass to the createStore function.
    const rootReducer = combineReducers(reducers);

    export const configureStore = () => createStore(rootReducer);
    ```


## Connecting Components to the store

- `NewTodoForm.js`

    ```jsx
    import React, { useState } from "react";
    import { connect } from "react-redux";
    import { createTodo } from "./actions";
    import './NewTodoForm.css';

    const NewTodoForm = ({ todos, onCreatePressed }) => {
      const [inputValue, setInputValue] = useState("");

      return (
        <div className="new-todo-form">
          <input
            className="new-todo-input"
            type="text"
            placeholder="Enter New Todo Here!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => {
              const isDuplicateText = todos.some(todo => todo.text === inputValue);
              if (!isDuplicateText) {
                onCreatePressed(inputValue);
                setInputValue('');
              }
            }}
            className="new-todo-button">Create Todo</button>
        </div>
      );
    };

    const mapStateToProps = state => ({
      todos: state.todos,
    });

    const mapDispatchToProps = dispatch => ({
      onCreatePressed: text => dispatch(createTodo(text)),
    });

    export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
    ```

- `TodoList.js`

    ```jsx
    import React from "react";
    import { connect } from "react-redux";
    import NewTodoForm from "./NewTodoForm";
    import TodoListItem from "./TodoListItem";
    import { removeTodo } from "./actions";
    import "./TodoList.css";

    const TodoList = ({ todos = [], onRemovePressed }) => (
      <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo, index) => (
          <TodoListItem key={index} todo={todo} onRemovePressed={onRemovePressed}/>
        ))}
      </div>
    );

    const mapStateToProps = state => ({
      todos: state.todos,
    });
    const mapDispatchToProps = dispatch => ({
      onRemovePressed: text => dispatch(removeTodo(text)),
    });

    export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
    ```

- `TodoListItem.js`

    ```jsx
    import React from "react";
    import './TodoListItem.css';

    const TodoListItem = ({todo, onRemovePressed}) => (
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <div className="buttons-container">
                <button className="completed-button">Mark As Completed</button>
                <button
                    onClick={() => onRemovePressed(todo.text)}
                    className="remove-button">Remove</button>
            </div>
        </div>
    )

    export default TodoListItem;
    ```


## Persisting the Redux store

- `npm install redux-persist`
- `store.js`

    ```jsx
    import { createStore, combineReducers } from 'redux';
    import { persistReducer } from 'redux-persist';
    import storage from 'redux-persist/lib/storage';
    import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
    import { todos } from './components/reducers';

    const reducers = {
        todos,
    };

    const persistConfig = {
        key: 'root',
        storage,
        stateReconciler: autoMergeLevel2,
    };

    // The root reducer puts all of the reducers together into a form that we can pass to the createStore function.
    const rootReducer = combineReducers(reducers);
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    export const configureStore = () => createStore(persistedReducer);
    ```

- `index.js`

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { persistStore } from 'redux-persist';
    import { PersistGate } from 'redux-persist/lib/integration/react';
    import { Provider } from 'react-redux';
    import { configureStore } from './store.js';
    import App from './App.js';

    const store = configureStore();
    const persistor = persistStore(store);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Provider store={store}>
            <PersistGate
                loading={<div>Loading...</div>}
                persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
    ```

- To clear `localStorage`, open dev tools. Click `Application` tab. Open the dev server under `Local Storage` and delete the persisted data.

## Redux DevTools

[Redux DevTools - Chrome Web Store](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

- `store.js`

    ```jsx
    export const configureStore = () => createStore(
        persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    ```

- Now you can use the Redux extensions for direct, easy access to the store and ability to dispatch to it.
    - You might need to restart your browser for it to be available with the other developer tools.

## Redux Best Practices

- **Exporting both connected and unconnected versions of components**
    - When connecting components to the Redux Store, export both the connected and unconnected versions of the component.
    - The **connected version** is what you use in the application to interact with the Redux state and dispatch actions.
    - The **unconnected version** is useful for testing the component in isolation, without the Redux Store, by allowing you to directly pass props.
    - **Example:**

        ```jsx
        javascript
        Copy code
        export const MyComponent = (props) => {
            // Component implementation
            return <div>{props.someProp}</div>;
        };

        export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

        ```

    - This approach ensures better testability while maintaining a clean connection to the Redux Store.
- **Avoid triggering actions or performing asynchronous operations in reducers**
    - Reducers are pure functions: their sole responsibility is to compute the next state based on the current state and the action.
    - Triggering side effects (like dispatching actions or making API calls) violates the principle of immutability and predictability in Redux.

    **Clarification:**

    - Asynchronous operations and side effects should be handled in **middleware** like `redux-thunk` or `redux-saga`.
    - Example of a middleware approach using `redux-thunk`:

        ```jsx
        export const fetchData = () => async (dispatch) => {
            const data = await fetch('https://api.example.com/data').then((res) => res.json());
            dispatch({ type: 'DATA_LOADED', payload: data });
        };

        ```

    - Reducer:

        ```jsx
        const myReducer = (state = initialState, action) => {
            switch (action.type) {
                case 'DATA_LOADED':
                    return { ...state, data: action.payload };
                default:
                    return state;
            }
        };

        ```

- **Consideration of which components to connect to the Redux Store**
    - Connecting too many components directly to the Redux Store can reduce their reusability, as their behavior becomes tied to specific pieces of the Redux state.
    - It's often better to connect higher-level "container" components and pass the necessary data and actions as props to child components.
    - **Example:**

        ```jsx
        const mapStateToProps = (state) => ({
            items: state.items,
        });

        const MyConnectedContainer = ({ items }) => {
            return (
                <div>
                    {items.map((item) => (
                        <MyChildComponent key={item.id} item={item} />
                    ))}
                </div>
            );
        };

        export default connect(mapStateToProps)(MyConnectedContainer);

        // MyChildComponent is decoupled from Redux and reusable elsewhere:
        const MyChildComponent = ({ item }) => <div>{item.name}</div>;
        ```

    - This separation ensures child components remain reusable across contexts.

## Adding a Redux Flow

- `action.js`

    ```jsx
    export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
    export const markTodoAsCompleted = text => ({
        type: MARK_TODO_AS_COMPLETED,
        payload: { text },
    })
    ```

- `reducers.js`

    ```jsx
    import { MARK_TODO_AS_COMPLETED } from "./actions";

    case MARK_TODO_AS_COMPLETED: {
      const { text } = payload;
      return state.map(todo => {
        if (todo.text === text) {
          return { ...todo, isCompleted: true };
        }
      return todo;
    })
    ```

- `TodoList.js`

    ```jsx
    import { removeTodo, markTodoAsCompleted } from "./actions";

    const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed }) => (
      <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo, index) => (
          <TodoListItem
            key={index}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
          />
        ))}
      </div>
    );

    const mapDispatchToProps = (dispatch) => ({
      onRemovePressed: (text) => dispatch(removeTodo(text)),
      onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
    });
    ```

- `TodoListItem.js`

    ```jsx
    const TodoListItem = ({todo, onRemovePressed, onCompletedPressed}) => (
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <div className="buttons-container">
                {todo.isCompleted
                    ? null
                    : <button
                        onClick={() => onCompletedPressed(todo.text)}
                        className="completed-button">Mark As Completed</button>}
    ```


# Dealing with Side Effects

## Why do you need Redux Thunk

- `Redux Thunk` is a Side-Effect Library. Others include Redux Saga and Redux Logic.
- `Side Effects` are logic for doing asynchronous operations, such as fetching and updating server data.
- Just like how `Redux` takes the concern for **State Management** from the component, `Thunk` does this for `Side Effects`.

## How does Redux Thunk work

- Components trigger actions that cause predictable changes to the data in our `Redux Store`, then these changes are reflected in our components.
- `Redux Thunk` allows us to put a fork in this loop that allows us to load `Side Effects`, such as loading data or some other asynchronous operation.
- Normally, a `Component` dispatch a `Redux Action`, which goes to the `Reducer` and makes the relevant changes to the `Store`.
    - Or, our `Component` dispatch a `Thunk` that performs whatever async or conditional operations we want, then dispatches it’s own `Redux Action` based on the result of those operations.
- So instead of dispatching a `Redux Action`, we pass a function to dispatch, and this function is where we put the async operation. You can even dispatch other `Thunks` from inside that function.

## Adding Redux Thunk to React

- `npm install redux-thunk redux-devtools-extension @babel/runtime`
- `npm install --save-dev @babel/plugin-transform-runtime`
- `.babelrc`

    ```jsx
    {
        "presets": ["@babel/preset-env", "@babel/preset-react"],
        "plugins": ["@babel/plugin-transform-runtime"]
    }
    ```

- `store.js`

    ```jsx
    import { createStore, combineReducers, applyMiddleware } from "redux";
    import { persistReducer } from "redux-persist";
    import storage from "redux-persist/lib/storage";
    import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
    import thunk from "redux-thunk";
    import { composeWithDevTools } from "redux-devtools-extension";
    import { todos } from "./components/reducers";

    const reducers = {
      todos,
    };

    const persistConfig = {
      key: "root",
      storage,
      stateReconciler: autoMergeLevel2,
    };

    // The root reducer puts all of the reducers together into a form that we can pass to the createStore function.
    const rootReducer = combineReducers(reducers);
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    export const configureStore = () => createStore(
        persistedReducer,
        composeWithDevTools(
          applyMiddleware(thunk)
        )
    );
    ```


## The Todos API

- The following will assume a server with these APIs


    | GET /todos | Gives us an array of all the todos |
    | --- | --- |
    | POST /todos | Creates a new todo with a unique id, createdAt, and isCompleted properties |
    | POST /todos/:id/completed | Marks a todo as completed |
    | DELETE /todos/:id | Deletes a todo |

## Async Thunks

- `actions.js`

    ```jsx
    // Thunks Action Types and Creators
    export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
    export const loadTodosInProgress = () => ({
      type: LOAD_TODOS_IN_PROGRESS,
    });

    export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
    export const loadTodosSuccess = (todos) => ({
      type: LOAD_TODOS_SUCCESS,
      payload: { todos },
    });
    ```

- `thunks.js`

    ```jsx
    import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from './actions';

    export const loadTodos = () => async (dispatch, getState) => {

        try {
            dispatch(loadTodosInProgress());
            const response = await fetch('http://localhost:8080/todos');
            const todos = await response.json();

            dispatch(loadTodosSuccess(todos));
        } catch (e) {
            dispatch(loadTodosFailure());
            dispatch(displayAlert(e));
        }

    }

    export const displayAlert = text => () => {
        alert(`error: ${text}`);
    };
    ```


## Adding another Reducer

- `reducers.js`

    ```jsx
    import {...,
        LOAD_TODOS_IN_PROGRESS,
        LOAD_TODOS_SUCCESS,
        LOAD_TODOS_FAILURE,
     } from "./actions";

     export const isLoading = (state = false, action) => {
        const { type } = action;

        switch (type) {
            case LOAD_TODOS_IN_PROGRESS:
                return true;
            case LOAD_TODOS_SUCCESS:
            case LOAD_TODOS_FAILURE:
                return false;
            default:
                return state;
        };
     };
    ```

- `store.js`

    ```jsx

    import { todos, isLoading } from "./components/reducers";

    const reducers = {
      todos,
      isLoading,
    };
    ```

- `TodoList.js`

    ```jsx
    import React, {useEffect} from "react";
    import { connect } from "react-redux";
    import NewTodoForm from "./NewTodoForm";
    import TodoListItem from "./TodoListItem";
    import { loadTodos } from "./thunks";
    import { removeTodo, markTodoAsCompleted } from "./actions";
    import { isLoading } from "./reducers";
    import "./TodoList.css";

    const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

      useEffect(() => {
        startLoadingTodos();
      }, []);

      const loadingMessage = <div>Loading todos...</div>;
      const content = (
        <div className="list-wrapper">
          <NewTodoForm />
          {todos.map((todo, index) => (
            <TodoListItem
              key={index}
              todo={todo}
              onRemovePressed={onRemovePressed}
              onCompletedPressed={onCompletedPressed}
            />
          ))}
        </div>
      );
      return isLoading ? loadingMessage : content;
    };

    const mapStateToProps = (state) => ({
      isLoading: state.isLoading,
      todos: state.todos,
    });
    const mapDispatchToProps = (dispatch) => ({
      startLoadingTodos: () => dispatch(loadTodos()),
      onRemovePressed: (text) => dispatch(removeTodo(text)),
      onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
    });

    export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
    ```


## Refactoring the Todos reducer

- `reducers.js`

    ```jsx
    case LOAD_TODOS_SUCCESS: {
        const { todos } = payload;
        return todos;
    }
      case LOAD_TODOS_IN_PROGRESS:
      case LOAD_TODOS_FAILURE:
      default:
        return state;
    }
    ```


## Using Thunks to create server resources

- `thunks.js`

    ```jsx
    import { createTodo, ... } from './actions';

    export const addTodoRequest = text => async dispatch => {
        try {
            const body = JSON.stringify({ text });
            const response = await fetch('http://localhost:8080/todos', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body,
            });
            const todo = await response.json();
            dispatch(createTodo(todo));
        } catch (e) {
            dispatch(displayAlert(e));
        }
    }
    ```

- `actions.js`

    ```jsx
    // Change 'text' to 'todo' in createTodo()
    export const createTodo = (todo) => ({
      type: CREATE_TODO,
      payload: { todo },
    });
    ```

- `reducers.js`

    ```jsx
    // Also update the CREATE_TODO case:
    case CREATE_TODO: {
      const { todo } = payload;
      return state.concat(todo);
    }
    ```

- `NewTodoForm.js`

    ```jsx
    import { addTodoRequest } from "./thunks";

    const mapDispatchToProps = dispatch => ({
      onCreatePressed: text => dispatch(addTodoRequest(text)),
    });
    ```


## Using Thunks to delete server resources

- `thunks.js`

    ```jsx
    import { removeTodo, ...} from './actions';

    export const removeTodoRequest = id => async dispatch => {
        try {
            const response = await fetch(`http://localhost:8080/todos/${id}`, {
                method: 'delete',
            });
            if (response.ok) {
                dispatch(removeTodo({ id }));
            } else {
                const errorText = await response.text();
                dispatch(displayAlert(errorText));
            }
        } catch (e) {
            dispatch(displayAlert(e));
        }
    }
    ```

- `actions.js`

    ```jsx
    export const REMOVE_TODO = "REMOVE_TODO";
    export const removeTodo = (todo) => ({
      type: REMOVE_TODO,
      payload: { todo },
    });
    ```

- `reducers.js`

    ```jsx
        case REMOVE_TODO: {
          const { todo: todoToRemove } = payload;
          return state.filter(todo => todo.id !== todoToRemove.id);
        }
    ```

- `TodoList.js`

    ```jsx
    import { loadTodos, removeTodoRequest } from "./thunks";

    const mapDispatchToProps = (dispatch) => ({
      startLoadingTodos: () => dispatch(loadTodos()),
      onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
      onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
    });
    ```

- `TodoListItem.js`

    ```jsx
    <button
      onClick={() => onRemovePressed(todo.id)}
      className="remove-button">
      Remove
    </button>
    ```


## Using Thunks to update server resources

- `thunks.js`

    ```jsx
    import { createTodo, loadTodosInProgress, loadTodosSuccess, loadTodosFailure, removeTodo, markTodoAsCompleted } from './actions';

    export const markTodoAsCompletedRequest = id => async dispatch => {
        try {
            const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
                method: 'post',
            });
            const updatedTodo = await response.json();
            dispatch(markTodoAsCompleted(updatedTodo));
        } catch (e) {
            dispatch(displayAlert(e));
        }
    }

    ```

- `actions.js`

    ```jsx
    export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";
    export const markTodoAsCompleted = (todo) => ({
      type: MARK_TODO_AS_COMPLETED,
      payload: { todo },
    });
    ```

- `reducers.js`

    ```jsx
    case MARK_TODO_AS_COMPLETED: {
      const { todo: updatedTodo } = payload;
      return state.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo; ;
        }
        return todo;
    });
    ```

- `TodoList.js`

    ```jsx
    import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";

    const mapDispatchToProps = dispatch => ({
        startLoadingTodos: () => dispatch(loadTodos()),
        onRemovePressed: id => dispatch(removeTodoRequest(id)),
        onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    });
    ```

- `TodoListItem.js`

    ```jsx
     <button
        onClick={() => onCompletedPressed(todo.id)}
        className="completed-button">
        Mark As Completed
      </button>
    ```


# Selectors

## Why do you need Selectors

- `Selectors` give us a place to put logic for combining, filtering, and transforming stored data into data our components can use.

## Creating Selectors

- Create `selectors.js` in components directory.
- `selectors.js`

    ```jsx
    export const getTodos = state => state.todos.data;
    export const getTodosLoading = state => state.todos.isLoading;
    ```

- `TodoList.js`

    ```jsx
    import { getTodos, getTodosLoading } from "./selectors";

    const mapStateToProps = state => ({
        isLoading: getTodosLoading(state),
        todos: getTodos(state),
    });
    ```

- `NewTodoForm.js`

    ```jsx
    import { getTodos } from "./selectors";

    const mapStateToProps = state => ({
      todos: getTodos(state),
    });
    ```

- `reducers.js`

    ```jsx
    import {
      CREATE_TODO,
      REMOVE_TODO,
      MARK_TODO_AS_COMPLETED,
      LOAD_TODOS_IN_PROGRESS,
      LOAD_TODOS_SUCCESS,
      LOAD_TODOS_FAILURE,
    } from "./actions";

    const initialState = { isLoading: false, data: [] };

    export const todos = (state = [initialState], action) => {
      const { type, payload } = action;

      switch (type) {
        case CREATE_TODO: {
          const { todo } = payload;
          return {
            ...state,
            data: state.data.concat(todo),
          };
        }
        case REMOVE_TODO: {
          const { todo: todoToRemove } = payload;
          return {
            ...state,
            data: state.data.filter((todo) => todo.id !== todoToRemove.id),
          };
        }
        case MARK_TODO_AS_COMPLETED: {
          const { todo: updatedTodo } = payload;
          return {
            ...state,
            data: state.data.map((todo) => {
              if (todo.id === updatedTodo.id) {
                return updatedTodo;
              }
              return todo;
            }),
          };
        }
        case LOAD_TODOS_SUCCESS: {
          const { todos } = payload;
          return {
            ...state,
            isLoading: false,
            data: todos,
          };
        }
        case LOAD_TODOS_IN_PROGRESS:
          return {
            ...state,
            isLoading: true,
          };
        case LOAD_TODOS_FAILURE:
          return {
            ...state,
            isLoading: false,
          };
        default:
          return state;
      }
    };

    ```

- `store.js`

    ```jsx
    // Remove isLoading import and use in reducer's object.
    import { todos } from "./components/reducers";

    const reducers = {
      todos,
    };
    ```


## Combining Selectors with Reselect

- `Selectors` help `components` be separated from the exact structure of data in our `Redux store`. Now we will use them to give us a place to put the logic necessary for transforming bare Redux data into more specific data for our `components`
- When you need `Selectors` to make use of other `Selectors` we can use a tool called `Reselect`
    - `npm install reselect`
- `selectors.js`

    ```jsx
    import { createSelector } from "reselect";

    export const getIncompleteTodos = createSelector(
        getTodos,
        (todos) => todos.filter(todo =>!todo.isCompleted),
    );
    ```


## More about Selectors

- `selector.js`

    ```jsx
    export const getCompletedTodos = createSelector(
        getTodos,
        (todos) => todos.filter(todo => todo.isCompleted),
    );
    ```

- The difference between the above using the `createSelector()` method and this…

    ```jsx
    export const getCompletedTodos = state => {
    	const { data: todos } = state.todos;
    	return todos.filter(todo => todo.isCompleted);
    }
    ```

    - …is that using a normal function will re-compute every time our app re-renders, even if the input and output are exactly the same.
    - When we use `createSelector()`, the return value of this function only changes when the return value of the selectors that we pass as arguments change.

## Adding Selectors to Components

- `TodoList.js`

    ```jsx
    import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";

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

    ```


# Styled-Components

## Why do you need Styled-Components

## Creating a Styled-Component

-

    ```jsx

    ```

-

    ```jsx

    ```

-

    ```jsx

    ```


## Converting CSS modules to Styled-Components

-

    ```jsx

    ```

-

    ```jsx

    ```

-

    ```jsx

    ```


## Passing props to Styled-Components

-

    ```jsx

    ```

-

    ```jsx

    ```

-

    ```jsx

    ```


## Extending Styled-Components

-

    ```jsx

    ```

-

    ```jsx

    ```

-

    ```jsx

    ```


# Testing

## Testing React ecosystems

## Testing Reducers

## Testing Redux Thunks

## Testing Selectors

## Testing Styled-Components
