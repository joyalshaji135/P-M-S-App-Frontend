import React from 'react';

function ProjectOwner() {
    const projects = [
        {
            id: 1,
            name: 'Project Alpha',
            description: 'Description for Project Alpha',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Project Beta',
            description: 'Description for Project Beta',
            status: 'Inactive',
        },
        {
            id: 3,
            name: 'Project Gamma',
            description: 'Description for Project Gamma',
            status: 'Completed',
        },
    ];

    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h1>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sl No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {projects.map((project, index) => (
                            <tr key={project.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            project.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : project.status === 'Completed'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProjectOwner;