import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewRecruitmentAd() {
  const { id } = useParams(); // Get the id from the URL
  const [recruitment, setRecruitment] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('recruitmentData')) || [];
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

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{recruitment.name}</p>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <p className="text-gray-900">{recruitment.industry}</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <p className="text-gray-900">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  recruitment.priority === 'High'
                    ? 'bg-red-100 text-red-800'
                    : recruitment.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {recruitment.priority}
              </span>
            </p>
          </div>

          {/* Recruitment Post */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Post</label>
            <p className="text-gray-900">{recruitment.recruitmentPost}</p>
          </div>

          {/* Recruitment Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Position</label>
            <p className="text-gray-900">{recruitment.recruitmentPosition}</p>
          </div>

          {/* Recruitment Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Location</label>
            <p className="text-gray-900">{recruitment.recruitmentLocation}</p>
          </div>

          {/* Recruitment Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Salary</label>
            <p className="text-gray-900">{recruitment.recruitmentSalary}</p>
          </div>

          {/* Recruitment Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Start Date</label>
            <p className="text-gray-900">{new Date(recruitment.recruitmentStartDate).toLocaleDateString()}</p>
          </div>

          {/* Recruitment End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment End Date</label>
            <p className="text-gray-900">{new Date(recruitment.recruitmentEndDate).toLocaleDateString()}</p>
          </div>

          {/* Recruitment Contact Person */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Contact Person</label>
            <p className="text-gray-900">{recruitment.recruitmentContactPerson}</p>
          </div>

          {/* Recruitment Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Contact Number</label>
            <p className="text-gray-900">{recruitment.recruitmentContactNumber}</p>
          </div>

          {/* Recruitment Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Email</label>
            <p className="text-gray-900">{recruitment.recruitmentEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecruitmentAd;