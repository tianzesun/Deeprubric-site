// apps/frontend/src/lib/api-client.ts
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};