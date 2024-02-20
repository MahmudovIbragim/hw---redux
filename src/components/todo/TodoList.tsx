import scss from "./Todo.module.scss";
import { useState } from "react";

import { useDispatch } from "react-redux";
import TodoRender from "../todeRender/TodoRender";

const TodoList = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [open] = useState<boolean>(false);

  const handleAdd = () => {
    const userData = {
      id: userId,
      name: name,
      image: image,
      isComplated: open,
    };
    dispatch({ type: "add", payload: userData });
    setUserId(userId + 1);
  };

  return (
    <>
      <div className={scss.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>
      <div className={scss.component}>
        <TodoRender />
      </div>
    </>
  );
};

export default TodoList;
