import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconDelete, IconEdit } from "../../assets/Icons/Icons";
import { useFeedback } from "../../context/feedback";
import { useDeleteTodoMutation } from "../../generated/graphql";

interface Props {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  onEdit: () => void;
}

export default function TodoItem({
  id,
  description,
  createdAt,
  updatedAt,
  onEdit,
}: Props) {
  const [, deleteTodo] = useDeleteTodoMutation();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isErrors, isSuccesses, setError, setSuccess } = useFeedback();

  const createdAtDate = new Date(createdAt).toLocaleDateString();
  const createdAtTime = new Date(createdAt).toLocaleTimeString();
  const updatedAtDate = new Date(updatedAt).toLocaleDateString();
  const updatedAtTime = new Date(updatedAt).toLocaleTimeString();

  return (
    <Grid
      item
      container
      sx={
        smDown
          ? {
              width: "350px",
              cursor: "text",
              userSelect: "none",
            }
          : {
              width: "550px",
              cursor: "text",
              userSelect: "none",
            }
      }
    >
      <ListItem
        secondaryAction={
          <>
            <IconEdit onClick={onEdit} />
            <IconDelete
              onClick={() =>
                deleteTodo({ id }).then((result) => {
                  if (result.error)
                    setError({
                      ...isErrors,
                      type: { add: false, edit: false, remove: true },
                      status: true,
                    });
                  else
                    setSuccess({
                      ...isSuccesses,
                      type: { add: false, edit: false, remove: true },
                      status: true,
                    });
                })
              }
            />
          </>
        }
      >
        <Grid item sx={{ width: "430px" }}>
          <ListItemText
            primary={description}
            secondary={
              createdAt === updatedAt
                ? `Criado ${createdAtDate} as ${createdAtTime}`
                : `Editado ${updatedAtDate} as ${updatedAtTime}`
            }
          />
        </Grid>
      </ListItem>
      <Divider />
    </Grid>
  );
}
