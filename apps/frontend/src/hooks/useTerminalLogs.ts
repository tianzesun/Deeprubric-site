import { useEffect, useState } from 'react';

export function useTerminalLogs() {
  const [logs, setLogs] = useState<string[]>(["Initializing Neural Core...", "Syncing Rubric v4.2..."]);
  
  useEffect(() => {
    const logMessages = [
      "AES-256 Handshake...",
      "GDPR Tunnel Active", 
      "SOC2 Audit: Pass",
      "Zero-Knowledge Proof Verified",
      "Neural Network Sync Complete",
      "Security Protocols Active",
      "Data Encryption Verified",
      "Access Control Active"
    ];
    
    const logInterval = setInterval(() => {
      const newLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 2500);
    
    return () => clearInterval(logInterval);
  }, []);

  return logs;
}