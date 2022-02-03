import {RootState} from "../reducers/rootReducer";
import {TodoItem} from "../../api/Interfaces";

export const allTodosSelector = (state:RootState):TodoItem[] => state.todos.todos;