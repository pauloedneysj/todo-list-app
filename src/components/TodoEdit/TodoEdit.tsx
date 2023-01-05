import styled from "styled-components";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useUpdateTodoMutation } from "../../generated/graphql";
import { IconClose, IconDone } from "../Icon/Icon";
import ListItem from "@mui/material/ListItem";

const Form = styled.form``;

// const ButtonContainer = styled.button`
//   position: fixed;
//   background-color: Transparent;
//   border: none;
//   cursor: pointer;
//   margin-right: 100vh;
// `;

interface Props {
  id: string;
  description: string;
  handleClick?: () => void;
}

export default function TodoEdit({ id, description, handleClick }: Props) {
  const [, updateTodo] = useUpdateTodoMutation();
  const [updatedDescription, setUpdatedDescription] = useState(description);

  return (
    <Form
      onSubmit={(e) => {
        if (updatedDescription)
          updateTodo({
            id: id,
            description: updatedDescription,
            updatedAt: new Date().toISOString(),
          });
        handleClick;
      }}
    >
      <ListItem
        disableGutters
        secondaryAction={
          <>
            <IconDone disabled={updatedDescription === "" ? true : false} />
            <IconClose onClick={handleClick} />
          </>
        }
      >
        <TextField
          sx={{
            width: "60vh",
          }}
          id="standard-basic"
          variant="standard"
          label="Editar"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </ListItem>
    </Form>
  );
}
