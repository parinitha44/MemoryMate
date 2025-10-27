# MemoryMate - Complete Full-Stack Application

MemoryMate is a comprehensive memory support application designed for patients with memory-related conditions and their caregivers. The application features cognitive games, face recognition, journaling, reminders, and activity tracking.

## 🏗️ Architecture

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Spring Boot 3.2 + Java 17
- **Database**: MongoDB 6
- **Authentication**: JWT tokens
- **Security**: BCrypt password hashing, CORS enabled

## 📁 Project Structure

```
MemoryMateFinal/
├── Backend/                          # Spring Boot Backend
│   ├── src/main/java/com/memorymate/backend/
│   │   ├── controller/               # REST Controllers
│   │   ├── dto/                     # Data Transfer Objects
│   │   ├── model/                   # MongoDB Documents
│   │   ├── repository/              # Spring Data Repositories
│   │   ├── security/                # JWT Security Configuration
│   │   └── service/                 # Business Logic Services
│   ├── src/main/resources/
│   │   ├── application.properties   # Default configuration
│   │   └── application-dev.properties # Development configuration
│   ├── pom.xml                      # Maven dependencies
│   └── Dockerfile                   # Backend Docker configuration
├── MemoryMate3/Frontend/vite-project/ # React Frontend
│   ├── src/
│   │   ├── api/                     # API integration layer
│   │   ├── components/              # React components
│   │   └── App.jsx                  # Main application
│   ├── package.json                 # Frontend dependencies
│   └── Dockerfile                   # Frontend Docker configuration
├── docker-compose.yml               # Multi-container orchestration
└── README.md                        # This file
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Prerequisites**
   - Docker Desktop installed
   - Git installed

2. **Clone and Start**
   ```bash
   git clone <repository-url>
   cd MemoryMateFinal
   docker-compose up --build
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api
   - MongoDB: localhost:27017

### Option 2: Manual Setup

#### Backend Setup

1. **Prerequisites**
   - Java 17 or higher
   - Maven 3.6+
   - MongoDB 6+

2. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name memorymate-mongo mongo:6
   
   # Or install MongoDB locally and start the service
   ```

3. **Configure and Run Backend**
   ```bash
   cd Backend
   
   # Update application-dev.properties if needed
   # spring.data.mongodb.uri=mongodb://localhost:27017/memorymate
   # JWT_SECRET=your-secret-key
   # JWT_EXPIRATION=86400
   
   # Build and run
   mvn clean install
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```

#### Frontend Setup

1. **Prerequisites**
   - Node.js 18+
   - npm or yarn

2. **Install and Run**
   ```bash
   cd MemoryMate3/Frontend/vite-project
   
   # Install dependencies
   npm install
   
   # Create environment file
   echo "VITE_API_URL=http://localhost:8080/api" > .env
   
   # Start development server
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env or application.properties)
```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/memorymate

# JWT Configuration
jwt.secret=mySecretKey123456789012345678901234567890
jwt.expiration=86400

# CORS Configuration
cors.allowed-origins=http://localhost:5173,http://localhost:3000

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## 📚 API Documentation

### Authentication Endpoints

#### Signup
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "PATIENT",
    "caregiverEmail": "caregiver@example.com"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### User Management

#### Get Profile
```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Reminders

#### Get All Reminders
```bash
curl -X GET http://localhost:8080/api/reminders \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Create Reminder
```bash
curl -X POST http://localhost:8080/api/reminders \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Take medication",
    "description": "Morning medication",
    "reminderTime": "2024-01-15T09:00:00Z",
    "priority": "HIGH",
    "isRecurring": false
  }'
```

#### Complete Reminder
```bash
curl -X PUT http://localhost:8080/api/reminders/{reminderId}/complete \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Games

#### Start Game Session
```bash
curl -X POST http://localhost:8080/api/games/start \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "gameType": "MEMORY_MATCH",
    "difficultyLevel": "EASY",
    "maxScore": 10
  }'
```

#### Complete Game Session
```bash
curl -X PUT http://localhost:8080/api/games/{sessionId}/complete \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 8,
    "durationSeconds": 120,
    "movesCount": 15
  }'
```

### Face Recognition

#### Add Person
```bash
curl -X POST http://localhost:8080/api/face-recognition/add-person \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "personName=John" \
  -F "image=@/path/to/image.jpg"
```

#### Recognize Person
```bash
curl -X POST http://localhost:8080/api/face-recognition/recognize \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "image=@/path/to/image.jpg"
```

### Journal

#### Create Journal Entry
```bash
curl -X POST http://localhost:8080/api/journal \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Today was great",
    "content": "I had a wonderful day...",
    "mood": "HAPPY",
    "entryDate": "2024-01-15"
  }'
```

