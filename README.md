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

    **Example:**

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
        javascript
        Copy code
        export const fetchData = () => async (dispatch) => {
            const data = await fetch('https://api.example.com/data').then((res) => res.json());
            dispatch({ type: 'DATA_LOADED', payload: data });
        };

        ```

    - Reducer:

        ```jsx
        javascript
        Copy code
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

    **Example:**

    ```jsx
    javascript
    Copy code
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

## How does Redux Thunk work

## Adding Redux Thunk to React

## Creating a Thunk

## The Todos API

## Async Thunks

## Adding another Reducer

## Refactoring the Todos reducer

## Using Thunks to create server resources

## Using Thunks to delete server resources

# Selectors

## Why do you need Selectors

## Creating Selectors

## Combining Selectors with Reselect

## More about Selectors

## Adding Selectors to Components

# Styled-Components

## Why do you need Styled-Components

## Creating a Styled-Component

## Converting CSS modules to Styled-Components

## Passing props to Styled-Components

## Extending Styled-Components

# Testing

## Testing React ecosystems

## Testing Reducers

## Testing Redux Thunks

## Testing Selectors

## Testing Styled-Components
