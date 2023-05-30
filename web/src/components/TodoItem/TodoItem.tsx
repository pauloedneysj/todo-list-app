import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconDelete, IconEdit } from "../../assets/Icons/Icons";
import { useFeedback } from "../../context/feedback";
import { useDeleteTodoMutation } from "../../generated/graphql";
import { format, parseISO } from "date-fns";

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

  const createdAtDate = format(parseISO(createdAt), "dd/MM/yyyy");
  const createdAtTime = format(parseISO(createdAt), "HH:mm:ss");
  const updatedAtDate = format(parseISO(updatedAt), "dd/MM/yyyy");
  const updatedAtTime = format(parseISO(updatedAt), "HH:mm:ss");

  return (
    <Grid
      item
      container
      sx={
        smDown
          ? {
              width: "350px",
              cursor: "text",
            }
          : {
              width: "550px",
              cursor: "text",
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
        <Grid
          item
          sx={{
            width: "87%",
            fontSize: "5px",
          }}
        >
          <ListItemText
            sx={{
              wordWrap: "break-word",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              lineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={description}
            primary={description}
          />
          <ListItemText
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
