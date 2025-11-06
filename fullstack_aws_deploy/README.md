# Fullstack AWS Deploy Example

Includes:
- React + Vite frontend (`frontend/`)
- Node.js + Express backend (`backend/`)

## Quick Start
### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### AWS Deployment
- Launch multiple EC2s for backend (port 3001)
- Create an Application Load Balancer (ALB) forwarding to backend targets
- Host frontend on EC2 or S3; set env `VITE_BACKEND_URL` = ALB URL
