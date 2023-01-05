import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCreateTodoMutation } from "../../generated/graphql";
import TextField from "@mui/material/TextField";
import { IconAdd } from "../Icon/Icon";
import { Alert, Button, InputAdornment, Stack } from "@mui/material";

const FormContainer = styled.form`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
`;

const AddButton = styled.button`
  padding: 0;
  background-color: Transparent;
  border: none;
  cursor: pointer;
`;

export default function TodoAdd() {
  const [, createTodo] = useCreateTodoMutation();
  const [description, setDescription] = useState("");
  const [handleSuccess, setSucess] = useState(false);
  const [handleError, setError] = useState(false);

  useEffect(() => {
    handleSuccess &&
      setTimeout(function () {
        setSucess(false);
      }, 3000);
  }, [handleSuccess]);

  useEffect(() => {
    handleError &&
      setTimeout(function () {
        setError(false);
      }, 3000);
  }, [handleError]);

  return (
    <FormContainer
      onSubmit={(e) => {
        if (description) {
          createTodo({ description: description }).then((result) => {
            if (result.error) setError(true);
            else setSucess(true);
          });
        }
        e.preventDefault();
      }}
    >
      <TextField
        id="outlined-basic"
        type="text"
        sx={{
          display: "flex",
          width: "80vh",
        }}
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
      />
      {handleError && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error" onClose={() => setError(false)}>
            Essa tarefa já foi cadastrada!
          </Alert>
        </Stack>
      )}
      {handleSuccess && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert onClose={() => setSucess(false)}>
            Tarefa criada com sucesso!
          </Alert>
        </Stack>
      )}
    </FormContainer>
  );
}
