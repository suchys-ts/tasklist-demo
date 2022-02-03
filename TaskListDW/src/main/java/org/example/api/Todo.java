package org.example.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.beans.ConstructorProperties;

/**
 * The class represents basic structure of Todo item in tasklist
 */
public class Todo {
    private int id;
    private String description;
    private long dueDate;
    private boolean completed;

    public Todo() {
        super();
    }

    @ConstructorProperties({ "id", "description", "dueDate", "completed" })
    public Todo(int id, String description, long dueDate, boolean completed) {
        super();
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }

    /**
     * Id id server generated, any id in POST from client shoudl be ignored (valid only for PUT updates)
     * @return
     */
    @JsonProperty
    public int getId() {
        return id;
    }

    /**
     * Description of todo item
     * @return
     */
    @JsonProperty
    public String getDescription() {
        return description;
    }

    /**
     * Due date to complete task. Client should never send the task with past due date
     * @return
     */
    @JsonProperty
    public long getDueDate() {
        return dueDate;
    }

    /**
     * Indicated whether the task is completed
     * @return
     */
    @JsonProperty
    public boolean isCompleted() {
        return completed;
    }

    /* setters are solely for JDBC (DAO) mapping */

    public void setId(int id){
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDueDate(long dueDate) {
        this.dueDate = dueDate;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
