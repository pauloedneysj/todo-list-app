import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import { IconDelete, IconEdit } from "../Icon/Icon";

interface Props {
  description: string;
  createdAt: string;
  updatedAt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ButtonsContainer = styled.div`
  position: relative;
  left: 35px;
`;

export default function TodoItem({
  description,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
}: Props) {
  const createdAtDate = new Date(createdAt).toLocaleDateString();
  const createdAtTime = new Date(createdAt).toLocaleTimeString();
  const updatedAtDate = new Date(updatedAt).toLocaleDateString();
  const updatedAtTime = new Date(updatedAt).toLocaleTimeString();

  return (
    <ListItem
      disableGutters
      secondaryAction={
        <ButtonsContainer>
          <IconEdit onClick={onEdit} />
          <IconDelete onClick={onDelete} />
        </ButtonsContainer>
      }
    >
      <ListItemText
        primary={description}
        secondary={
          createdAt === updatedAt
            ? `Criado ${createdAtDate} as ${createdAtTime}`
            : `Editado ${updatedAtDate} as ${updatedAtTime}`
        }
      />
    </ListItem>
  );
}
