import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddDocuments() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    id: Date.now(),
    fileName: '',
    type: '',
    uploadDate: '',
  });

  // Fetch data from local storage on component mount
  useEffect(() => {
    if (id) {
      // If id exists, fetch the data for editing
      const storedData = JSON.parse(localStorage.getItem('documents')) || [];
      const documentToEdit = storedData.find((document) => document.id === parseInt(id));
      if (documentToEdit) {
        setFormData(documentToEdit); // Pre-fill the form with existing data
      }
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing data from local storage
    const storedData = JSON.parse(localStorage.getItem('documents')) || [];

    if (id) {
      // If editing, update the existing entry
      const updatedData = storedData.map((document) =>
        document.id === parseInt(id) ? formData : document
      );
      localStorage.setItem('documents', JSON.stringify(updatedData));
    } else {
      // If adding, create a new entry
      const updatedData = [...storedData, formData];
      localStorage.setItem('documents', JSON.stringify(updatedData));
    }

    // Redirect to the Manage Documents page
    navigate('/admin/documents');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Document' : 'Add Document'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter file name"
              required
            />
          </div>

          {/* File Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select file type</option>
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="ZIP">ZIP</option>
              <option value="Word">Word</option>
            </select>
          </div>

          {/* Upload Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
            <input
              type="date"
              name="uploadDate"
              value={formData.uploadDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDocuments;