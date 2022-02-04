import {TodoItem} from '../../api/Interfaces';
import {UPDATE_ALL_TODOS, UPDATE_TODO_STATE} from "../actions/Types";

type todoState = {todos: TodoItem[]};

export const initialState:todoState = {
    todos: [],
}

export default (state = initialState, action:any) => {
    switch (action.type) {
        case UPDATE_TODO_STATE: {
            const item = state.todos.find(item => item.id === action.id);
            if (item) {
                item.completed = action.state;
                return {...state};
            }
            return state;
        }
        case UPDATE_ALL_TODOS: {
            return {state, ...{todos: action.items}};
        }
    }
    return state;
}