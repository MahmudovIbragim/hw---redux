interface TodoItem {
  id: number;
}

interface TodoReduxState {
  todos: TodoItem[];
}

type TodoReduxAction =
  | { type: "add"; payload: TodoItem }
  | { type: "delete"; payload: { id: number } }
  | { type: "update"; payload: TodoItem }
  | { type: "complete"; payload: { id: number } };

const initialDataL: TodoItem[] = [];

const todoRedux = (
  state: TodoReduxState = { todos: initialDataL },
  action: TodoReduxAction
): TodoReduxState => {
  switch (action.type) {
    case "add":
      return { todos: [...state.todos, action.payload] };
    case "delete":
      return {
        todos: state.todos.filter((item) => item.id !== action.payload.id),
      };
    case "update":
      return {
        todos: state.todos.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "complete":
      return {
        todos: state.todos.map((item) =>
          item.id === action.payload.id ? { ...item, completed: true } : item
        ),
      };
    default:
      return state;
  }
};

export default todoRedux;
