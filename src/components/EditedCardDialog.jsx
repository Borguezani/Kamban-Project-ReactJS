import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditedCardDialog({
  open,
  EditedDialogHandler,
  editedId,
  editCard,
  columnId,
}) {
  const [text, setText] = React.useState([]);
  const cardEdit = (text, editedId) => {
    const editObj = { id: editedId, content: text };
    editCard(editObj, columnId);
    EditedDialogHandler();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={EditedDialogHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Editar nota do campo?"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth onChange={(e) => setText(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={EditedDialogHandler}>Cancel</Button>
          <Button onClick={() => cardEdit(text, editedId)}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
