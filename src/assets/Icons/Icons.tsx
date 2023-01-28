import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../../context/theme";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

export function IconEdit({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} aria-label="edit">
      <EditIcon />
    </IconButton>
  );
}

export function IconDelete({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}

export function IconDone({ onClick, disabled }: Props) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="done"
      type="submit"
      disabled={disabled}
    >
      <DoneIcon />
    </IconButton>
  );
}

export function IconClose({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} aria-label="close">
      <CloseIcon />
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

export function ThemeIcon() {
  const theme = localStorage.getItem("theme") ?? "light";
  const { toggleColorMode } = useTheme();
  return (
    <>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}
