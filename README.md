# What is that?

This is a web application for creating to-do lists created with React, with the aim of being simple and fast, without giving up the necessary resources and connected to an API so that your tasks are not lost when leaving the page.

![example_light](/web/public/img/example.png)

## Installation

To locally install the application, we first need to have Node.js installed. If you don't have it, follow the link for installation:

```bash
  https://nodejs.org/
```

We can use the following package managers: npm, yarn, or pnpm. In the following tutorial, we will use npm as an example.

## Running the backend locally

Clone the project

```bash
  git clone https://github.com/pauloedneysj/todo-list-app.git
```

Navigate to the project directory

```bash
  cd todo-list-app/server
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running the frontend locally

Navigate to the project directory

```bash
  cd todo-list-app/web
```

Install the dependencies

```bash
  npm install
```

Start the app

```bash
  npm run dev
```

## Stack used

**Front-end:** Vite, React, TypeScript, GraphQL, urql, GraphQL Code Generator and date-fns.

**Back-end:** Node, TypeScript, GraphQL, Apollo-Server and Prisma.
