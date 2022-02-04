##Build ```docker-compose -f docker-compose-build.yaml build```
##Run ```docker-compose -f docker-compose.yaml up -d```
##Clean ```docker-compose -f docker-compose.yaml down```

###Service is running at http://localhost:80
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
