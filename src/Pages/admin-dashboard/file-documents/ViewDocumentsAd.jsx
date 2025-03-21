import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentFileById } from '../../../api/pages-api/admin-dashboard-api/document-file-api/DocumentFileApi';

function ViewDocumentsAd() {
  const { id } = useParams(); // Get the id from the URL
  const [document, setDocument] = useState(null);

  // Fetch data from getDocumentById api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocumentFileById(id);
        const data = response.documentFile;
        setDocument(data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Document</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{document?.name}</p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900 whitespace-pre-line">{document?.description}</p>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <p className="text-gray-900">{document?.industry}</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <p className="text-gray-900">{document?.priority}</p>
          </div>

          {/* File Document */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">File Document</label>
            <p className="text-gray-900">
              <a
                href={document?.fileDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {document?.fileDocument}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDocumentsAd;