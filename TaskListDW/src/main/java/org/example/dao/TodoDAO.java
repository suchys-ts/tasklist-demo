package org.example.dao;

import org.example.api.Todo;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

public interface TodoDAO {
    /**
     * Creates DB table(s) if does not exist
     */
    @SqlUpdate("CREATE TABLE IF NOT EXISTS TODOS (id INT NOT NULL AUTO_INCREMENT, description VARCHAR(255) NOT NULL, dueDate BIGINT, completed BOOL, primary key(id))")
    void createTodoTable();

    /**
     * Insert a new item to DB - note id is is an autoincrement
     * @param todo to be inserted
     * @return number of inserted items (should be 1)
     */
    @SqlUpdate("INSERT INTO TODOS (DESCRIPTION,DUEDATE,COMPLETED) VALUES(:description, :dueDate, :completed)")
    @GetGeneratedKeys
    int addTodo(@BindBean Todo todo);

    /**
     * Returns list of all todos sorted by id? time?
     * @return list of all @see Todo items in DB
     */
    @SqlQuery("SELECT * FROM TODOS")
    @RegisterBeanMapper(Todo.class)
    List<Todo> getAll();

    /**
     * Returns an individual todo item or null if the item does not exist
     * @param id of todo item to be retrieved
     * @return todo object
     */
    @SqlQuery("SELECT * FROM TODOS WHERE id = :id")
    @RegisterBeanMapper(Todo.class)
    Todo getTodo(@Bind("id") int id);

    /**
     * Delete todo item from DB
     * @param id of todo item to be deleted
     * @return 1 if deletion was successful, 0 otherwise
     */
    @SqlUpdate("DELETE FROM TODOS WHERE id = :id")
    int removeTodo(@Bind("id") int id);

    /**
     * Updates state of todo - toggle completed flag
     * @param id of todo to be modified
     * @param completed true/false if item is completed/incomplete
     * @return 1 if update was successful or 0 otherwise
     */
    @SqlUpdate("UPDATE TODOS SET COMPLETED=:completed WHERE id = :id")
    int updateTodo(@Bind("id") int id, @Bind("completed") boolean completed);
}
