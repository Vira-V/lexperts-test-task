import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DraggableBlockList.css";

const data = [
  {
    id: "1",
    title: "Item 1",
    subtitle: "Item 1. Details",
  },
  {
    id: "2",
    title: "Item 2",
    subtitle: "Item 2. Details",
  },
  {
    id: "3",
    title: "Item 3",
    subtitle: "Item 3. Details",
  },
  {
    id: "4",
    title: "Item 4",
    subtitle: "Item 4. Details",
  },
  {
    id: "5",
    title: "Item 5",
    subtitle: "Item 5. Details",
  },
];

function DraggableBlockList() {
  const [list, setList] = useState(data);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  }

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="card">
          {(provided) => (
            <ul
              className="card"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map(({ id, title, subtitle }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="characters">
                          <h2 className="title">{title}</h2>
                          <h3 className="subtitle">{subtitle}</h3>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DraggableBlockList;
