import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewFeedbackMg() {
  const { id } = useParams(); // Get feedback ID from URL
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);

  // Fetch feedback details from localStorage
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacksMg')) || [];
    const selectedFeedback = storedFeedbacks.find((fb) => fb.id === parseInt(id));
    if (selectedFeedback) {
      setFeedback(selectedFeedback);
    } else {
      navigate('/team-manager/feedback'); // Redirect if feedback not found
    }
  }, [id, navigate]);

  if (!feedback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Feedback</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Feedback Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">{feedback.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Severity</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">{feedback.severity}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Alert Status</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">
              {feedback.alertStatus ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Triggered At</label>
            <p className="mt-1 p-2 bg-gray-100 rounded-md">
              {new Date(feedback.triggeredAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate('/team-manager/feedback')}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedbackMg;