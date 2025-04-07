import { useState } from "react";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editID, setEditID] = useState(0);

  const handleAdd = () => {
    // this won't work, because i'm adding the item directly to the prev list
    // which is returning the same list again (the reference of the list remains same)
    // hence, you gotta return a new list altogether
    // setTodolist((prev) => {
    //   console.log(prev);
    //   prev.push({
    //     id: Date.now(),
    //     task: newTodo,
    //   });
    //   return prev;
    // });

    if (newTodo.trim() === "") return; // empty string

    setTodolist((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        task: newTodo.trim(), // to remove any unncessary spaces
        completed: false
      },
    ]);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    // this won't work since React doesn't add the key attribute to the actual DOM element
    // hence we can't access it
    // to make this work we'll have to explicitly pass the id to this function
    // console.log(e.target.parentElement.key)
    // setTodolist(prev => prev.filter(i => i.key != e.target.parentElement.key))

    setTodolist((prev) => prev.filter((i) => i.id != id));
  };

  const handleEdit = (id, task) => {
    setNewTodo(task);
    setEditID(id);
  };

  const handleUpdate = () => {
    setTodolist((prev) =>
      prev.map((i) => i.id == editID? {...i, task: newTodo} : i)
    );

    setEditID(0);
    setNewTodo("");
  };

  const handleCheck = (id) => {
    setTodolist(prev => prev.map(i => i.id == id? {...i, completed: !i.completed} : i))
  }

  return (
    <>
      <h1>My To Do List</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add New Items"
        onKeyDown={(e) => (e.key == "Enter" ? handleAdd() : null)}
      />
      {editID > 0 ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
      {todolist.length > 0
        ? todolist.map((i) => (
            <div key={i.id}>
              <input type="checkbox" name={i.task} id={i.id} onChange={() => handleCheck(i.id)}/>
              <span className={i.completed? "line" : ""}>{i.task}</span>
              <button onClick={() => handleEdit(i.id, i.task)}>Edit</button>
              <button onClick={() => handleDelete(i.id)}>Delete</button>
            </div>
          ))
        : " "}
    </>
  );
}

export default App;
