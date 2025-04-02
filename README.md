# Applicant Tracking System (ATS) - Frontend

## Overview

The **Applicant Tracking System (ATS)** is a web-based application that allows organizations, recruiters, and candidates to interact seamlessly. This frontend is built using **React with TypeScript** and serves as the user interface for candidates to upload CVs, recruiters to manage applications, and organizations to oversee hiring.

## Features

- **User Authentication**: Sign up, log in, and manage sessions securely using JWT authentication.
- **Candidate Dashboard**: Upload CVs, track application progress, and manage personal profiles.
- **Recruiter Dashboard**: View uploaded CVs, request AI-based CV analysis via WebSockets, and manage applications.
- **Organization Management**: Organizations can create recruiter accounts and oversee recruitment processes.
- **Real-Time AI CV Analysis**: Recruiters can request AI-powered CV analysis, and results are streamed via WebSockets.
- **Rate Limiting & Input Validation**: Ensures security by limiting API requests and validating user inputs.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Backend**: Node.js (Express, NestJS) [Backend Repository](#)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **AI Services**: Google Gemini AI for CV analysis
- **WebSockets**: Real-time AI response streaming

## Folder Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── Candidate/
│   │   └── CVUpload.tsx
│   ├── Recruiter/
│   │   ├── CVList.tsx
│   │   └── AnalysisModal.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── CandidateDashboard.tsx
│   └── RecruiterDashboard.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useWebSocket.ts
├── services/
│   ├── api.ts
│   └── auth.ts
├── types/
│   └── types.ts
├── App.tsx
└── main.tsx
```

## Setup & Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js v18+**
- **npm or yarn**
- **Backend API Running** ([Backend Setup Guide](#))

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ats-frontend.git
   cd ats-frontend
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3000
   REACT_APP_WEBSOCKET_URL=ws://localhost:3000
   ```
4. **Start the Development Server**
   ```bash
   npm run dev
   ```
5. **Build for Production**
   ```bash
   npm run build
   ```
6. **Run Production Build**
   ```bash
   npm start
   ```

## API Endpoints Used

| Endpoint                    | Method | Description                    |
| --------------------------- | ------ | ------------------------------ |
| `/auth/register`            | POST   | Register a new user            |
| `/auth/login`               | POST   | Log in and receive a JWT token |
| `/cv`                       | POST   | Upload a CV                    |
| `/recruiter/cvs`            | GET    | Get all CVs for a recruiter    |
| `/recruiter/cv/:id/analyze` | GET    | Request AI analysis for a CV   |

## WebSocket Integration

- Recruiters can request AI-based CV analysis via WebSockets.
- AI response is streamed in real-time.
- Example connection:
  ```bash
  wscat -c "ws://localhost:3000/ws/analysis/1" -H "Authorization: Bearer <TOKEN>"
  ```

## Testing with cURL

### Register a Candidate

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secure123","role":"candidate"}'
```

### Request CV Analysis

```bash
curl -X GET http://localhost:3000/recruiter/cv/1/analyze \
  -H "Authorization: Bearer <TOKEN>"
```

## Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make changes and commit.
4. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, contact: [your-email@domain.com]

---

**Documentation Version: 1.0.0**
