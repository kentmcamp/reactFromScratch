---
# React Ecosystem from Scratch Project
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

## The `index.js` file and app component

## Building and serving with Webpack

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
