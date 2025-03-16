import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewFeedbackCo() {
  const { id } = useParams(); // Get the id from the URL
  const [feedback, setFeedback] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const feedbackToView = storedData.find((feedback) => feedback.id === parseInt(id));
    if (feedbackToView) {
      setFeedback(feedbackToView);
    }
  }, [id]);

  if (!feedback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Feedback</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <p className="text-gray-900">{feedback.title}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{feedback.description}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  feedback.status === 'Open'
                    ? 'bg-green-100 text-green-800'
                    : feedback.status === 'Closed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {feedback.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedbackCo;