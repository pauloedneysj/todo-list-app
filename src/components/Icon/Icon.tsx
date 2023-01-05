import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

export function IconEdit({ onClick }: Props) {
  return (
    <IconButton aria-label="edit">
      <EditIcon onClick={onClick} />
    </IconButton>
  );
}

export function IconDelete({ onClick }: Props) {
  return (
    <IconButton aria-label="delete">
      <DeleteIcon onClick={onClick} />
    </IconButton>
  );
}

export function IconDone({ onClick, disabled }: Props) {
  return (
    <IconButton aria-label="done" type="submit" disabled={disabled}>
      <DoneIcon onClick={onClick} />
    </IconButton>
  );
}

export function IconClose({ onClick }: Props) {
  return (
    <IconButton aria-label="close">
      <CloseIcon onClick={onClick} />
    </IconButton>
  );
}

export function IconAdd({ disabled }: Props) {
  return (
    <IconButton aria-label="addroundedicon" disabled={disabled}>
      <AddRoundedIcon />
    </IconButton>
  );
}
