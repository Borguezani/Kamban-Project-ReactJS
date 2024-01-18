import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper } from "@mui/material";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function CardItem({
  card,
  editCardId,
  pickColumnId,
  columnId,
  removeCard,
  moveCardUp,
  moveCardColumns
}) {
  return (
    <>
      <Paper style={{ padding: "0.5em 0em", margin: "0.5em" }}>
        <ListItem
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="first" onClick={() => {
                  moveCardUp(columnId, card.id);
                }}>
                <ArrowDropUpIcon />
              </IconButton>
              <IconButton edge="end" aria-label="move" onClick={() => {
                  moveCardColumns(columnId, card.id);
                }}>
                <DriveFileMoveIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  removeCard(columnId, card);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <IconButton>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </IconButton>
            <ListItemText
              primary={card.content}
              onClick={() => {
                editCardId(card);
                pickColumnId(columnId);
              }}
            />
          </ListItemButton>
        </ListItem>
      </Paper>
    </>
  );
}
