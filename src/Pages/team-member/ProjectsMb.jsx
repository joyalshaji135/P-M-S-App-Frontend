import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function ProjectsMb() {
  // Sample projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design and improved UX.',
      status: 'Not Started',
      team: ['Design', 'Development'],
      deadline: '2023-07-15'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile application for iOS and Android with React Native.',
      status: 'In Progress',
      team: ['Mobile', 'Backend'],
      deadline: '2023-08-30'
    },
    {
      id: 3,
      title: 'CRM System Implementation',
      description: 'Implement new customer relationship management system across all departments.',
      status: 'Completed',
      team: ['Sales', 'IT'],
      deadline: '2023-05-20'
    },
    {
      id: 4,
      title: 'Marketing Campaign',
      description: 'Launch summer marketing campaign with social media and email components.',
      status: 'In Progress',
      team: ['Marketing', 'Content'],
      deadline: '2023-06-30'
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
    : projects.filter(project => project.status === filter);

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-blue-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        My Projects
      </motion.h1>

      {/* Filter controls */}
      <motion.div 
        className="mb-6 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
        >
          All Projects
        </button>
        <button
          onClick={() => setFilter('Not Started')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Not Started' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-white text-gray-700 border border-gray-300'}`}
        >
          Not Started
        </button>
        <button
          onClick={() => setFilter('In Progress')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'In Progress' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 'bg-white text-gray-700 border border-gray-300'}`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Completed' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-white text-gray-700 border border-gray-300'}`}
        >
          Completed
        </button>
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
                            {project.title}
                          </h3>
                        </div>
                        
                        <div className="p-5">
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)} border`}>
                              {project.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              Due: {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {project.team.map((team, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {team}
                              </span>
                            ))}
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
                  {selectedProject.title}
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
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.status)} border`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Deadline</h3>
                    <p className="text-gray-700">
                      {new Date(selectedProject.deadline).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Teams Involved</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.team.map((team, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Project ID</h3>
                    <p className="text-gray-700">{selectedProject.id}</p>
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