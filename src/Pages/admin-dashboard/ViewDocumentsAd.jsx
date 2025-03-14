import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewDocumentsAd() {
  const { id } = useParams(); // Get the id from the URL
  const [document, setDocument] = useState(null);

  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('documents')) || [];
    const documentToView = storedData.find((doc) => doc.id === parseInt(id));
    if (documentToView) {
      setDocument(documentToView);
    }
  }, [id]);

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Document</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
            <p className="text-gray-900">{document.fileName}</p>
          </div>

          {/* File Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
            <p className="text-gray-900">{document.type}</p>
          </div>

          {/* Upload Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
            <p className="text-gray-900">{document.uploadDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDocumentsAd;