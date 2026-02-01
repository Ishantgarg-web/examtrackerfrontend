// API Client Module
// This module handles all API communication with the Spring Boot backend
// It provides methods for user management, exam selection, dashboard data, and task tracking

// API base URL - configure via NEXT_PUBLIC_API_URL environment variable
// Defaults to localhost:8000/api which matches the Spring Boot backend port
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Interface for API error responses
interface ApiError {
  message: string;
  status: number;
}

/**
 * ApiClient Class
 * Centralized API client for all backend communication
 * Features:
 * - Automatic JWT token handling via cookies (credentials: 'include')
 * - Consistent error handling across all requests
 * - Type-safe responses with TypeScript generics
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch method for API requests
   * @param endpoint - API endpoint path (e.g., '/users/me')
   * @param options - Fetch options (method, headers, body, etc.)
   * @returns Typed response data from the API
   * @throws ApiError if the request fails
   */
  private async fetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${this.baseUrl}${endpoint}`;
  console.log('[v0] API Request:', { method: options.method || 'GET', url });

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  console.log('[v0] API Response:', { status: response.status, ok: response.ok });

  let data: any = null;

  // Try to parse JSON if present
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    const error: ApiError = {
      message:
        data?.message ||
        data?.error ||
        (response.status === 400
          ? 'Invalid request'
          : response.status === 401
          ? 'You are not logged in'
          : response.status === 403
          ? 'You are not allowed to perform this action'
          : response.status === 404
          ? 'Resource not found'
          : 'Something went wrong. Please try again.'),
      status: response.status,
    };

    console.error('[v0] API error response:', error);
    throw error;
  }

  if (response.status === 204 || data === null) {
    return undefined as T;
  }

  console.log('[v0] API Response data received');
  return data as T;
}


  // ========== User & Authentication APIs ==========

  /**
   * Get current user profile
   * @returns User profile data including exams and streaks
   */
  async getProfile() {
    return this.fetch('/users/me');
  }

  /**
   * Logout the current user
   * Clears HttpOnly JWT cookie on backend
   */
  async logout(): Promise<void> {
    return this.fetch<void>('/users/logout', {
      method: 'GET',
    });
  }

  /**
   * Update user profile information
   * @param data - Profile fields to update
   * @returns Updated user profile
   */
  async updateProfile(data: {
    username: string;
    phoneNumber: string;
    workingStatus: string;
    bachelorDegree: string;
    timeZone: string;
  }) {
    return this.fetch('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Select an exam for the user (one-time, irreversible action)
   * @param data - Exam code and attempt type (FIRST_ATTEMPT or REPEAT_ATTEMPT)
   * @returns Updated user profile with selected exam
   */
  async selectExam(data: { examCode: string; attemptType: string }) {
    return this.fetch('/users/me/exams', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ========== Dashboard APIs ==========

  /**
   * Get dashboard data including current exam, streak, and tasks
   * @returns Dashboard object with task calendar and statistics
   */
  async getDashboard() {
    return this.fetch('/dashboard');
  }

  /**
   * Mark a task as completed
   * @param taskId - The ID of the task to complete
   * @returns Updated task progress
   */
  async completeTask(taskId: string) {
    return this.fetch('/users/me/taskProgress', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    });
  }

  // ========== Feedback APIs ==========

  /**
   * Submit user feedback about ExamReady
   * @param data - Feedback details (type, subject, message)
   * @returns Confirmation of feedback submission
   */
  async submitFeedback(data: {
    feedbackType: string;
    subject: string;
    message: string;
  }) {
    return this.fetch('/users/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export single instance of API client for use across the application
export const apiClient = new ApiClient(API_BASE_URL);

export type { ApiError };

