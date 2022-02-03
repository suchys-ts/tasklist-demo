package org.example.db;

import org.example.api.Todo;

import java.util.HashMap;

/**
 * !! Fake DB class solely for testing purposes !!
 */
@Deprecated
public class TodoMemDB {

    static HashMap<Integer, Todo> todos = new HashMap<>();

    public static Todo[] getAll() {
        return todos.values().toArray(new Todo[0]);
    }

    public static boolean updateTodo(int id, boolean completed){
        if (todos.containsKey(id)) {
            Todo todo = todos.get(id);
            todos.put(id, new Todo(id, todo.getDescription(), todo.getDueDate(), completed));
            return true;
        }
        return false;
    }

    public static Todo getTodo(int id) {
        return todos.get(id);
    }

    public static void addTodo(int id, Todo todo) {
        todo.setId(id);
        todos.put(id, todo);
    }

    public static boolean deleteTodo(Long id) {
        return todos.remove(id) != null;
    }
}
