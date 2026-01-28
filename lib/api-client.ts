// API Client Module
// This module handles all API communication with the Spring Boot backend
// It provides methods for user management, exam selection, dashboard data, and task tracking

// API base URL - configure via NEXT_PUBLIC_API_URL environment variable
// Defaults to localhost:8000/api which matches the Spring Boot backend port
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log('[v0] API Request:', { method: options.method || 'GET', url });
      
      const response = await fetch(url, {
        ...options,
        // Include cookies for JWT authentication
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      console.log('[v0] API Response:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const error: ApiError = {
          message: `API Error: ${response.statusText}`,
          status: response.status,
        };
        console.error('[v0] API error response:', error);
        throw error;
      }

      const data = await response.json();
      console.log('[v0] API Response data received');
      return data as T;
    } catch (error: any) {
      console.error('[v0] API fetch error:', error);
      throw error;
    }
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
    return this.fetch('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export single instance of API client for use across the application
export const apiClient = new ApiClient(API_BASE_URL);

export type { ApiError };
