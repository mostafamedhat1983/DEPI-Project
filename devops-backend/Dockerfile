# Use Maven to build the JAR
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

# Use Java runtime to run the JAR
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/shop-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "shop-0.0.1-SNAPSHOT.jar"]