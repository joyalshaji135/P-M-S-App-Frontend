import { useNavigate } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-5xl font-bold text-white">404</h1>
          <p className="text-indigo-100 mt-2">Oops! Page not found</p>
        </div>
        
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-100 rounded-full blur opacity-75"></div>
              <div className="relative bg-indigo-600 text-white p-4 rounded-full">
                <FaSearch className="text-3xl" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lost in Space?</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Go Back
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <FaHome className="text-lg" />
              Home Page
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-indigo-600 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;