#### Get Journal Stats
```bash
curl -X GET http://localhost:8080/api/journal/stats \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Health Check

#### Public Health Check
```bash
curl -X GET http://localhost:8080/api/public/hello
```

## 🧪 Testing

### Backend Testing

1. **Unit Tests**
   ```bash
   cd Backend
   mvn test
   ```

2. **Integration Tests**
   ```bash
   mvn test -Dtest=*IntegrationTest
   ```

### Frontend Testing

1. **Run Tests**
   ```bash
   cd MemoryMate3/Frontend/vite-project
   npm test
   ```

2. **Build Test**
   ```bash
   npm run build
   ```

## 🔒 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **Role-based Access**: Different access levels for patients and caregivers

## 📊 Data Models

### User
- `id`: Unique identifier
- `fullName`: User's full name
- `email`: Unique email address
- `passwordHash`: Hashed password
- `roles`: Set of user roles (PATIENT, CAREGIVER, ADMIN)
- `caregiverEmail`: Optional caregiver email
- `isActive`: Account status
- `createdAt`, `updatedAt`: Timestamps

### Reminder
- `id`: Unique identifier
- `title`: Reminder title
- `description`: Detailed description
- `reminderTime`: Scheduled time
- `status`: PENDING, COMPLETED, CANCELLED
- `priority`: LOW, MEDIUM, HIGH, URGENT
- `isRecurring`: Recurrence flag
- `recurrencePattern`: Recurrence pattern
- `patientId`: Associated patient
- `createdAt`, `updatedAt`: Timestamps

### GameSession
- `id`: Unique identifier
- `patientId`: Associated patient
- `gameType`: MEMORY_MATCH, WORD_RECALL, PATTERN_FINDER
- `score`: Final score
- `maxScore`: Maximum possible score
- `durationSeconds`: Game duration
- `movesCount`: Number of moves
- `difficultyLevel`: EASY, MEDIUM, HARD
- `completed`: Completion status
- `startedAt`, `completedAt`: Timestamps

### FaceRecognitionData
- `id`: Unique identifier
- `patientId`: Associated patient
- `personName`: Name of the person
- `faceEncoding`: Base64 encoded face data
- `confidenceScore`: Recognition confidence
- `imagePath`: Path to stored image
- `lastSeen`: Last recognition time
- `createdAt`: Creation timestamp

### JournalEntry
- `id`: Unique identifier
- `patientId`: Associated patient
- `title`: Entry title
- `content`: Entry content
- `mood`: Mood classification
- `entryDate`: Entry date
- `createdAt`: Creation timestamp

### ActivityLog
- `id`: Unique identifier
- `patientId`: Associated patient
- `activityType`: Type of activity
- `description`: Activity description
- `metadata`: Additional JSON data
- `timestamp`: Activity timestamp

## 🐳 Docker Commands

### Build and Run All Services
```bash
docker-compose up --build
```

### Run in Background
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

### Clean Up
```bash
docker-compose down -v
docker system prune -a
```

## 🚨 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check MongoDB is running
   - Verify Java 17 is installed
   - Check port 8080 is available

2. **Frontend can't connect to backend**
   - Verify backend is running on port 8080
   - Check CORS configuration
   - Verify VITE_API_URL in .env

3. **MongoDB connection issues**
   - Ensure MongoDB is running
   - Check connection string in application.properties
   - Verify network connectivity

4. **File upload issues**
   - Check file size limits
   - Verify uploads directory permissions
   - Check multipart configuration

### Logs and Debugging

1. **Backend Logs**
   ```bash
   # Docker
   docker-compose logs backend
   
   # Manual
   tail -f logs/spring.log
   ```

2. **Frontend Logs**
   ```bash
   # Check browser console
   # Or Docker logs
   docker-compose logs frontend
   ```

3. **MongoDB Logs**
   ```bash
   docker-compose logs mongo
   ```

## 📈 Performance Considerations

- **Database Indexing**: MongoDB indexes on frequently queried fields
- **JWT Expiration**: Configurable token expiration
- **File Storage**: Local file storage with configurable limits
- **Caching**: Consider implementing Redis for session caching
- **Load Balancing**: Use multiple backend instances for production

## 🔄 Deployment

### Production Deployment

1. **Environment Variables**
   - Set production MongoDB URI
   - Use strong JWT secret
   - Configure production CORS origins

2. **Security**
   - Enable HTTPS
   - Use environment-specific secrets
   - Implement rate limiting
   - Add monitoring and logging

3. **Scaling**
   - Use MongoDB replica sets
   - Implement load balancing
   - Consider microservices architecture

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**MemoryMate** - Supporting memory, one moment at a time. 🧠💙
