@echo off
REM MemoryMate API Test Script for Windows
REM This script tests the basic functionality of the MemoryMate backend API

set API_BASE=http://localhost:8080/api
echo Testing MemoryMate API at %API_BASE%
echo ==================================

REM Test 1: Health Check
echo 1. Testing health check...
curl -s -X GET "%API_BASE%/public/hello"
echo.
echo.

REM Test 2: Signup
echo 2. Testing user signup...
curl -s -X POST "%API_BASE%/auth/signup" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"password123\", \"role\": \"PATIENT\"}"
echo.
echo.

REM Test 3: Login
echo 3. Testing user login...
curl -s -X POST "%API_BASE%/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"test@example.com\", \"password\": \"password123\"}"
echo.
echo.

echo API testing completed!
echo =====================
pause
