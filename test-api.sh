#!/bin/bash

# MemoryMate API Test Script
# This script tests the basic functionality of the MemoryMate backend API

API_BASE="http://localhost:8080/api"
echo "Testing MemoryMate API at $API_BASE"
echo "=================================="

# Test 1: Health Check
echo "1. Testing health check..."
curl -s -X GET "$API_BASE/public/hello" | jq '.' || echo "Health check failed"
echo ""

# Test 2: Signup
echo "2. Testing user signup..."
SIGNUP_RESPONSE=$(curl -s -X POST "$API_BASE/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "PATIENT"
  }')

echo "Signup response:"
echo "$SIGNUP_RESPONSE" | jq '.' || echo "$SIGNUP_RESPONSE"
echo ""

# Extract token from signup response
TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.token' 2>/dev/null)

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo "Failed to get token from signup. Trying login..."
    
    # Test 3: Login
    echo "3. Testing user login..."
    LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/auth/login" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "test@example.com",
        "password": "password123"
      }')
    
    echo "Login response:"
    echo "$LOGIN_RESPONSE" | jq '.' || echo "$LOGIN_RESPONSE"
    echo ""
    
    TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token' 2>/dev/null)
fi

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo "Failed to get authentication token. Stopping tests."
    exit 1
fi

echo "Using token: ${TOKEN:0:20}..."
echo ""

# Test 4: Get Profile
echo "4. Testing get profile..."
curl -s -X GET "$API_BASE/users/profile" \
  -H "Authorization: Bearer $TOKEN" | jq '.' || echo "Get profile failed"
echo ""

# Test 5: Create Reminder
echo "5. Testing create reminder..."
REMINDER_RESPONSE=$(curl -s -X POST "$API_BASE/reminders" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Reminder",
    "description": "This is a test reminder",
    "reminderTime": "2024-12-31T12:00:00Z",
    "priority": "MEDIUM",
    "isRecurring": false
  }')

echo "Create reminder response:"
echo "$REMINDER_RESPONSE" | jq '.' || echo "$REMINDER_RESPONSE"
echo ""

# Test 6: Get Reminders
echo "6. Testing get reminders..."
curl -s -X GET "$API_BASE/reminders" \
  -H "Authorization: Bearer $TOKEN" | jq '.' || echo "Get reminders failed"
echo ""

# Test 7: Start Game Session
echo "7. Testing start game session..."
GAME_RESPONSE=$(curl -s -X POST "$API_BASE/games/start" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "gameType": "MEMORY_MATCH",
    "difficultyLevel": "EASY",
    "maxScore": 10
  }')

echo "Start game response:"
echo "$GAME_RESPONSE" | jq '.' || echo "$GAME_RESPONSE"
echo ""

# Extract game session ID
GAME_ID=$(echo "$GAME_RESPONSE" | jq -r '.id' 2>/dev/null)

if [ "$GAME_ID" != "null" ] && [ -n "$GAME_ID" ]; then
    # Test 8: Complete Game Session
    echo "8. Testing complete game session..."
    curl -s -X PUT "$API_BASE/games/$GAME_ID/complete" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "score": 8,
        "durationSeconds": 120,
        "movesCount": 15
      }' | jq '.' || echo "Complete game failed"
    echo ""
fi

# Test 9: Create Journal Entry
echo "9. Testing create journal entry..."
curl -s -X POST "$API_BASE/journal" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Journal Entry",
    "content": "This is a test journal entry",
    "mood": "HAPPY",
    "entryDate": "2024-01-15"
  }' | jq '.' || echo "Create journal entry failed"
echo ""

# Test 10: Get Journal Stats
echo "10. Testing get journal stats..."
curl -s -X GET "$API_BASE/journal/stats" \
  -H "Authorization: Bearer $TOKEN" | jq '.' || echo "Get journal stats failed"
echo ""

echo "API testing completed!"
echo "====================="
