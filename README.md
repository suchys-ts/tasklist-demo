# TODO (TASKLIST) PROJECT
Location:
https://github.com/suchys-ts/tasklist-demo.git

## Building and running project
**Clone the project**: 
```git clone https://github.com/suchys-ts/tasklist-demo.git```

Project is fully dockerized and this makes running and deploying project relatively easy. Go to project folder and follow to 
compose folder. Assuming you have ```Docker``` and ```docker-compose``` installed, then in ```compose``` folder  

```docker-compose -f docker-compose-build.yaml build```

to build necessary images for deployment. After build is finished

```docker-compose -f docker-compose.yaml up -d```

**Note** If you are interested in having interactive console, do not use ```-d```

Open you browser and type `localhost` this will launch the application

Bring down the running services and remove containers by 

```docker-compose -f docker-compose.yaml down```

**Important** Because the application does not have a delete functionality, DB is not mounted on volume, stopping containers
will remove DB as well. Optionally, the task(s) can be deleted using REST API which can be accessed on `/api/todos/` by http command at endpoint `DELETE /api/todos/${taskId}`

## Structure
`/compose` - all docker compose files

`/TaskListDW` Dropwizard server and H2 database (backend)

`/TaskListUI` Dropwizard client UI and NGINX reverse proxy

```
                                                  Browser
                                                     ^
-----------------------------------------------------|-------------------------------|
|       Server image           | Network service     |     |     Client image        |
|----------------------------------------------------|-------------------------------|
|                              |                |    |                               |
|                              |                |    |     |-------------------------|
|H2 DB <--> Dropwizard server  |<-------------->| NGINX <- | Static content (html+js)|
|                              |                |          |-------------------------|
|                              |                |                                    |
|------------------------------------------------------------------------------------|                                                     
```
