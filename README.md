# Project Management System - Frontend

A modern, full-featured Project Management System built with the MERN stack. This repository contains the frontend application built with React and Vite.

## 🚀 Tech Stack

- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework (optional)
- **Environment Variables** - Secure configuration management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd project-management-system-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add the following variables:
   ```properties
   VITE_API_URL=https://p-m-s-app-backend.onrender.com/api/
   NODE_ENV=production
   VITE_API_KEY=your_api_key_here
   VITE_APP_VERSION=1.0
   ```

   **⚠️ Important Security Notes:**
   - Never commit your `.env` file to version control
   - Add `.env` to your `.gitignore` file
   - Use different API keys for development and production
   - Keep your API keys secure and rotate them regularly

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```
The application will start at `http://localhost:5173` (default Vite port)

### Production Build
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
project-management-system-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context providers
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Application entry point
├── .env                # Environment variables (not in git)
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## ✨ Features

- 🔐 User authentication and authorization
- 📊 Project dashboard and overview
- 📝 Task creation and management
- 👥 Team collaboration tools
- 📅 Timeline and calendar views
- 📈 Progress tracking and reporting
- 🔔 Real-time notifications
- 📱 Responsive design for all devices
- 🎨 Modern and intuitive UI

## 🔌 API Integration

The frontend communicates with the backend API hosted at:
```
https://p-m-s-app-backend.onrender.com/api/
```

API requests are authenticated using the API key stored in environment variables.

### Example API Service
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export default api;
```

## 🧪 Testing

```bash
npm run test
# or
yarn test
```

## 📦 Deployment

### Deploying to Vercel
```bash
vercel --prod
```

### Deploying to Netlify
```bash
netlify deploy --prod
```

### Environment Variables for Deployment
Make sure to set the following environment variables in your deployment platform:
- `VITE_API_URL`
- `NODE_ENV`
- `VITE_API_KEY`
- `VITE_APP_VERSION`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- All contributors who help improve this project

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔄 Version History

- **1.0** - Initial Release
  - Basic project management features
  - User authentication
  - Task management
  - Team collaboration

---

**Built with ❤️ using the MERN Stack**
