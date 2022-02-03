FROM maven:3.6.0-jdk-11-slim AS builder

RUN mkdir -p /usr/src/app/TaskList/src

COPY src /usr/src/app/TaskList/src
COPY pom.xml /usr/src/app/TaskList/

RUN mvn -f /usr/src/app/TaskList/pom.xml clean package

FROM openjdk:11 AS runner
#we might want to strip the jdk image from anything not needed to decrease size and risks (no need for compiler here)

#logs will be here
RUN mkdir -p /var/logs/TaskList

COPY config.yml /home/tasklist/config.yml
COPY --from=builder /usr/src/app/TaskList/target/TaskListDW-1.0.jar /home/tasklist/TaskListDW-1.0.jar

WORKDIR /home/tasklist

#RUN java -version
EXPOSE 19999/tcp

CMD ["java","-jar","TaskListDW-1.0.jar","server","config.yml"]


