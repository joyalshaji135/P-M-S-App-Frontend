import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewRecruitmentCo() {
  const { id } = useParams(); // Get the id from the URL
  const [recruitment, setRecruitment] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('recruitments')) || [];
    const recruitmentToView = storedData.find((recruitment) => recruitment.id === parseInt(id));
    if (recruitmentToView) {
      setRecruitment(recruitmentToView);
    }
  }, [id]);

  if (!recruitment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Recruitment</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
            <p className="text-gray-900">{recruitment.candidateName}</p>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <p className="text-gray-900">{recruitment.position}</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <p className="text-gray-900">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  recruitment.status === 'Offer Sent'
                    ? 'bg-green-100 text-green-800'
                    : recruitment.status === 'Interview Scheduled'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {recruitment.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecruitmentCo;