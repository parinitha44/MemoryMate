# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Build the application
RUN mvn clean package -DskipTests

# Create uploads directory
RUN mkdir -p uploads/faces

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/memorymate-backend-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=dev"]
