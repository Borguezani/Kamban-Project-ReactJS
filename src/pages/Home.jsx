import { Button, Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import CardItem from "../components/CardItem";
import CardDialog from "../components/CardDialog";
import EditedCardDialog from "../components/EditedCardDialog";
import MoveCardDialog from "../components/MoveCardDialog";

export default function Home() {
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [columns, setColumns] = useState( 
    JSON.parse(localStorage.getItem('userColumns')) || [
    { name: 'To Do', id: '0', items: [] },
    { name: 'Doing', id: '1', items: [] },
    { name: 'Done', id: '2', items: [] },
  ]);
  const saveColumnsToLocalStorage = (columns) => {
    localStorage.setItem('userColumns', JSON.stringify(columns));
  };
  const dialogHandler = () => {
    setOpenDialog(!openDialog);
  };

  const EditedDialogHandler = () => {
    setOpenEditDialog(!openEditDialog);
  };
  const MoveDialogHandler = () => {
    setOpenMoveDialog(!openMoveDialog);
  };
  const [columnId, setColumnId] = useState();

  const addCard = (card, columnId) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (columnId === column.id) {
          return { ...column, items: [...column.items, card] };
        }
        return column;
      });
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
  };
  const editCardId = (card) => {
    setOpenEditDialog(true);
    setEditedId(card.id);
  };
  const pickColumnId = (columnid) => {
    setColumnId(columnid);
  };
  const editCard = (editObj, columnId) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column.id === columnId) {
          const updatedItems = column.items.map((item) =>
            item.id === editObj.id
              ? { ...item, content: editObj.content }
              : item
          );
          return { ...column, items: updatedItems };
        }
        return column;
      });
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
  };
  const removeCard = (columnId, card) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column.id === columnId) {
          const updatedItems = column.items.filter(
            (item) => item.id !== card.id
          );
          return { ...column, items: updatedItems };
        }
        return column;
      });
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
  };
  const moveCardUp = (columnId, cardId) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column.id === columnId) {
          const index = column.items.findIndex((item) => item.id === cardId);
          if (index > 0) {
            const updatedItems = [...column.items];
            const removedCard = updatedItems.splice(index, 1)[0];
            updatedItems.unshift(removedCard);
            return { ...column, items: updatedItems };
          }
        }
        return column;
      });
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
  };
  const [moveItems, setMoveItems] = useState([]);
  const moveCardColumns = (columnId, cardId) => {
    MoveDialogHandler();
    setMoveItems([columnId, cardId]);
  };
  const moveCardHandler = (columnId, moveItems) => {
    const sendColumn = columnId;
    const currentColumn = moveItems[0];
    const cardId = moveItems[1];

    if (columnId !== currentColumn) {
      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((column) => {
          if (column.id === currentColumn) {
            const updatedItems = column.items.filter(
              (item) => item.id !== cardId
            );
            return { ...column, items: updatedItems };
          }

          if (column.id === sendColumn) {
            const cardToMove = prevColumns
              .find((prevColumn) => prevColumn.id === currentColumn)
              .items.find((item) => item.id === cardId);

            if (cardToMove) {
              const updatedItems = [
                ...column.items,
                { id: cardId, content: cardToMove.content },
              ];
              return { ...column, items: updatedItems };
            }
          }

          return column;
        });
        saveColumnsToLocalStorage(updatedColumns);
        return updatedColumns;
      });
    } else {
      alert("O cartão já está na coluna de destino.");
    }
  };

  return (
    <>
      <MoveCardDialog
        moveItems={moveItems}
        cards={items}
        columns={columns}
        columnId={columnId}
        open={openMoveDialog}
        moveDialogHandler={MoveDialogHandler}
        moveCardHandler={moveCardHandler}
      />
      <EditedCardDialog
        columnId={columnId}
        open={openEditDialog}
        editedId={editedId}
        EditedDialogHandler={EditedDialogHandler}
        editCard={editCard}
      />
      <CardDialog
        addCard={addCard}
        open={openDialog}
        dialogHandler={dialogHandler}
        cards={items}
        columnId={columnId}
      />
      <Container maxWidth="" id="ColumnsContainer">
        {columns.map((column) => (
          <div key={column.id} className={"columns"}>
            <h1>{column.name}</h1>
            <div className="items">
              {column.items.map((item) => (
                <CardItem
                  moveCardColumns={moveCardColumns}
                  moveCardUp={moveCardUp}
                  removeCard={removeCard}
                  columnId={column.id}
                  pickColumnId={pickColumnId}
                  editCardId={editCardId}
                  key={item.id}
                  card={item}
                ></CardItem>
              ))}
            </div>
            <Button
              onClick={() => {
                setOpenDialog(true);
                setColumnId(column.id);
              }}
              variant="text"
              id="button"
            >
              + ADD NEW CARD
            </Button>
          </div>
        ))}
      </Container>
    </>
  );
}
