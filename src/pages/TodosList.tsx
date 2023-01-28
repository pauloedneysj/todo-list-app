import { useEffect, useMemo, useState } from "react";
import { useTodosQuery } from "../generated/graphql";
import { usePagination } from "../hooks/pagination";
import { Grid, Pagination, List, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import TodoAdd from "../components/TodoAdd/TodoAdd";
import FeedbackMessage from "../components/FeedbackMessage/FeedbackMessage";
import TodoEdit from "../components/TodoEdit/TodoEdit";
import TodoItem from "../components/TodoItem/TodoItem";

export default function TodosList() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [handleEdit, setHandleEdit] = useState("");
  const [totalPages, setTotalPages] = useState<number>();
  const [pageBefore, setPageBefore] = useState<number>(0);

  const { limit, offset, page } = usePagination(pageBefore);

  const [todosQuery] = useTodosQuery({
    variables: {
      offset: offset,
      limit: limit,
    },
  });

  const todos = useMemo(() => {
    return todosQuery.data?.todos?.value ?? [];
  }, [todosQuery.data?.todos]);

  useEffect(() => {
    if (!todosQuery.data?.todos?.totalPages) return undefined;
    return setTotalPages(todosQuery.data?.todos?.totalPages);
  }, [todosQuery.data?.todos?.totalPages]);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageBefore(value - 1);
  };

  return (
    <Grid
      container
      position="fixed"
      width="100%"
      height="100vh"
      bgcolor={theme.palette.mode === "dark" ? "black" : "whitesmoke"}
    >
      <Navbar />
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingBottom={smDown ? "140px" : "140px"}
        height="100%"
        width="100%"
      >
        <TodoAdd />
        <FeedbackMessage />
        <List>
          <Grid
            item
            container
            display="inline-block"
            paddingTop={smDown ? "50px" : undefined}
            justifyContent="center"
            alignItems="center"
          >
            {todos.map((todo) =>
              handleEdit === todo.id ? (
                <TodoEdit
                  id={todo.id}
                  description={todo.description}
                  handleClick={setHandleEdit}
                />
              ) : (
                <TodoItem
                  id={todo.id}
                  description={todo.description}
                  createdAt={todo.createdAt}
                  updatedAt={todo.updatedAt}
                  onEdit={() => todo.id && setHandleEdit(todo.id)}
                />
              )
            )}
          </Grid>
        </List>
        <Pagination
          sx={
            smDown
              ? {
                  position: "fixed",
                  bottom: 50,
                }
              : { position: "fixed", bottom: 50 }
          }
          count={totalPages}
          defaultPage={page}
          onChange={handlePage}
        />
      </Grid>
    </Grid>
  );
}
