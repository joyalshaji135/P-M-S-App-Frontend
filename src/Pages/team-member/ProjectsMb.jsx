import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function ProjectsMb() {
  // Customer ID mapping
  const customers = {
    '67c440dbe269db9b854700bf': 'Tech Corp Inc',
    '67c440dbe269db9b854700c0': 'FinTech Solutions',
    '67c440dbe269db9b854700c1': 'Health Innovators'
  };

  // Sample projects data based on your JSON structure
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: 'AI Development',
      customer: '67c440dbe269db9b854700bf',
      industry: 'Technology',
      priority: 'High',
      description: 'AI-driven project for automation and process optimization.',
      projectStatus: 'Ongoing',
      startDate: '2024-01-15T00:00:00.000Z',
      endDate: '2024-12-31T00:00:00.000Z'
    },
    {
      id: 2,
      projectName: 'Financial Platform Upgrade',
      customer: '67c440dbe269db9b854700c0',
      industry: 'Finance',
      priority: 'Medium',
      description: 'Modernization of core banking systems with cloud integration.',
      projectStatus: 'Planning',
      startDate: '2024-02-01T00:00:00.000Z',
      endDate: '2024-06-30T00:00:00.000Z'
    },
    {
      id: 3,
      projectName: 'Healthcare Analytics',
      customer: '67c440dbe269db9b854700c1',
      industry: 'Healthcare',
      priority: 'Critical',
      description: 'Big data analysis platform for patient outcome predictions.',
      projectStatus: 'Completed',
      startDate: '2023-09-01T00:00:00.000Z',
      endDate: '2024-01-31T00:00:00.000Z'
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setProjects(items);
  };

  // Filter projects by status
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.projectStatus === filter);

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get priority color classes
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Date formatting function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Project Portfolio
      </motion.h1>

      {/* Filter controls */}
      <motion.div 
        className="mb-6 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {['All', 'Planning', 'Ongoing', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === status 
                ? `${getStatusColor(status).replace('border-', 'border ')} border-2` 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <Draggable key={project.id} draggableId={project.id.toString()} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                      >
                        <div 
                          className="bg-blue-50 px-5 py-4 border-b border-blue-100 cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                        >
                          <h3 className="text-lg font-semibold text-gray-800">
                            {project.projectName}
                          </h3>
                          <div className="mt-2 flex gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                              {project.priority}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.projectStatus)} border`}>
                                {project.projectStatus}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(project.startDate)} - {formatDate(project.endDate)}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {customers[project.customer]}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                {project.industry}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-5 py-3 bg-blue-50 border-t border-blue-100 text-xs text-gray-500 flex justify-between">
                          <span>Project ID: {project.id}</span>
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedProject.projectName}
                </h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedProject.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.projectStatus)} border`}>
                      {selectedProject.projectStatus}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Priority</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(selectedProject.priority)} border`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Customer</h3>
                    <p className="text-gray-700">
                      {customers[selectedProject.customer]}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Industry</h3>
                    <p className="text-gray-700">{selectedProject.industry}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Start Date</h3>
                    <p className="text-gray-700">
                      {formatDate(selectedProject.startDate)}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">End Date</h3>
                    <p className="text-gray-700">
                      {formatDate(selectedProject.endDate)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-blue-50 border-t border-blue-100 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectsMb;