---

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

## Hot-reloading with react-hot-reloader

## Meet the sample app

## Creating the `todoList` component

## Creating the `todoListItem` component

## Creating the `newTodoForm` component

## Putting the app together

# Adding Redux

# Dealing with Side Effects

# Selectors

# Styled-Components

# Testing
