package org.example.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.testing.ResourceHelpers;
import io.dropwizard.testing.junit5.DropwizardAppExtension;
import io.dropwizard.testing.junit5.DropwizardExtensionsSupport;
import org.example.TaskListApplication;
import org.example.TaskListConfiguration;
import org.example.api.Todo;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

/**
 * Functional test
 */
@ExtendWith(DropwizardExtensionsSupport.class)
public class TodoRestResourceTest {
    private static DropwizardAppExtension<TaskListConfiguration> EXT = new DropwizardAppExtension<>(
            TaskListApplication.class,
            ResourceHelpers.resourceFilePath("config.yml")
    );

    @BeforeEach
    void cleanUp(){
        Client client = EXT.client();

        Response response = client.target(
                String.format("http://localhost:%d/api/todos", EXT.getLocalPort()))
                .request()
                .get();

        Todo[] todos = response.readEntity(Todo[].class);
        for(Todo todo:todos) {
            client.target(
                String.format("http://localhost:%d/api/todos/%d", EXT.getLocalPort(), todo.getId()))
                .request()
                .delete();
        }
    }

    @Test
    void initialGet() {
        Client client = EXT.client();

        Response response = client.target(
                String.format("http://localhost:%d/api/todos", EXT.getLocalPort()))
                .request()
                .get();

        assertEquals(response.getStatus(), 200);
        Todo[] todos = response.readEntity(Todo[].class);
        assertEquals(todos.length, 0);
    }

    @Test
    void postNewTodo() throws JsonProcessingException {
        Client client = EXT.client();

        String json = (new ObjectMapper()).writeValueAsString(new Todo(1, "test", 100, false));
        Response response = client.target(
                String.format("http://localhost:%d/api/todos", EXT.getLocalPort()))
                .request()
                .post(Entity.json(json));

        assertEquals(response.getStatus(), 200);

        response = client.target(
                String.format("http://localhost:%d/api/todos", EXT.getLocalPort()))
                .request()
                .get();

        assertEquals(response.getStatus(), 200);
        Todo[] todos = response.readEntity(Todo[].class);
        assertEquals(todos.length, 1);
    }

    @Test
    void postTodo() throws JsonProcessingException {
        Client client = EXT.client();

        String json = (new ObjectMapper()).writeValueAsString(new Todo(100, "test", 100, false));
        Response response = client.target(
                String.format("http://localhost:%d/api/todos", EXT.getLocalPort()))
                .request()
                .post(Entity.json(json));

        assertEquals(response.getStatus(), 200);
    }
}
