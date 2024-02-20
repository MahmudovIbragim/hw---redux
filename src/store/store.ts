import { createStore } from "redux";
import todoRedux from "./reduxTodo";

const store = createStore(todoRedux);

export default store;
