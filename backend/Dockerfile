FROM openjdk:24-slim
WORKDIR /app
COPY target/app.jar /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]
