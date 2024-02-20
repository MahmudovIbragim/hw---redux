import { useState } from "react";
import scss from "./TodoRender.module.scss";
import { useDispatch, useSelector } from "react-redux";

interface Todo {
  id: number;
  name: string;
  image: string;
  isComplated: boolean;
}

const TodoRender = () => {
  const todos: Todo[] = useSelector((store: Todo[]) => store);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [isAuth, setIsAuth] = useState<number | null>(null);
  const [isComplated, setIsComplated] = useState<boolean>(false);

  const deleteTodo = (id: number) => {
    dispatch({ type: "delete", payload: { id } });
  };

  const upDateUsers = (id: number) => {
    const updatedTodos: Todo[] = todos.map((item: Todo) => {
      if (item.id === id) {
        return {
          ...item,
          name: newName,
          image: newImage,
        };
      }
      return item;
    });

    dispatch({ type: "update", payload: updatedTodos });
    setIsAuth(null);
  };

  const complatedTodo = (id: number) => {
    const complating = todos.map((item) => {
      if (item.id === id) {
        setIsComplated(!isComplated);
        return {
          ...item,
          isComplated: !isComplated,
        };
      }
      return item;
    });

    dispatch({ type: "update", payload: complating });
  };

  return (
    <>
      {todos.map((item: Todo) => (
        <div className={scss.container} key={item.id}>
          {isAuth === item.id ? (
            <div className={scss.update_form}>
              <input
                type="text"
                placeholder="New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Image"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
              <button onClick={() => upDateUsers(item.id)}>Сохранить</button>
              <button onClick={() => setIsAuth(null)}>Отмена</button>
            </div>
          ) : (
            <div className={scss.card}>
              <h2 className={item.isComplated ? scss.line : scss.noline}>
                <input
                  type="checkbox"
                  onChange={() => {
                    complatedTodo(item.id);
                  }}
                />
                {item.name}
              </h2>
              <img src={item.image} />

              <div className={scss.card_btn}>
                <button onClick={() => deleteTodo(item.id)}>Удалить</button>
                <button onClick={() => setIsAuth(item.id)}>Изменить</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default TodoRender;
