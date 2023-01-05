import { useMemo, useState } from "react";
import styled from "styled-components";
import { useTodosQuery, useDeleteTodoMutation } from "../../generated/graphql";
import List from "@mui/material/List";
import TodoEdit from "../TodoEdit/TodoEdit";
import TodoItem from "../TodoItem/TodoItem";
import { Divider } from "@mui/material";
import Blobz from "../Blobz/Blobz";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1vh;
`;

export default function TodosList() {
  const [todosQuery] = useTodosQuery();
  const todos = useMemo(() => todosQuery.data?.todos ?? [], [todosQuery.data]);
  const [, deleteTodo] = useDeleteTodoMutation();

  const [handleEdit, setHandleEdit] = useState("");

  return (
    <Container>
      <List
        sx={{
          width: "70vh",
          marginRight: "26px",
          wordBreak: "break-word",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {todos.map((todo) =>
          handleEdit === todo.id ? (
            <>
              <TodoEdit
                key={todo.id}
                id={todo.id}
                description={todo.description}
                handleClick={() => setHandleEdit("")}
              />
              <Divider />
            </>
          ) : (
            <>
              <TodoItem
                key={todo.id}
                description={todo.description}
                createdAt={todo.createdAt}
                updatedAt={todo.updatedAt}
                onEdit={() => todo.id && setHandleEdit(todo.id)}
                onDelete={() => deleteTodo({ id: todo.id })}
              />
              <Divider />
            </>
          )
        )}
      </List>
      <Blobz />
    </Container>
  );
}
