import { Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useUpdateTodoMutation } from "../../generated/graphql";
import { IconClose, IconDone } from "../../assets/Icons/Icons";
import ListItem from "@mui/material/ListItem";
import { useFeedback } from "../../context/feedback";

interface Props {
  id: string;
  description: string;
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}

export default function TodoEdit({ id, description, handleClick }: Props) {
  const { isErrors, isSuccesses, setError, setSuccess } = useFeedback();

  const [, updateTodo] = useUpdateTodoMutation();
  const [updatedDescription, setUpdatedDescription] = useState(description);

  return (
    <Grid width="88%" paddingLeft="3%">
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
              {updatedDescription === description ? (
                <IconClose onClick={() => handleClick("")} />
              ) : (
                <IconDone disabled={updatedDescription === "" ? true : false} />
              )}
            </>
          }
        >
          <TextField
            sx={{ width: "100%" }}
            id="standard-basic"
            variant="standard"
            label="Editar"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            autoFocus={true}
          />
        </ListItem>
      </form>
    </Grid>
  );
}
