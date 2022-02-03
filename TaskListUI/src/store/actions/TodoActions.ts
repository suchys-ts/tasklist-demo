import {FETCH_TODOS, UPDATE_TODO, POST_TODO, UPDATE_ALL_TODOS} from "./Types";
import {TodoItem} from "../../api/Interfaces";

export const fetchTodosAction = () => {
    return {type: FETCH_TODOS};
}

export const postTodoAction = (item: TodoItem) => {
    return {
        type: POST_TODO,
        payload: item
    };
}

export const markAsCompletedTodoAction = (id: number, state: boolean | undefined) => {
    return {
        type: UPDATE_TODO,
        payload: {id, state}
    };
}

export const putTodosAction = (items: TodoItem[]) => {
    return {
        type: UPDATE_ALL_TODOS,
        items
    };
}
