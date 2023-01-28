import styled from "styled-components";
import {
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useUpdateTodoMutation } from "../../generated/graphql";
import { IconClose, IconDone } from "../../assets/Icons/Icons";
import ListItem from "@mui/material/ListItem";
import { useFeedback } from "../../context/feedback";

const Form = styled.form``;

interface Props {
  id: string;
  description: string;
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function TodoEdit({ id, description, handleClick }: Props) {
  const [, updateTodo] = useUpdateTodoMutation();
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const { isErrors, isSuccesses, setError, setSuccess } = useFeedback();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid width={smDown ? 320 : 515}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (updatedDescription)
            updateTodo({
              id: id,
              description: updatedDescription,
              updatedAt: new Date().toISOString(),
            }).then((result) => {
              if (result.error) {
                setError({
                  ...isErrors,
                  type: { add: false, edit: true, remove: false },
                  status: true,
                });
                handleClick("");
              } else {
                setSuccess({
                  ...isSuccesses,
                  type: { add: false, edit: true, remove: false },
                  status: true,
                });
                handleClick("");
              }
            });
        }}
      >
        <ListItem
          disableGutters
          secondaryAction={
            <>
              <IconDone disabled={updatedDescription === "" ? true : false} />
              <IconClose onClick={() => handleClick("")} />
            </>
          }
        >
          <TextField
            sx={{
              width: 435,
            }}
            id="standard-basic"
            variant="standard"
            label="Editar"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            autoFocus={true}
          />
        </ListItem>
      </Form>
    </Grid>
  );
}
