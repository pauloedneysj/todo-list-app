import { useState } from "react";
import styled from "styled-components";
import { useCreateTodoMutation } from "../../generated/graphql";
import TextField from "@mui/material/TextField";
import { IconAdd } from "../../assets/Icons/Icons";
import { Grid, InputAdornment, useMediaQuery, useTheme } from "@mui/material";
import { useFeedback } from "../../context/feedback";

const AddButton = styled.button`
  padding: 0;
  background-color: Transparent;
  border: none;
  cursor: pointer;
`;

export default function TodoAdd() {
  const [, createTodo] = useCreateTodoMutation();
  const [description, setDescription] = useState("");

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isErrors, isSuccesses, setError, setSuccess } = useFeedback();

  return (
    <Grid
      item
      container
      sx={{ width: 500, justifyContent: "center", alignItems: "center" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (description) {
            createTodo({ description: description }).then((result) => {
              if (result.error) {
                setError({
                  ...isErrors,
                  type: { add: true, edit: false, remove: false },
                  status: true,
                });
              } else
                setSuccess({
                  ...isSuccesses,
                  type: { add: true, edit: false, remove: false },
                  status: true,
                });
            });
          }
        }}
      >
        <TextField
          id="outlined-basic"
          type="text"
          sx={smDown ? { width: 350 } : { width: 550 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AddButton>
                  <IconAdd disabled={description === "" ? true : false} />
                </AddButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          label="Nova tarefa"
          placeholder="Ex: Faculdade as 16h"
          onChange={(e) => setDescription(e.target.value)}
          autoFocus={true}
        />
      </form>
    </Grid>
  );
}
