import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MoveCardDialog({
  open,
  moveDialogHandler,
  columns,
  moveItems,
  moveCardHandler,
}) {
  const [text, setText] = React.useState([]);
  const cardMove = (columnId, moveItems) => {
    moveCardHandler(columnId, moveItems);
    moveDialogHandler();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={moveDialogHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Deseja mover nota?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => cardMove(columns[0].id, moveItems)}>
            {columns[0].name}
          </Button>
          <Button onClick={() => cardMove(columns[1].id, moveItems)}>
            {columns[1].name}
          </Button>
          <Button onClick={() => cardMove(columns[2].id, moveItems)}>
            {columns[2].name}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
