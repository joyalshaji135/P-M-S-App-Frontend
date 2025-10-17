import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  addDocumentFile, 
  getDocumentFileById, 
  updateDocumentFileById
} from '../../../api/pages-api/admin-dashboard-api/document-file-api/DocumentFileApi';
import { toast } from 'react-toastify';
import { getAllIndustryNatures, getAllPriority } from '../../../api/comon-dropdown-api/ComonDropDownApi';

function AddDocuments() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    priority: '',
    fileDocument: '',
  });

  // State for dropdown options
  const [priorities, setPriorities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileUpload, setFileUpload] = useState(null);
  const [isFileUpload, setIsFileUpload] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch priorities and industries in parallel
        const [prioritiesRes, industriesRes] = await Promise.all([
          getAllPriority(),
          getAllIndustryNatures()
        ]);

        setPriorities(prioritiesRes.priority || []);
        setIndustries(industriesRes.industryNatures || []);

        // If editing, fetch the document data
        if (id) {
          const response = await getDocumentFileById(id);
          const documentData = response.documentFile;
          
          setFormData({
            name: documentData.name || '',
            description: documentData.description || '',
            industry: documentData.industry?._id || documentData.industry || '',
            priority: documentData.priority?._id || documentData.priority || '',
            fileDocument: documentData.fileDocument || ''
          });

          // Check if existing document is a URL or file path
          if (documentData.fileDocument && !documentData.fileDocument.startsWith('http')) {
            setIsFileUpload(true);
          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load form data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
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
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileUpload(selectedFile);
      setIsFileUpload(true);
    }
  };

  // Toggle between file upload and URL input
  const toggleFileInputType = () => {
    setIsFileUpload(!isFileUpload);
    setFileUpload(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare the data to send based on input type
      const payload = {
        name: formData.name,
        description: formData.description,
        industry: formData.industry,
        priority: formData.priority,
        fileDocument: isFileUpload ? fileUpload : formData.fileDocument
      };

      let response;
      if (id) {
        // Update document
        response = await updateDocumentFileById(id, payload);
      } else {
        // Add new document
        response = await addDocumentFile(payload);
      }

      if (response.success) {
        toast.success(response.message || "Document saved successfully");
        navigate('/admin/documents');
      } else {
        toast.error(response.message || 'Failed to save document');
      }
    } catch (error) {
      console.error('Error saving document:', error);
      toast.error(error.response?.data?.message || 'Failed to save document');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading form data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {id ? 'Edit Document' : 'Add New Document'}
            </h1>
            <p className="text-gray-600">
              {id ? 'Update the document details' : 'Fill in the details to add a new document'}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Name <span className="text-red-500">*</span>
              </label>
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

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry._id} value={industry._id}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select priority</option>
                {priorities.map((priority) => (
                  <option key={priority._id} value={priority._id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Input Type Toggle */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-2">
                <span className="mr-3 text-sm font-medium text-gray-700">Document Input Type:</span>
                <button
                  type="button"
                  onClick={toggleFileInputType}
                  className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className={`${isFileUpload ? 'bg-blue-600' : 'bg-gray-200'} inline-flex items-center justify-center h-6 w-11 rounded-full transition-colors`}>
                    <span className={`${isFileUpload ? 'translate-x-5' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                  </span>
                </button>
                <span className="ml-2 text-sm text-gray-600">
                  {isFileUpload ? 'File Upload' : 'URL Input'}
                </span>
              </div>

              {isFileUpload ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document File <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1">
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          required={!id || fileUpload} // Only required when creating new document or changing file
                        />
                        <div className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                          {fileUpload ? fileUpload.name : 'Choose file...'}
                        </div>
                      </div>
                    </label>
                    {formData.fileDocument && !fileUpload && (
                      <a 
                        href={formData.fileDocument} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View current file
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {id ? 'Upload a new file to replace the existing one' : 'Upload the document file'}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="fileDocument"
                    value={formData.fileDocument}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/document.pdf"
                    required
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter document description"
                rows="4"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {id ? 'Update Document' : 'Save Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDocuments;