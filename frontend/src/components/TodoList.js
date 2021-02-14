import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

export default function TodoList(props) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    // send data to backend
    fetch("http://localhost:9999/todo", {
      method: "POST",
      body: JSON.stringify({ task: newItem }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((resp) => {
        console.log("Got data from POST backend", resp);

        items.push(resp);
        setItems([...items]);
        setNewItem("");
      });
  };
  const newItemChanged = (evt) => {
    setNewItem(evt.target.value);
  };

  const deleteHandler = (itemIdx) => {
    const idToDelete = items[itemIdx]._id;
    fetch(`http://localhost:9999/todo/${idToDelete}`, {
      method: "DELETE",
      credentials: "include",
    }).then((r) => {
      console.log("Got successfully DELETE");
      items.splice(itemIdx, 1);
      setItems([...items]);
    });
  };

  const editHandler = (editedValue, itemIdx) => {
    const idToEdit = items[itemIdx]._id;
    fetch(`http://localhost:9999/todo/${idToEdit}`, {
      method: "PUT",
      body: JSON.stringify({ task: editedValue }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((resp) => {
        console.log("Got successfully response from PUT", resp);
        items[itemIdx] = resp;
        setItems([...items]);
      });
  };

  useEffect(() => {
    fetch("http://localhost:9999/todo", { credentials: "include" })
      .then((r) => r.json())
      .then((arr) => {
        const sortedArr = arr.sort((a, b) => {
          const aDateNumeric = new Date(a.creationTime).valueOf();
          const bDateNumeric = new Date(b.creationTime).valueOf();
          return aDateNumeric - bDateNumeric;
        }); // sorts in ascending order of id - timestamp
        // const taskArr = sortedArr.map((item) => item.task); // gets the task for each item to create a strig array
        setItems(sortedArr); // sets the array of { id, task }
      });
  }, []);

  return (
    <div>
      <div class="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <img
              class="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <div class="mt-6  flex-auto text-center text-3xl font-extrabold text-gray-900">
              Username: {props.username}
              <button
                class="group relative flex-none justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={props.logoutHandler}
              >
                Log Out
              </button>
            </div>

            <form class="mt-8 mb-8 space-y-6">
              <div class="rounded-md shadow-sm -space-y-px flex items-center justify-between">
                <div class="flex-auto mr-2">
                  <label for="myTodo" class="sr-only">
                    My Todo
                  </label>
                  <input
                    name="myTodo"
                    type="myTodo"
                    autocomplete="myTodo"
                    required
                    class=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Add a new task"
                    id="task"
                    onChange={newItemChanged}
                    value={newItem}
                  />
                </div>

                <button
                  id="btn"
                  onClick={addItem}
                  disabled={newItem.trim().length === 0}
                  type="button"
                  class="group relative flex-none justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </form>
            <div>
              {items.map((item, idx) => (
                <ListItem
                  item={item}
                  key={item._id}
                  idx={idx}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
