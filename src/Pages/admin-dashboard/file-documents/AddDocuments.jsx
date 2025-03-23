import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDocumentFile, getDocumentFileById, updateDocumentFileById } from '../../../api/pages-api/admin-dashboard-api/document-file-api/DocumentFileApi';
import { toast } from 'react-toastify';

function AddDocuments() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    priority: '',
    fileDocument: '',
  });

  // Fetch data from getDocumentFileById
  useEffect(() => {
    // Fetch data from getDocumentFileById api
    const fetchData = async () => {
      try {
        const response = await getDocumentFileById(id);
        const data = response.documentFile;
        setFormData(data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      fileDocument: file ? file.name : '',
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
try{


    // Add or update the document
    if (id) {
      // Update document
   var response =   await updateDocumentFileById(id, formData);
      // ...
    } else {
      // Add document
    var response =   await addDocumentFile(formData);
      // ...
    }
if(response.success){
  toast.success(response.message || "Document saved successfully");
  navigate(-1);
}
    // Redirect to the Manage Documents page
    navigate('/admin/documents');
  }

   catch (error) {
  console.error('Error saving document:', error);
  toast.error(error.message || 'Failed to save document');
}
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {id ? 'Edit Document' : 'Add Document'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        {/* Grid Layout for Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter document name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter document description"
              rows="3"
              required
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select industry</option>
              <option value="60d21b4667d0d8992e610c90">Technology</option>
              <option value="60d21b4667d0d8992e610c90">Healthcare</option>
              <option value="60d21b4667d0d8992e610c90">Finance</option>
              <option value="60d21b4667d0d8992e610c90">Education</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* File Document */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Document URL</label>
            <div className="flex items-center">
              <input
                type="text"
                name="fileDocument"
                value={formData.fileDocument}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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