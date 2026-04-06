/**
 * @description Interactive simulation widget demonstrating the system's power.
 *              This widget simulates a complex, multi-step process (e.g., grading) 
 *              to demonstrate advanced user flow mastery.
 */
import React, { useState, useCallback } from 'react';
import { ArrowRightIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface SimulationWidgetProps {}

const SimulationWidget: React.FC<SimulationWidgetProps> = () => {
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState<string>("Click 'Run Simulation' to test the advanced workflow.");

    const handleSimulation = useCallback(async () => {
        if (status === 'running') return;
        
        setStatus('running');
        setMessage("Executing role checks and simulating background processing...");

        // Simulate multi-stage processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Stage 2: Process Simulation
        setMessage("Analyzing submissions and calculating weighted scores...");
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Stage 3: Success state
        setMessage("Workflow Complete. Review the results dashboard above.");
        setStatus('success');
        
        // Reset the simulation after a delay to allow the user to see the result.
        setTimeout(() => {
            setStatus('idle');
            setMessage("Click 'Run Simulation' to test the advanced workflow.");
        }, 5000);
    }, [status]);

    const getButtonClasses = () => {
        switch (status) {
            case 'running':
                return "bg-gray-400 cursor-not-allowed";
            case 'success':
                return "bg-green-600 hover:bg-green-700";
            default:
                return "bg-indigo-600 hover:bg-indigo-700";
        }
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl border-2 border-dashed border-indigo-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <ArrowRightIcon className="w-6 h-6"/> Live Workflow Simulation
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
                This button simulates the entire backend process: Authentication $\rightarrow$ Grading $\rightarrow$ Reporting.
            </p>
            
            <div className="flex flex-col gap-3">
                {/* Status Indicator */}
                <div className="flex items-center justify-between p-2 rounded-lg border-l-4" style={{ borderLeftColor: status === 'success' ? '#10b981' : status === 'running' ? '#6366f1' : '#a3a3a3' }}>
                    <div className="flex items-center gap-2">
                        {status === 'success' ? <CheckCircleIcon className="w-5 h-5 text-green-500 animate-bounce-once" /> : (status === 'running' ? <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-80" fill="currentColor" d="M12 2a10 10 0 0110 10m-10 0a10 10 0 0010 10"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                    <span className={`text-sm font-medium ${status === 'success' ? 'text-green-700' : 'text-gray-700'}`}>{status === 'success' ? 'Success' : (status === 'running' ? 'Processing...' : 'Ready')}</span>
                </div>
                
                <button 
                    onClick={handleSimulation} 
                    disabled={status === 'running'}
                    className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${getButtonClasses()}`}
                >
                    {status === 'running' ? 'Processing...' : 'Run Simulation'}
                </button>
            </div>
            
            {/* Status Message Area */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <p className="text-lg italic text-gray-500">{message}</p>
            </div>
        </div>
    );
}

export default SimulationWidget;