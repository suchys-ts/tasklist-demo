package org.example;

import io.dropwizard.Application;
import io.dropwizard.jdbi3.JdbiFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.example.dao.TodoDAO;
import org.example.resources.TodoResource;
import org.jdbi.v3.core.Jdbi;

public class TaskListApplication extends Application<TaskListConfiguration> {

    public static void main(final String[] args) throws Exception {
        new TaskListApplication().run(args);
    }

    @Override
    public String getName() {
        return "TaskList";
    }

    @Override
    public void initialize(final Bootstrap<TaskListConfiguration> bootstrap) {
        //for using as standalone server, put all static files into resources/assets folder (will be served on "/" root path)
        //bootstrap.addBundle(new AssetsBundle("/assets/", "/", "index.html"));
    }

    @Override
    public void run(final TaskListConfiguration configuration,
                    final Environment environment) {
        final JdbiFactory factory = new JdbiFactory();
        final Jdbi jdbi = factory.build(environment, configuration.getDataSourceFactory(),"h2");

        //register DAO
        final TodoDAO todoDao = jdbi.onDemand(TodoDAO.class);
        //create DB table
        todoDao.createTodoTable();
        //register REST resource
        environment.jersey().register(new TodoResource(todoDao));
    }

}
    