import React, { useState } from "react";


function ListItem(props) {
  const [editedItem, setEditedItem] = useState(props.item.task);
  const [editMode, setEditMode] = useState(false);
  const editedItemChanged = (evt) => {
    setEditedItem(evt.target.value);
  };
  const saveEditedItem = () => {
    props.editHandler(editedItem, props.idx);
    setEditMode(false);
  };
  return (
    <div className="list">
      {editMode ? (
        <>
          <div class=" flex  justify-center bg-gray-50 ">
          <form class="mt-8 space-y-6 w-full">
            <div class="rounded-md shadow-sm -space-y-px flex items-center justify-between">
              <div class="flex-auto mr-2">
               
                <input
                 
                type="text"
                 required
                onChange={editedItemChanged}
                placeholder="Edit Task"
                value={editedItem}
                  class=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  
                ></input>
              </div>

              <div class="text-sm flex-none">
                <button
                 onClick={saveEditedItem}
                 disabled={editedItem.trim().length === 0}
                  type="button"
                  class=" ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button
                  onClick={saveEditedItem}
                  disabled={editedItem.trim().length === 0}
                  class=" ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        </>
      ) : (
        <>
          <div class=" flex  justify-center bg-gray-50 ">
          <div class=" w-full space-y-8 mb-2">
            <div>
              <ul class="text-xl ">
                <li>
                  <div class="rounded-md shadow-sm -space-y-px flex items-center justify-between">
                    <div class="flex-auto w=full">
                      <span class=" appearance-none relative block rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                      {props.item.task}
                      </span>
                    </div>

                    <div class="text-sm flex-none">
                      <button
                        onClick={() => setEditMode(true)}
                        type="button"
                        class=" ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => props.deleteHandler(props.idx)}
                        class=" ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default ListItem;
