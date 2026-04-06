/**
 * @description A dedicated, visually stunning, and informative error page component.
 * @param {number} statusCode - The HTTP status code that triggered the error (e.g., 401, 500).
 * @param {string} [errorMessage] - A user-friendly message to display.
 */
import React from 'react';

interface ErrorPageProps {
    statusCode: number;
    errorMessage?: string;
}

const getStatusDetail = (statusCode: number): { title: string; description: string; action: string } => {
    switch (statusCode) {
        case 401:
            return { 
                title: "Unauthorized Access", 
                description: "Your current credentials do not have permission to view this resource. Please contact an administrator.", 
                action: "Log In / Request Access" 
            };
        case 404:
            return { 
                title: "Page Not Found", 
                description: "The requested page or resource does not exist. Please check the URL.", 
                action: "Go to Dashboard" 
            };
        case 500:
            return { 
                title: "Internal Server Error", 
                description: "Something broke on our end. Our team has been automatically notified. Please try again in a moment.", 
                action: "Contact Support" 
            };
        default:
            return { 
                title: "An Unexpected Error Occurred", 
                description: `Status Code ${statusCode}. Please report this error for investigation.`, 
                action: "Contact Support" 
            };
    }
};


const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, errorMessage }) => {
    const { title, description, action } = getStatusDetail(statusCode);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl shadow-inner border border-red-200">
            
            {/* Large Status Code Display */}
            <div className="text-8xl font-extrabold text-red-600 mb-4">{statusCode}</div>
            
            {/* Primary Message */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            
            {/* Detailed Description */}
            <p className="text-lg text-gray-600 mb-6 max-w-md">{description}</p>

            {/* Contextual Details */}
            {errorMessage && (
                <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm rounded">
                    <p className="font-semibold">Technical Detail:</p>
                    <p className="text-xs">{errorMessage}</p>
                </div>
            )}

            {/* Call to Action */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                {action}
            </button>
        </div>
    );
}

export default ErrorPage;