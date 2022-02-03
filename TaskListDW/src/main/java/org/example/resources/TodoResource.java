package org.example.resources;


import org.example.api.Todo;
import org.example.dao.TodoDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * JSON interface
 */
@Path("/todos")
@Produces(MediaType.APPLICATION_JSON)
public class TodoResource {
    private final TodoDAO todoDao;

    public TodoResource(TodoDAO todoDao) {
        this.todoDao = todoDao;
    }

    /**
     * Get all task list items
     * @return response with serialized array of items
     */
    @GET
    public Response getTodos() {
        return Response.ok(todoDao.getAll()).build();
    }

    /**
     * get a single item from task list
     * @param id id of the task
     * @return task or 404 if task of id is not found
     * @return 200 OK if successful
     */
    @GET
    @Path("/{id}")
    public Response getTodo(@PathParam("id") int id) {
        Todo todo = todoDao.getTodo(id);
        if (todo != null) {
            return Response.ok(todo).build();
        }
        return Response.status(404).build();
    }

    /**
     * Insert a new item to DB - note id is is an autoincrement
     * @param todo to be inserted
     * @return 200 OK if successful
     */
    @POST
    public Response addTodo(Todo todo) {
        if (todoDao.addTodo(todo) > 0) {
            return Response.ok(todo).build();
        }
        return Response.notModified("Todo not created").build(); //should be some better message
    }

    /**
     * Updates state of todo - toggle completed flag
     * @param todo to be modified
     * @return 200 OK if successful
     */
    @PUT
    public Response updateTodo(Todo todo) {
        if( todoDao.updateTodo(todo.getId(), todo.isCompleted()) > 0) {
            return Response.ok().build();
        }
        return Response.notModified("Todo not updated").build(); //should be some better message
    }

    /**
     * Delete is not used on client, but can be used from Swagger etc., to manipulate task list
     * @param id of todo object to be deleted
     * @return 200 OK if successful
     */
    @DELETE
    @Path("/{id}")
    public Response deleteTodo(@PathParam("id") int id) {
        if (todoDao.removeTodo(id) > 0) {
            return Response.ok().build();
        }
        return Response.notModified("Todo not deleted").build();
    }
}
