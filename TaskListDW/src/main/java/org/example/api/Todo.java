package org.example.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.beans.ConstructorProperties;

/**
 * The javabean representing basic structure of Todo item in tasklist
 */
public class Todo {
    private int id;
    private String description;
    private long dueDate;
    private boolean completed;

    /**
     * Default constructor
     */
    public Todo() {
        super();
    }

    /**
     * @param id of todo item
     * @param description of todo item
     * @param dueDate to complete task
     * @param completed whether the task is completed
     */
    @ConstructorProperties({ "id", "description", "dueDate", "completed" })
    public Todo(int id, String description, long dueDate, boolean completed) {
        super();
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }

    /**
     * Id server generated, any id in POST from client is ignored (valid only for PUT updates)
     * @return id of todo item
     */
    @JsonProperty
    public int getId() {
        return id;
    }

    /**
     * Description of todo item
     * @return description of the item
     */
    @JsonProperty
    public String getDescription() {
        return description;
    }

    /**
     * Due date to complete task. Client should never send the task with past due date
     * @return time in number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
     */
    @JsonProperty
    public long getDueDate() {
        return dueDate;
    }

    /**
     * Indicated whether the task is completed
     * @return false if task is not completed, true otherwise
     */
    @JsonProperty
    public boolean isCompleted() {
        return completed;
    }

    /* setters are solely for JDBC (DAO) javabean mapping */

    /**
     * Sets the id of Todo object
     * @param id
     */
    public void setId(int id){
        this.id = id;
    }

    /**
     * Sets the description of item
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Sets the due date in ms since January 1, 1970 00:00:00 UTC
     * @param dueDate
     */
    public void setDueDate(long dueDate) {
        this.dueDate = dueDate;
    }

    /**
     * Sets the state of task
     * @param completed true is task is completed, false otherwise (default)
     */
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
