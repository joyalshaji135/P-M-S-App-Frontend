import React from 'react';

function FeedbackOwner() {
    const feedbacks = [
        {
            id: 1,
            title: 'Feedback 1',
            description: 'Description for Feedback 1',
            status: 'Open',
        },
        {
            id: 2,
            title: 'Feedback 2',
            description: 'Description for Feedback 2',
            status: 'Closed',
        },
        {
            id: 3,
            title: 'Feedback 3',
            description: 'Description for Feedback 3',
            status: 'Pending',
        },
    ];

    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h1>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sl No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
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
                        {feedbacks.map((feedback, index) => (
                            <tr key={feedback.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {feedback.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {feedback.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            feedback.status === 'Open'
                                                ? 'bg-green-100 text-green-800'
                                                : feedback.status === 'Closed'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {feedback.status}
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

export default FeedbackOwner;