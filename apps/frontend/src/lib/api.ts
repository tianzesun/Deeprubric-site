import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// 1. 创建实例
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10秒超时，AI生成任务可能较长
});

// 2. 请求拦截器：动态注入 JWT Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token (之后可以优化为从 Zustand 获取)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器：统一处理错误（如 401 自动跳转）
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token 过期或非法
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // 如果不是在登录页，则跳转
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }

    // 这里可以根据后端返回的错误信息进行格式化
    const message = (error.response?.data as any)?.detail || '网络请求错误';
    return Promise.reject({ ...error, message });
  }
);

export default api;