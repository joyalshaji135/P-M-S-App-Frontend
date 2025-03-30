import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentFileById } from "../../../api/pages-api/admin-dashboard-api/document-file-api/DocumentFileApi";

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
        console.error("Error fetching document:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!document) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        View Document
      </h1>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-gray-900 font-medium">
              {document?.name || "N/A"}
            </p>
          </div>
          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <p className="text-gray-900">{document?.industry || "N/A"}</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <p className="text-gray-900">{document?.priority || "N/A"}</p>
          </div>
          {/* File Document */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File Document
            </label>
            <a
              href={document?.fileDocument}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
            >
              {document?.fileDocument || "N/A"}
            </a>
          </div>
          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-gray-900 whitespace-pre-line">
              {document?.description || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDocumentsAd;
