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

export default function CardDialog({ open, dialogHandler, addCard, columnId }) {
  const [id, setId] = React.useState(0);
  const [text, setText] = React.useState([]);
  const cardCreate = (text, columnId) => {
    const cardObj = { id: id, content: text };
    setId(id + 1);
    addCard(cardObj, columnId);
    dialogHandler();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={dialogHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Adicionar nota ao campo?"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth onChange={(e) => setText(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogHandler}>Cancel</Button>
          <Button onClick={() => cardCreate(text, columnId)}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
