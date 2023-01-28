import { Stack, Alert, useTheme, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { useFeedback } from "../../context/feedback";

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

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
    <Container>
      {isErrors.status ? (
        <Stack sx={smDown ? { width: 320 } : { width: 550 }} spacing={2}>
          <Alert
            severity="error"
            onClose={() => setError({ ...isErrors, status: false })}
          >
            {message}
          </Alert>
        </Stack>
      ) : isSuccesses.status ? (
        <Stack sx={smDown ? { width: 350 } : { width: 550 }} spacing={2}>
          <Alert
            onClose={() => {
              setSuccess({ ...isSuccesses, status: false });
            }}
          >
            {message}
          </Alert>
        </Stack>
      ) : undefined}
    </Container>
  );
}
