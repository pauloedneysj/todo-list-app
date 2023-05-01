import { Stack, Alert, useTheme, useMediaQuery, Grid } from "@mui/material";
import { useFeedback } from "../../context/feedback";

export default function FeedbackMessage() {
  const { isErrors, isSuccesses, setError, setSuccess } = useFeedback();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const message = isErrors.type.add
    ? "Erro ao adicionar tarefa!"
    : isErrors.type.edit
    ? "Erro ao editar tarefa!"
    : isErrors.type.remove
    ? "Erro ao remover tarefa!"
    : isSuccesses.type.add
    ? "Tarefa adicionada com sucesso!"
    : isSuccesses.type.edit
    ? "Tarefa editada com sucesso!"
    : isSuccesses.type.remove
    ? "Tarefa removida com sucesso!"
    : undefined;

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {isErrors.status ? (
        <Stack
          sx={smDown ? { width: "350px" } : { width: "550px" }}
          spacing={2}
        >
          <Alert
            severity="error"
            onClose={() => setError({ ...isErrors, status: false })}
          >
            {message}
          </Alert>
        </Stack>
      ) : isSuccesses.status ? (
        <Stack
          sx={smDown ? { width: "350px" } : { width: "550px" }}
          spacing={2}
        >
          <Alert
            onClose={() => {
              setSuccess({ ...isSuccesses, status: false });
            }}
          >
            {message}
          </Alert>
        </Stack>
      ) : undefined}
    </Grid>
  );
}
